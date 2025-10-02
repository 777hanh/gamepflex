<template>
    <section class="nf-fg">
        <div class="nf-fg-head">
            <h2 class="nf-fg-title">Featured Games</h2>
            <div class="nf-fg-controls">
                <button
                    class="nf-btn prev"
                    :disabled="!swiperRef"
                    @click="navPrevPage"
                >
                    <i class="i-tabler-chevron-left" />
                </button>
                <button
                    class="nf-btn next"
                    :disabled="!swiperRef"
                    @click="navNextPage"
                >
                    <i class="i-tabler-chevron-right" />
                </button>
            </div>
        </div>
        <div v-if="ready && list.length" class="nf-fg-wrapper">
            <component
                :is="SwiperCmp"
                class="nf-fg-swiper"
                :modules="modules"
                :loop="false"
                :slides-per-view="perWindow"
                :centered-slides="true"
                :space-between="gap"
                :speed="520"
                grab-cursor
                :style="{ '--cols': perWindow }"
                :autoplay="autoplayOptions"
                @swiper="onInit"
                @slide-change="onSlideChange"
                @set-translate="onRealtimeMove"
            >
                <component
                    v-for="entry in repeatedList"
                    :is="SwiperSlideCmp"
                    :key="entry.key"
                    class="nf-item-slide"
                    :data-g-idx="entry.baseIndex"
                >
                    <div
                        class="nf-card"
                        :class="cardStateClass(entry.baseIndex)"
                    >
                        <div class="nf-thumb">
                            <NuxtImg
                                :src="entry.item.image"
                                :alt="entry.item.name"
                                format="webp"
                                loading="lazy"
                                width="400"
                                height="225"
                            />
                            <div class="nf-badges">
                                <span
                                    class="b-status"
                                    v-if="entry.item.status"
                                    >{{ entry.item.status }}</span
                                >
                                <span class="b-date" v-if="entry.item.date">{{
                                    entry.item.date
                                }}</span>
                            </div>
                        </div>
                        <h3 class="nf-name" :title="entry.item.name">
                            {{ entry.item.name }}
                        </h3>
                        <div class="nf-meta">
                            <span class="coin a"
                                ><i class="i-tabler-currency-bitcoin" />{{
                                    entry.item.coinA || 75
                                }}</span
                            >
                            <span class="coin b"
                                ><i class="i-tabler-coin" />{{
                                    entry.item.coinB || 54
                                }}</span
                            >
                            <span class="price">{{
                                entry.item.price || '$49.97'
                            }}</span>
                        </div>
                    </div>
                </component>
            </component>
        </div>
        <div v-else class="nf-empty">Loading...</div>
        <div class="nf-dots" v-if="showDots">
            <span
                v-for="(g, idx) in list"
                :key="'dot-' + idx"
                class="dot"
                :class="{ active: idx === activeItemGlobalIndex }"
                @click="goTo(idx)"
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
    const gap = 18;

    // Swiper lazy import
    const SwiperCmp = shallowRef<any>(null);
    const SwiperSlideCmp = shallowRef<any>(null);
    const modules = ref<any[]>([]);
    const ready = ref(false);
    const swiperRef = ref<any>(null);
    const activeItemGlobalIndex = ref<number>(0); // index within list
    const showDots = computed(
        () => list.value.length <= 40 && list.value.length > perWindow.value + 1
    );
    const isDragging = ref(false);
    const REPEATS = 7; // odd ensures symmetrical center band
    const repeatedList = computed(() => {
        const base = list.value;
        const L = base.length;
        const result: { item: FeaturedGame; key: string; baseIndex: number }[] =
            [];
        if (!L) return result;
        for (let r = 0; r < REPEATS; r++) {
            for (let i = 0; i < L; i++) {
                const it = base[i];
                if (!it) continue;
                result.push({
                    item: it as FeaturedGame,
                    key: (it.id ?? i) + '-r' + r + '-' + i,
                    baseIndex: i
                });
            }
        }
        return result;
    });
    function middleBandIndex(baseIdx: number) {
        const L = list.value.length || 1;
        return baseIdx + L * Math.floor(REPEATS / 2);
    }
    function recenterToBase(baseIdx: number) {
        const sw = swiperRef.value;
        const L = list.value.length;
        if (!sw || !L) return;
        const target = middleBandIndex(baseIdx % L);
        sw.slideTo(target, 0, false);
    }
    function keepInMiddle() {
        const sw = swiperRef.value;
        const L = list.value.length;
        if (!sw || !L) return;
        const total = L * REPEATS;
        const idx = sw.realIndex ?? sw.activeIndex ?? 0;
        if (idx < L || idx >= total - L) {
            const base = idx % L;
            recenterToBase(base);
        }
    }
    watch(
        () => list.value.length,
        (L, old) => {
            if (L && old && L !== old)
                recenterToBase(activeItemGlobalIndex.value % L);
        }
    );

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
        // initial active
        requestAnimationFrame(updateActiveItemFromDom);
        try {
            sw.on('touchStart', () => {
                isDragging.value = true;
            });
            sw.on('touchEnd', () => {
                isDragging.value = false;
                keepInMiddle();
            });
        } catch {
            /* attach events failed */
        }
        // Initial center on middle band index 0
        requestAnimationFrame(() => {
            recenterToBase(0);
            // multi-pass to ensure first active without user interaction
            let pass = 0;
            const run = () => {
                updateActiveItemFromDom();
                if (++pass < 5) requestAnimationFrame(run);
            };
            run();
        });
    }
    function onSlideChange() {
        keepInMiddle();
        requestAnimationFrame(updateActiveItemFromDom);
        maybeLoadMore();
        prefetchNext();
    }
    function goTo(idx: number) {
        recenterToBase(idx);
        const target = middleBandIndex(idx);
        swiperRef.value?.slideTo(target, 520, true);
    }
    function navNextPage() {
        swiperRef.value?.slideNext();
    }
    function navPrevPage() {
        swiperRef.value?.slidePrev();
    }
    function cardStateClass(globalIdx: number) {
        const active = activeItemGlobalIndex.value % list.value.length;
        const total = list.value.length || 1;
        let dist = Math.abs(globalIdx - active);
        dist = Math.min(dist, total - dist);
        return {
            'is-active': globalIdx === active,
            'is-near': dist === 1,
            'is-far': dist > 1
        };
    }

    // Real-time during drag / momentum
    let rafId: number | null = null;
    function onRealtimeMove() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateActiveItemFromDom);
    }
    function updateActiveItemFromDom() {
        // Find card whose center is closest to wrapper center
        const root = document.querySelector('.nf-fg-wrapper');
        if (!root) return;
        const centerX =
            root.getBoundingClientRect().left + root.clientWidth / 2;
        const cards = root.querySelectorAll('.nf-item-slide');
        let best: HTMLElement | null = null as HTMLElement | null;
        let bestDist = Infinity;
        cards.forEach((node) => {
            const el = node as HTMLElement;
            const r = el.getBoundingClientRect();
            const c = r.left + r.width / 2;
            const d = Math.abs(c - centerX);
            if (d < bestDist) {
                bestDist = d;
                best = el;
            }
        });
        if (best) {
            const idxAttr = best.getAttribute('data-g-idx');
            if (idxAttr) {
                const gi = parseInt(idxAttr, 10);
                if (!Number.isNaN(gi) && gi !== activeItemGlobalIndex.value) {
                    activeItemGlobalIndex.value = gi;
                    // Proactive load check when active shifts during drag
                    maybeLoadMore();
                    prefetchNext();
                }
            }
        }
    }

    // Prefetch first image of next window
    function prefetchNext() {
        if (!import.meta.client) return;
        const total = list.value.length;
        if (!total) return;
        // Prefetch 2 items ahead
        for (let ahead = 1; ahead <= 2; ahead++) {
            const itm =
                list.value[(activeItemGlobalIndex.value + ahead) % total];
            if (!itm?.image) continue;
            const id = 'prefetch-item-' + itm.id;
            if (document.getElementById(id)) continue;
            const l = document.createElement('link');
            l.id = id;
            l.rel = 'prefetch';
            l.as = 'image';
            l.href = itm.image;
            document.head.appendChild(l);
        }
    }

    let loading = false;
    let last = 0;
    async function maybeLoadMore() {
        const dynamic = Math.max(Math.ceil(perWindow.value / 2), 2);
        const threshold = props.bufferThreshold ?? dynamic;
        let attempts = 0;
        const MAX_BURST = 3; // safety cap per trigger
        // Use loop to allow back-to-back loads until buffer satisfied or cap reached
        while (attempts < MAX_BURST) {
            const total = list.value.length;
            const remaining = total - activeItemGlobalIndex.value - 1;
            if (remaining > threshold) break;
            const now = performance.now();
            if (loading || now - last < 160) break; // shorter cooldown for burst
            last = now;
            loading = true;
            attempts++;
            if (typeof props.loader === 'function') {
                try {
                    const more = await props.loader();
                    if (Array.isArray(more) && more.length) {
                        const baseActive =
                            activeItemGlobalIndex.value % list.value.length;
                        list.value.push(...more);
                        const sw = swiperRef.value;
                        if (sw) {
                            sw.updateSlides();
                            recenterToBase(baseActive);
                            requestAnimationFrame(() => {
                                updateActiveItemFromDom();
                                prefetchNext();
                            });
                        }
                    } else {
                        // no more data; stop loop
                        attempts = MAX_BURST;
                    }
                } finally {
                    loading = false;
                }
            } else {
                emit('load-more');
                loading = false;
                break; // external handler unknown timing
            }
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

    defineExpose({ goTo });
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
    .nf-item-slide {
        display: flex;
        justify-content: center;
    }
    :deep(.swiper-slide) {
        height: auto;
    }
    .nf-card {
        background: linear-gradient(165deg, #181b20, #121417);
        border-radius: 26px;
        padding: 12px 12px 16px;
        box-shadow: 0 8px 18px -6px rgba(0, 0, 0, 0.55);
        display: flex;
        flex-direction: column;
        position: relative;
        min-width: 0;
        transition:
            transform 0.55s cubic-bezier(0.22, 0.8, 0.3, 1),
            box-shadow 0.55s,
            border-color 0.4s;
        border: 2px solid rgba(255, 255, 255, 0.06);
        transform: scale(0.86) translateY(12px);
        opacity: 0.6;
        width: calc(
            (min(1400px, 100%) - (var(--cols) - 1) * 18px) / var(--cols)
        );
    }
    .nf-card.is-near {
        transform: scale(0.93) translateY(6px);
        opacity: 0.85;
    }
    .nf-card.is-active {
        transform: scale(1.05) translateY(0);
        box-shadow: 0 18px 42px -14px rgba(0, 0, 0, 0.65);
        border-color: #ff7f30;
        opacity: 1;
    }
    .nf-card:hover {
        transform: scale(1.07) translateY(-4px);
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
        .nf-card {
            padding: 12px 10px 14px;
        }
    }
    @media (max-width: 880px) {
        .nf-card {
            transform: scale(0.9) translateY(10px);
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
