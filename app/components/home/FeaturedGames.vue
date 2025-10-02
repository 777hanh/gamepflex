<template>
    <section class="nf-fg">
        <div class="nf-fg-head">
            <h2 class="nf-fg-title">Featured Games</h2>
            <div class="nf-fg-controls">
                <button
                    class="nf-btn prev"
                    :disabled="!swiperRef"
                    @click="swiperRef?.slidePrev()"
                >
                    <i class="i-tabler-chevron-left" />
                </button>
                <button
                    class="nf-btn next"
                    :disabled="!swiperRef"
                    @click="swiperRef?.slideNext()"
                >
                    <i class="i-tabler-chevron-right" />
                </button>
            </div>
        </div>
        <div v-if="ready && windows.length" class="nf-fg-wrapper">
            <component
                :is="SwiperCmp"
                class="nf-fg-swiper"
                :modules="modules"
                :loop="loopEnabled"
                :slides-per-view="1"
                :slides-per-group="1"
                :space-between="0"
                :centered-slides="false"
                :speed="600"
                :autoplay="autoplayOptions"
                @swiper="onInit"
                @slide-change="onSlideChange"
            >
                <component
                    v-for="(win, w) in windows"
                    :is="SwiperSlideCmp"
                    :key="'fg-window-' + w"
                    class="nf-window-slide"
                >
                    <div class="nf-window" :style="{ '--cols': perWindow }">
                        <div
                            v-for="(g, i) in win"
                            :key="'fg-item-' + (g.id || i)"
                            class="nf-card"
                        >
                            <div class="nf-thumb">
                                <NuxtImg
                                    :src="g.image"
                                    :alt="g.name"
                                    format="webp"
                                    loading="lazy"
                                    width="400"
                                    height="225"
                                />
                                <div class="nf-badges">
                                    <span class="b-status" v-if="g.status">{{
                                        g.status
                                    }}</span>
                                    <span class="b-date" v-if="g.date">{{
                                        g.date
                                    }}</span>
                                </div>
                            </div>
                            <h3 class="nf-name" :title="g.name">
                                {{ g.name }}
                            </h3>
                            <div class="nf-meta">
                                <span class="coin a"
                                    ><i class="i-tabler-currency-bitcoin" />{{
                                        g.coinA || 75
                                    }}</span
                                >
                                <span class="coin b"
                                    ><i class="i-tabler-coin" />{{
                                        g.coinB || 54
                                    }}</span
                                >
                                <span class="price">{{
                                    g.price || '$49.97'
                                }}</span>
                            </div>
                        </div>
                    </div>
                </component>
            </component>
        </div>
        <div v-else class="nf-empty">Loading...</div>
        <div class="nf-dots" v-if="loopEnabled">
            <span
                v-for="(w, idx) in windows"
                :key="'dot-' + idx"
                class="dot"
                :class="{ active: idx === activeWindow }"
                @click="jumpToWindow(idx)"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref, computed, shallowRef, onMounted, watch } from 'vue';

    export interface FeaturedGame {
        id: string | number;
        name: string;
        image: string;
        status?: string;
        date?: string;
        coinA?: number;
        coinB?: number;
        price?: string;
    }

    const props = defineProps<{
        games: FeaturedGame[];
        perSlide?: number;
        autoplay?: boolean;
        autoplayDelay?: number;
        loader?: () => Promise<FeaturedGame[]>;
        bufferThreshold?: number;
    }>();
    const emit = defineEmits<{ (e: 'load-more'): void }>();

    // Base list (reactive to parent changes)
    const list = ref<FeaturedGame[]>([...props.games]);
    watch(
        () => props.games,
        (v) => {
            if (Array.isArray(v)) list.value = [...v];
        }
    );

    // Responsive items per window (can override via perSlide)
    const vw = ref<number>(1200);
    if (import.meta.client) {
        vw.value = window.innerWidth;
        window.addEventListener('resize', () => (vw.value = window.innerWidth));
    }
    const perWindow = computed(() => {
        if (typeof props.perSlide === 'number' && props.perSlide > 0)
            return props.perSlide;
        const w = vw.value;
        if (w < 560) return 2;
        if (w < 820) return 3;
        if (w < 1180) return 4;
        return 5;
    });

    // Build window slides stepping by perWindow (Netflix style) 12345 -> 67891 -> ...
    const windows = computed(() => {
        const arr = list.value;
        const W = perWindow.value;
        const L = arr.length;
        if (L === 0) return [] as FeaturedGame[][];
        if (W >= L) return [arr];
        const result: FeaturedGame[][] = [];
        let start = 0;
        const seen = new Set<number>();
        while (!seen.has(start)) {
            seen.add(start);
            const win: FeaturedGame[] = [];
            for (let i = 0; i < W; i++) {
                const item = arr[(start + i) % L];
                if (item) win.push(item);
            }
            result.push(win);
            start = (start + W) % L;
        }
        return result;
    });

    // Swiper lazy import
    const SwiperCmp = shallowRef<any>(null);
    const SwiperSlideCmp = shallowRef<any>(null);
    const modules = ref<any[]>([]);
    const ready = ref(false);
    const swiperRef = ref<any>(null);
    const activeWindow = ref(0);
    const loopEnabled = computed(() => windows.value.length > 1);

    // Autoplay options
    const autoplayOptions = computed(() =>
        props.autoplay === true
            ? {
                  delay: props.autoplayDelay ?? 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
              }
            : false
    );

    function onInit(sw: any) {
        swiperRef.value = sw;
    }
    function onSlideChange() {
        if (!swiperRef.value) return;
        const real = swiperRef.value.realIndex || 0;
        activeWindow.value = real % windows.value.length;
        maybeLoadMore();
        prefetchNext();
    }
    function jumpToWindow(idx: number) {
        if (!swiperRef.value) return;
        swiperRef.value.slideToLoop(idx, 600, true);
    }

    // Prefetch first image of next window
    function prefetchNext() {
        if (!import.meta.client) return;
        if (!windows.value.length) return;
        const nextWin =
            windows.value[(activeWindow.value + 1) % windows.value.length];
        const next = nextWin?.[0];
        if (!next?.image) return;
        const id = 'prefetch-win-' + next.id;
        if (document.getElementById(id)) return;
        const l = document.createElement('link');
        l.id = id;
        l.rel = 'prefetch';
        l.as = 'image';
        l.href = next.image;
        document.head.appendChild(l);
    }

    let loading = false;
    let last = 0;
    async function maybeLoadMore() {
        const threshold = props.bufferThreshold ?? 2;
        const total = list.value.length;
        const W = perWindow.value;
        const approxPos = activeWindow.value * W;
        const remaining = total - approxPos - W;
        if (remaining > threshold) return;
        const now = performance.now();
        if (loading || now - last < 500) return;
        last = now;
        loading = true;
        if (typeof props.loader === 'function') {
            try {
                const more = await props.loader();
                if (Array.isArray(more) && more.length) {
                    list.value.push(...more);
                    swiperRef.value?.updateSlides();
                }
            } finally {
                loading = false;
            }
        } else {
            emit('load-more');
            loading = false;
        }
    }

    onMounted(async () => {
        if (!import.meta.client) return;
        const [{ Swiper, SwiperSlide }, mod] = await Promise.all([
            import('swiper/vue'),
            import('swiper/modules')
        ]);
        SwiperCmp.value = Swiper;
        SwiperSlideCmp.value = SwiperSlide;
        const { Navigation, Autoplay } = mod as any;
        modules.value = [Navigation, Autoplay]; // @ts-expect-error css side effect
        await import('swiper/css');
        ready.value = true;
    });

    defineExpose({ jumpToWindow });
</script>

<style scoped>
    .nf-fg {
        padding: 70px 0 60px;
        position: relative;
    }
    .nf-fg-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
        margin-bottom: 28px;
    }
    .nf-fg-title {
        margin: 0;
        font-size: clamp(1.3rem, 2.1vw, 2.2rem);
        font-weight: 700;
        background: linear-gradient(92deg, #fff, #7ee7ff 45%, #19b4ff 70%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
    .nf-fg-controls {
        display: flex;
        gap: 14px;
    }
    .nf-btn {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.18);
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        transition: 0.35s;
    }
    .nf-btn:hover:not(:disabled) {
        background: linear-gradient(140deg, #ff8c2b, #ff5d00);
        border-color: #ff8c2b;
        transform: translateY(-3px);
    }
    .nf-btn:disabled {
        opacity: 0.35;
        cursor: default;
    }
    .nf-fg-wrapper {
        position: relative;
    }
    .nf-fg-swiper {
        overflow: visible;
        padding: 8px 2px 52px;
    }
    .nf-window-slide {
        display: flex;
        width: 100%;
    }
    .nf-window {
        --gap: 18px;
        display: flex;
        gap: var(--gap);
        width: 100%;
        justify-content: stretch;
        align-items: stretch;
    }
    .nf-card {
        /* Each card takes equal share; remove max-width clamp so items stretch */
        flex: 1 1 calc((100% - (var(--cols) - 1) * var(--gap)) / var(--cols));
        background: linear-gradient(165deg, #181b20, #121417);
        border-radius: 26px;
        padding: 12px 12px 16px;
        box-shadow: 0 8px 18px -6px rgba(0, 0, 0, 0.55);
        display: flex;
        flex-direction: column;
        position: relative;
        transition:
            transform 0.45s cubic-bezier(0.22, 0.8, 0.3, 1),
            box-shadow 0.45s;
        min-width: 0; /* allow text truncation within flex */
    }
    .nf-card:hover {
        transform: translateY(-6px) scale(1.04);
        box-shadow: 0 14px 32px -10px rgba(0, 0, 0, 0.6);
    }
    .nf-thumb {
        position: relative;
        aspect-ratio: 16/9;
        border-radius: 20px;
        overflow: hidden;
        background: #0d0f12;
    }
    .nf-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 1s ease;
        transform: scale(1.05);
    }
    .nf-card:hover .nf-thumb img {
        transform: scale(1.12);
    }
    .nf-badges {
        position: absolute;
        inset: auto 8px 8px 8px;
        display: flex;
        justify-content: space-between;
        gap: 6px;
        pointer-events: none;
        font-size: 0.6rem;
    }
    .b-status {
        background: rgba(0, 0, 0, 0.55);
        padding: 5px 10px 4px;
        border-radius: 16px;
        border: 1px solid #5bff3d;
        color: #5bff3d;
        font-weight: 600;
        line-height: 1;
    }
    .b-date {
        background: rgba(0, 0, 0, 0.55);
        padding: 5px 10px 4px;
        border-radius: 14px;
        color: #fff;
        font-weight: 500;
        line-height: 1;
    }
    .nf-name {
        font-size: clamp(0.9rem, 0.85rem + 0.25vw, 1.05rem);
        font-weight: 700;
        margin: 14px 4px 10px;
        color: #fff;
        line-height: 1.2;
        min-height: 2.1em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .nf-meta {
        margin-top: auto;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.64rem;
        font-weight: 600;
        color: #d4dae3;
    }
    .coin {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px 4px 6px;
        border-radius: 20px;
        background: #1d2127;
        line-height: 1;
    }
    .coin.a {
        background: linear-gradient(140deg, #242017, #38240e);
        border: 1px solid #ff9b38;
        color: #ffba63;
    }
    .coin.b {
        background: linear-gradient(140deg, #12262a, #10313a);
        border: 1px solid #20cfff;
        color: #76e6ff;
    }
    .price {
        margin-left: auto;
        background: #1c2026;
        padding: 5px 10px 5px;
        border-radius: 18px;
        letter-spacing: 0.4px;
        color: #fff;
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
    }
    .nf-dots {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: -4px;
    }
    .nf-dots .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: linear-gradient(130deg, #2a2f35, #171b20);
        cursor: pointer;
        transition: 0.4s;
    }
    .nf-dots .dot.active {
        background: linear-gradient(120deg, #ff7f30, #ff4500);
        transform: scale(1.35);
        box-shadow: 0 0 0 4px rgba(255, 126, 48, 0.2);
    }
    .nf-empty {
        text-align: center;
        padding: 70px 0;
        color: #88909b;
        font-size: 0.85rem;
    }
    @media (max-width: 1180px) {
        .nf-window {
            --gap: 16px;
        }
    }
    @media (max-width: 880px) {
        .nf-window {
            --gap: 14px;
        }
    }
    @media (max-width: 640px) {
        .nf-btn {
            width: 46px;
            height: 46px;
        }
        .nf-card {
            border-radius: 22px;
        }
        .nf-thumb {
            border-radius: 18px;
        }
    }
</style>
