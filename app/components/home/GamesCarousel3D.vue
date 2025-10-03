<template>
    <section class="swiper-3d-section position-relative" :id="sectionId">
        <div class="container">
            <header v-if="showHeader" class="swiper-3d-head mb-5 text-center">
                <p class="subtitle text-accent mb-2">{{ subtitle }}</p>
                <h2 class="display-6 fw-bold mb-0 text-white">{{ title }}</h2>
            </header>
            <ClientOnly>
                <Swiper
                    :key="swiperKey"
                    ref="swiperEl"
                    class="swiper-3d-container"
                    :modules="modules"
                    :loop="!useManualInfinite && loop"
                    v-bind="useManualInfinite ? {} : nativeLoopProps"
                    :slides-per-view="'auto'"
                    :centered-slides="true"
                    :space-between="spaceBetween"
                    effect="coverflow"
                    :coverflow-effect="coverflow"
                    :speed="speed"
                    :watch-slides-progress="true"
                    :autoplay="autoplayOptions"
                    :grab-cursor="true"
                    :navigation="navOpts"
                    @swiper="onInit"
                    @slide-change="onSlideChange"
                    @autoplay-time-left="onTimeLeft"
                >
                    <SwiperSlide
                        v-for="g in renderGames"
                        :key="g._key"
                        class="swiper-slide-3d"
                        :data-base-idx="g._baseIndex"
                    >
                        <div
                            :class="[
                                'card-3d',
                                'd-grid',
                                'justify-content-center',
                                'p-3',
                                idx === activeIndex && 'is-active'
                            ]"
                        >
                            <div class="img-area position-relative mb-8 w-100">
                                <span
                                    v-if="g.date"
                                    class="card-date position-absolute tcn-1 d-flex align-items-center fs-sm end-0 top-0 me-5 mt-4 gap-1 px-3 py-2"
                                >
                                    <i class="ti ti-calendar-due"></i>
                                    {{ g.date }}
                                </span>
                                <NuxtImg
                                    :src="g.image"
                                    :alt="g.name"
                                    class="w-100"
                                    width="500"
                                    height="300"
                                    format="webp"
                                    :loading="lazyImages ? 'lazy' : 'eager'"
                                />
                                <span
                                    v-if="g.status"
                                    class="card-status position-absolute tcn-1 fs-sm start-0 px-6 py-2"
                                >
                                    <span class="dot-icon alt-icon ps-3">{{
                                        g.status
                                    }}</span>
                                </span>
                            </div>
                            <h5
                                class="card-title tcn-1 title-anim mb-4 text-center"
                                :title="g.name"
                            >
                                {{ g.name }}
                            </h5>
                            <div class="d-center">
                                <div class="card-info d-center gap-3 px-3 py-1">
                                    <div
                                        class="d-flex align-items-center gap-2"
                                    >
                                        <img
                                            class="w-100"
                                            src="/assets/img/bitcoin.png"
                                            alt="bitcoin"
                                        />
                                        <span class="tcn-1 fs-xs">{{
                                            g.coinA ?? 75
                                        }}</span>
                                    </div>
                                    <div class="v-line"></div>
                                    <div
                                        class="d-flex align-items-center gap-2"
                                    >
                                        <img
                                            class="w-100"
                                            src="/assets/img/tether.png"
                                            alt="tether"
                                        />
                                        <span class="tcn-1 fs-xs">{{
                                            g.price || '$49.97'
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <template #navigation-prev>
                        <div class="swiper-btn swiper-3d-button-prev box-style">
                            <i class="ti ti-chevron-left fs-xl" />
                        </div>
                    </template>
                    <template #navigation-next>
                        <div class="swiper-btn swiper-3d-button-next box-style">
                            <i class="ti ti-chevron-right fs-xl" />
                        </div>
                    </template>
                </Swiper>
                <div v-if="showProgress" class="autoplay-progress-bar mt-3">
                    <div
                        class="ap-bar"
                        :style="{
                            width: (autoplayProgress * 100).toFixed(1) + '%'
                        }"
                    />
                </div>
            </ClientOnly>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';
    // @ts-expect-error Swiper CSS has no TypeScript module declarations
    import 'swiper/css';
    // @ts-expect-error Swiper navigation CSS no TS types
    import 'swiper/css/navigation';
    // @ts-expect-error Swiper effect-coverflow CSS no TS types
    import 'swiper/css/effect-coverflow';
    import { computed, ref, watch, nextTick } from 'vue';

    export interface Carousel3DItem {
        id?: string | number;
        name: string;
        image: string;
        status?: string;
        date?: string;
        coinA?: number | string;
        price?: string;
    }

    const props = defineProps<{
        games: Carousel3DItem[];
        loop?: boolean;
        autoplay?: boolean | { delay?: number };
        autoplayDelay?: number;
        speed?: number;
        spaceBetween?: number;
        title?: string;
        subtitle?: string;
        showHeader?: boolean;
        showProgress?: boolean;
        lazyImages?: boolean;
        sectionId?: string;
    }>();

    const emit = defineEmits<{
        (
            e: 'active-change',
            payload: { index: number; item: Carousel3DItem }
        ): void;
    }>();

    const modules = [Autoplay, Navigation, EffectCoverflow];
    const coverflow = {
        rotate: 0,
        stretch: 0,
        depth: 180,
        modifier: 1.15,
        scale: 0.9,
        slideShadows: false
    };

    const speed = computed(() => props.speed ?? 520);
    const spaceBetween = computed(() => props.spaceBetween ?? 40);
    const loop = computed(() => props.loop !== false && props.games.length > 1);
    // Support variables for Swiper loop reliability
    const loopedSlides = computed(() => Math.min(props.games.length, 20));
    const loopAdditionalSlides = computed(() =>
        Math.min(
            props.games.length,
            props.games.length >= 6 ? 6 : props.games.length
        )
    );
    const autoplayOptions = computed(() => {
        if (props.autoplay === false) return false;
        const delay =
            (typeof props.autoplay === 'object' && props.autoplay.delay) ||
            props.autoplayDelay ||
            3600;
        return { delay, disableOnInteraction: true };
    });
    // Native loop props bundler
    const nativeLoopProps = computed(() => ({
        loopedSlides: loopedSlides.value,
        loopAdditionalSlides: loopAdditionalSlides.value
    }));

    // Manual infinite fallback
    const REPEATS = 5; // odd -> center band
    const useManualInfinite = computed(
        () => props.manualInfinite !== false && loop.value
    );
    const baseLen = computed(() => props.games.length);
    const repeatedGames = computed(() => {
        if (!useManualInfinite.value) return [];
        const out: any[] = [];
        const L = baseLen.value;
        const base = props.games;
        for (let r = 0; r < REPEATS; r++) {
            for (let i = 0; i < L; i++) {
                const it = base[i];
                if (!it) continue;
                out.push({
                    ...it,
                    _key: (it.id ?? i) + '-r' + r + '-' + i,
                    _baseIndex: i
                });
            }
        }
        return out;
    });
    const renderGames = computed(() =>
        useManualInfinite.value
            ? repeatedGames.value
            : normalizedGames.value.map((g, i) => ({
                  ...g,
                  _key: g.id ?? i,
                  _baseIndex: i
              }))
    );
    const middleBandOffset = computed(
        () => baseLen.value * Math.floor(REPEATS / 2)
    );
    const title = computed(() => props.title || 'Coverflow Effect');
    const subtitle = computed(() => props.subtitle || 'Featured Games 3D');
    const showHeader = computed(() => props.showHeader !== false);
    const showProgress = computed(
        () => props.showProgress !== false && autoplayOptions.value !== false
    );
    const lazyImages = computed(() => props.lazyImages !== false);
    const sectionId = computed(() => props.sectionId || 'swiper-3d');

    const normalizedGames = computed(() => props.games || []);

    const activeIndex = ref(0);
    const swiperKey = ref(0); // force remount when loop boundary toggles
    const autoplayProgress = ref(0); // 0..1
    const swiperInstance = ref<any>(null);

    function recenterManual(sw: any) {
        if (!useManualInfinite.value) return;
        const L = baseLen.value;
        if (!L) return;
        const total = L * REPEATS;
        const idx = sw.realIndex ?? sw.activeIndex ?? 0;
        if (idx < L || idx >= total - L) {
            const base = idx % L;
            const target = middleBandOffset.value + base;
            sw.slideTo(target, 0, false);
        }
    }
    function onInit(sw: any) {
        swiperInstance.value = sw;
        if (useManualInfinite.value) {
            nextTick(() => {
                const target = middleBandOffset.value;
                sw.slideTo(target, 0, false);
                activeIndex.value = 0;
            });
        }
    }
    function onSlideChange(sw: any) {
        if (useManualInfinite.value) {
            const L = baseLen.value;
            const idx = sw.realIndex ?? sw.activeIndex ?? 0;
            activeIndex.value = L ? idx % L : 0;
            recenterManual(sw);
        } else {
            activeIndex.value = sw.realIndex ?? sw.activeIndex ?? 0;
        }
    }
    function onTimeLeft(_sw: any, _time: number, progress: number) {
        autoplayProgress.value = 1 - progress;
    }

    watch(activeIndex, (i) => {
        const item = normalizedGames.value[i];
        if (item) emit('active-change', { index: i, item });
    });

    // Re-mount Swiper when loop state toggles (0/1 vs >1 items)
    watch(
        () => loop.value,
        (val, old) => {
            if (useManualInfinite.value) return;
            if (val !== old) {
                swiperKey.value++;
                activeIndex.value = 0;
            }
        }
    );

    // Update slides on games length / identity change without remount
    watch(
        () => props.games.map((g) => g?.id),
        () => {
            requestAnimationFrame(() => {
                if (!swiperInstance.value) return;
                try {
                    swiperInstance.value.updateSlides();
                    swiperInstance.value.update();
                    if (useManualInfinite.value)
                        recenterManual(swiperInstance.value);
                } catch {
                    // swallow update errors (Swiper not fully mounted yet)
                }
            });
        }
    );

    function next() {
        swiperInstance.value?.slideNext();
    }
    function prev() {
        swiperInstance.value?.slidePrev();
    }
    function slideTo(i: number) {
        if (!swiperInstance.value) return;
        if (swiperInstance.value.slideToLoop && loop.value)
            swiperInstance.value.slideToLoop(i);
        else swiperInstance.value.slideTo(i);
    }
    function refresh() {
        nextTick(() => {
            swiperInstance.value?.updateSlides();
            swiperInstance.value?.update();
        });
    }

    const navOpts = {
        prevEl: '.swiper-3d-button-prev',
        nextEl: '.swiper-3d-button-next'
    };

    defineExpose({
        next,
        prev,
        slideTo,
        refresh,
        getActive: () => normalizedGames.value[activeIndex.value]
    });
</script>

<style scoped>
    .swiper-3d-section {
        padding: 70px 0 60px;
    }
    .swiper-3d-container {
        overflow: visible;
    }
    .swiper-slide-3d {
        width: 340px;
    }
    @media (max-width: 640px) {
        .swiper-slide-3d {
            width: 270px;
        }
    }

    .card-3d {
        background: #141b24;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 22px;
        position: relative;
        transition:
            box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.45s;
    }
    .card-3d:hover {
        box-shadow:
            0 10px 30px -8px rgba(0, 0, 0, 0.55),
            0 0 0 1px rgba(255, 255, 255, 0.05);
    }
    :deep(.swiper-slide-active .card-3d),
    .card-3d.is-active {
        transform: scale(1.065);
        border-color: rgba(0, 180, 255, 0.55);
        box-shadow:
            0 14px 38px -10px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(0, 180, 255, 0.35),
            0 0 22px -2px rgba(0, 180, 255, 0.4);
    }
    .card-3d.is-active::before {
        content: '';
        position: absolute;
        inset: 0;
        padding: 1.2px;
        border-radius: inherit;
        background: linear-gradient(130deg, #00b4ff, #006bff, #00e0ff);
        background-size: 300% 300%;
        animation: borderflow 6s linear infinite;
        -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
        mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
    }
    @keyframes borderflow {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
    .card-3d.is-active .game-img::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 14px;
        pointer-events: none;
        background: radial-gradient(
            circle at 50% 65%,
            rgba(0, 180, 255, 0.25),
            rgba(0, 180, 255, 0) 70%
        );
        mix-blend-mode: screen;
    }

    .img-area img {
        border-radius: 14px;
        display: block;
    }
    .card-title {
        font-weight: 600;
    }
    .card-info {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 40px;
        backdrop-filter: blur(4px);
    }
    .v-line {
        width: 1px;
        height: 18px;
        background: rgba(255, 255, 255, 0.15);
    }

    /* Navigation */
    .swiper-btn-area,
    .swiper-btn {
        user-select: none;
    }
    .swiper-btn {
        width: 54px;
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.18);
        color: #fff;
        transition: 0.4s;
    }
    .swiper-btn:hover {
        background: linear-gradient(140deg, #00b4ff, #007bff);
        border-color: #00b4ff;
        transform: translateY(-4px);
    }

    /* Autoplay progress */
    .autoplay-progress-bar {
        position: relative;
        height: 4px;
        background: rgba(255, 255, 255, 0.12);
        border-radius: 3px;
        overflow: hidden;
    }
    .autoplay-progress-bar .ap-bar {
        height: 100%;
        background: linear-gradient(90deg, #00b4ff, #0070ff, #00e0ff);
        transition: width 0.25s linear;
    }
</style>
