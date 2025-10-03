<template>
    <section class="section-padding games-carousel-section bg-dark-alt">
        <div class="position-relative container">
            <header class="section-header mb-5 text-center">
                <p class="subtitle text-accent mb-2">Featured Games (Snap)</p>
                <h2 class="display-6 fw-bold mb-3 text-white">
                    Scroll Snap Carousel
                </h2>
                <p class="text-muted">
                    Native CSS scroll-snap – siêu mượt, không giật.
                </p>
            </header>
            <div class="snap-wrapper">
                <button
                    class="snap-nav prev"
                    @click="scrollByItem(-1)"
                    aria-label="Previous"
                >
                    ‹
                </button>
                <div ref="track" class="snap-track" @wheel.passive="onWheel">
                    <div v-for="g in games" :key="g.id" class="snap-item">
                        <div class="card d-flex flex-column h-100">
                            <NuxtImg
                                :src="g.image"
                                :alt="g.name"
                                width="420"
                                height="236"
                                class="game-img mb-3 rounded"
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
                                    class="btn btn-sm btn-outline-light"
                                    >Play</NuxtLink
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    class="snap-nav next"
                    @click="scrollByItem(1)"
                    aria-label="Next"
                >
                    ›
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import type { GameItem } from './GamesCarousel.vue';

    const _props = defineProps<{ games: GameItem[] }>();
    const track = ref<HTMLElement | null>(null);
    const GAP = 24;
    const ITEM_WIDTH = 250; // must sync with CSS
    let autoplayId: number | null = null;

    function scrollByItem(dir: number) {
        const el = track.value;
        if (!el) return;
        const step = ITEM_WIDTH + GAP;
        el.scrollBy({ left: dir * step, behavior: 'smooth' });
    }

    function onWheel(e: WheelEvent) {
        // shift vertical wheel to horizontal for desktop convenience
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            track.value?.scrollBy({ left: e.deltaY, behavior: 'auto' });
        }
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayId = window.setInterval(() => scrollByItem(1), 3800);
    }
    function stopAutoplay() {
        if (autoplayId) {
            clearInterval(autoplayId);
            autoplayId = null;
        }
    }

    onMounted(() => {
        startAutoplay();
        track.value?.addEventListener('pointerdown', stopAutoplay, {
            passive: true
        });
    });
    onBeforeUnmount(() => stopAutoplay());
</script>

<style scoped>
    .snap-wrapper {
        position: relative;
    }
    .snap-track {
        display: flex;
        gap: 24px;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        padding: 10px 6px 40px;
        scrollbar-width: none;
    }
    .snap-track::-webkit-scrollbar {
        display: none;
    }
    .snap-item {
        scroll-snap-align: start;
        flex: 0 0 auto;
        width: 250px;
    }
    .card {
        background: #141b24;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 18px;
        padding: 12px;
    }
    .card:hover {
        box-shadow:
            0 10px 30px -8px rgba(0, 0, 0, 0.55),
            0 0 0 1px rgba(255, 255, 255, 0.05);
    }
    .game-img {
        object-fit: cover;
        height: 180px;
        width: 100%;
    }
    .snap-nav {
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
        cursor: pointer;
    }
    .snap-nav:hover {
        background: rgba(0, 180, 255, 0.35);
    }
    .snap-nav.prev {
        left: -12px;
    }
    .snap-nav.next {
        right: -12px;
    }
    @media (max-width: 991.98px) {
        .snap-nav.prev {
            left: 0;
        }
        .snap-nav.next {
            right: 0;
        }
    }
</style>
