<template>
    <section class="section-padding games-carousel-section bg-dark-alt">
        <div class="position-relative container">
            <div class="section-header mb-5 text-center">
                <ClientOnly>
                    <p
                        class="subtitle text-accent text-anim title-anim mb-2"
                        data-split-type="words, chars"
                        data-split-duration="0.7"
                        data-split-stagger="0.035"
                        data-split-effect="fade"
                        data-split-once="false"
                    >
                        Featured Games
                    </p>
                    <h2
                        class="display-6 fw-bold text-anim title-anim mb-3 text-white"
                        data-split-stagger="0.04"
                        data-split-effect="up"
                        data-split-once="false"
                    >
                        Gaming To The Next Level
                    </h2>
                    <h2
                        class="title-anim"
                        data-split-type="words, chars"
                        data-split-duration="0.8"
                        data-split-stagger="0.04"
                        data-split-once="false"
                    >
                        Elevate Your Gameplay
                    </h2>
                    <p class="text-muted">
                        Trải nghiệm nhanh các tựa game nổi bật
                    </p>
                </ClientOnly>
            </div>
            <ClientOnly>
                <Swiper
                    :modules="swiperModules"
                    class="games-swiper drag-none select-none"
                    :space-between="24"
                    :slides-per-view="'auto'"
                    :autoplay="{
                        delay: 3200,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true
                    }"
                    :speed="420"
                    :loop="enableLoop"
                    :round-lengths="true"
                    :touch-ratio="1.05"
                    :resistance-ratio="0.82"
                    :loop-additional-slides="2"
                    :watch-slides-progress="true"
                    :grab-cursor="true"
                    :free-mode="{
                        enabled: true,
                        momentum: true,
                        sticky: false
                    }"
                    navigation
                    @touchstart="onDragStart"
                    @touchend="onDragEnd"
                    @slider-first-move="onDragStart"
                >
                    <SwiperSlide v-for="(g, i) in games" :key="g.id">
                        <div
                            :class="[
                                'carousel-item',
                                'magnetic-depth',
                                !disableMagnetic && 'magnetic',
                                'h-100'
                            ]"
                            data-aos="fade-up"
                            data-aos-duration="700"
                            :data-aos-delay="(i * 60) % 480"
                            data-depth-ease="0.14"
                        >
                            <div
                                class="magnetic-inner item-inner d-flex flex-column h-100 p-3"
                            >
                                <NuxtImg
                                    :src="g.image"
                                    :alt="g.name"
                                    width="420"
                                    height="236"
                                    class="game-img mb-3 w-100 rounded"
                                />
                                <h6 class="mb-1 text-white">{{ g.name }}</h6>
                                <small class="text-muted mb-2">{{
                                    g.description
                                }}</small>
                                <div
                                    class="d-flex justify-content-between align-items-center small mt-auto"
                                >
                                    <span class="text-accent fw-semibold"
                                        >{{ g.players }} players</span
                                    >
                                    <NuxtLink
                                        :to="`/games/${g.id}`"
                                        class="btn btn-sm btn-outline-light magnetic"
                                        >Play</NuxtLink
                                    >
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <template #navigation-prev>
                        <button class="nav-btn prev magnetic">
                            <i class="fas fa-chevron-left" />
                        </button>
                    </template>
                    <template #navigation-next>
                        <button class="nav-btn next magnetic">
                            <i class="fas fa-chevron-right" />
                        </button>
                    </template>
                </Swiper>
            </ClientOnly>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Autoplay, Navigation, FreeMode } from 'swiper/modules';
    // @ts-expect-error swiper css types not required
    import 'swiper/css';
    // @ts-expect-error swiper css types not required
    import 'swiper/css/navigation';
    import { useAnimation } from '@/composables/useAnimation';
    import { computed, ref } from 'vue';

    export interface GameItem {
        id: number;
        name: string;
        description: string;
        image: string;
        players: string;
    }

    const props = defineProps<{ games: GameItem[] }>();
    // Only enable loop when we have enough slides to avoid constant cloning reposition jumps
    const enableLoop = computed(() => props.games && props.games.length > 6);
    const swiperModules = [Autoplay, Navigation, FreeMode];
    useAnimation();

    // Temporarily disable magnetic hover effect during drag to reduce mousemove overhead / repaints
    const disableMagnetic = ref(false);
    const dragTimeout = ref<number | null>(null);
    const onDragStart = () => {
        if (dragTimeout.value) {
            window.clearTimeout(dragTimeout.value);
            dragTimeout.value = null;
        }
        disableMagnetic.value = true;
    };
    const onDragEnd = () => {
        // Give a tiny delay so momentum animation finishes before re-enabling hover effects
        dragTimeout.value = window.setTimeout(() => {
            disableMagnetic.value = false;
        }, 180);
    };

    // Declare slots to satisfy TS (navigation-prev / navigation-next custom slots)
    defineSlots<{
        'navigation-prev': () => any;
        'navigation-next': () => any;
    }>();
</script>

<style scoped>
    .games-swiper {
        padding: 10px 6px 40px;
    }
    /* GPU & paint optimization for smoother dragging */
    .games-swiper :deep(.swiper-wrapper) {
        will-change: transform;
    }
    .games-swiper :deep(.swiper-slide) {
        will-change: transform;
        backface-visibility: hidden;
        transform: translateZ(0);
        width: 250px; /* fixed width for slidesPerView 'auto' to stabilize layout & momentum */
    }
    @media (min-width: 576px) {
        .games-swiper :deep(.swiper-slide) {
            width: 260px;
        }
    }
    @media (min-width: 992px) {
        .games-swiper :deep(.swiper-slide) {
            width: 270px;
        }
    }
    .carousel-item {
        background: #141b24;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 18px;
        position: relative;
        height: 100%;
        transition:
            box-shadow 0.28s ease,
            transform 0.28s ease;
    }
    .carousel-item .game-img {
        object-fit: cover;
        border-radius: 14px;
        height: 180px;
    }
    .carousel-item:hover {
        box-shadow:
            0 10px 30px -8px rgba(0, 0, 0, 0.55),
            0 0 0 1px rgba(255, 255, 255, 0.05);
    }
    .nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 5;
        border: none;
        background: rgba(255, 255, 255, 0.08);
        color: #fff;
        width: 46px;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        backdrop-filter: blur(6px);
        transition: background 0.3s;
    }
    .nav-btn:hover {
        background: rgba(0, 180, 255, 0.35);
    }
    .nav-btn.prev {
        left: -12px;
    }
    .nav-btn.next {
        right: -12px;
    }
    @media (max-width: 991.98px) {
        .nav-btn.prev {
            left: 0;
        }
        .nav-btn.next {
            right: 0;
        }
    }
</style>
