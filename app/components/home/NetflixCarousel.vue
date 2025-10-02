<template>
    <section
        class="nf-carousel"
        @mouseenter="pauseAutoplay"
        @mouseleave="resumeAutoplay"
    >
        <div class="nf-header">
            <h2 class="nf-title">Netflix Carousel</h2>
            <div class="nf-controls">
                <button
                    class="nf-btn prev"
                    :disabled="!swiperInstance"
                    @click="swiperInstance?.slidePrev()"
                >
                    <i class="i-tabler-chevron-left" />
                </button>
                <button
                    class="nf-btn next"
                    :disabled="!swiperInstance"
                    @click="swiperInstance?.slideNext()"
                >
                    <i class="i-tabler-chevron-right" />
                </button>
            </div>
        </div>
        <div class="nf-wrapper" v-if="ready && windows.length">
            <component
                :is="SwiperCmp"
                class="nf-swiper"
                :modules="modules"
                :loop="loopEnabled"
                :slides-per-view="1"
                :slides-per-group="1"
                :space-between="0"
                :centered-slides="false"
                :autoplay="autoplayOptions"
                :speed="600"
                :breakpoints="undefined"
                @swiper="onInit"
                @slide-change="onSlideChange"
            >
                <component
                    v-for="(win, wIdx) in windows"
                    :is="SwiperSlideCmp"
                    :key="'win-' + wIdx"
                    class="nf-window-slide"
                >
                    <div class="nf-window">
                        <div
                            v-for="(item, i) in win"
                            :key="'nf-' + (item.id || i)"
                            class="nf-card"
                        >
                            <img
                                :src="item.image"
                                :alt="item.title"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </component>
            </component>
        </div>
        <div v-else class="nf-empty">No items</div>
    </section>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, shallowRef } from 'vue';

    interface Item {
        id?: string | number;
        title: string;
        image: string;
    }
    const props = defineProps<{
        items?: Item[];
        perSlide?: number;
        grow?: number;
        autoplay?: boolean;
        autoplayDelay?: number;
        gap?: number;
        breakpoints?: Record<string, any>;
    }>();

    // (grow removed in grouped mode)
    const perSlide = computed(() => props.perSlide ?? 6);
    // (gap removed in grouped mode)
    const autoplayEnabled = computed(() => props.autoplay === true);
    const autoplayDelay = computed(() => props.autoplayDelay ?? 4000);

    // Demo fallback
    const demoItems: Item[] = Array.from({ length: 8 }).map((_, i) => ({
        id: 'd-' + i,
        title: 'Item ' + (i + 1),
        image: `https://placehold.co/341x192/png?text=${encodeURIComponent(
            'Item ' + (i + 1)
        )}`
    }));
    const rawItems = computed(() =>
        props.items?.length ? props.items : demoItems
    );

    // Swiper dynamic import (client only)
    const SwiperCmp = shallowRef<any>(null);
    const SwiperSlideCmp = shallowRef<any>(null);
    const modules = ref<any[]>([]);
    const ready = ref(false);
    const swiperInstance = ref<any>(null);

    // Build window slides stepping by perSlide to produce pattern 123456 -> 781234 -> 567812 -> ...
    const windows = computed(() => {
        const list = rawItems.value.slice();
        const W = perSlide.value;
        const L = list.length;
        if (L === 0) return [] as Item[][];
        if (W >= L) return [list];
        const result: Item[][] = [];
        let start = 0;
        const seen = new Set<number>();
        while (!seen.has(start)) {
            seen.add(start);
            const win: Item[] = [];
            for (let i = 0; i < W; i++) {
                const it = list[(start + i) % L];
                if (it) win.push(it);
            }
            result.push(win);
            start = (start + W) % L; // jump by window size to match requested pattern
        }
        return result;
    });
    const loopEnabled = computed(() => windows.value.length > 1);

    const autoplayOptions = computed(() =>
        autoplayEnabled.value
            ? {
                  delay: autoplayDelay.value,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false
              }
            : false
    );

    // Breakpoints not needed for grouped-window mode (each window is one slide)

    function onInit(sw: any) {
        swiperInstance.value = sw;
    }
    function onSlideChange() {
        /* could emit event */
    }

    function pauseAutoplay() {
        if (swiperInstance.value?.autoplay && autoplayEnabled.value)
            swiperInstance.value.autoplay.stop();
    }
    function resumeAutoplay() {
        if (swiperInstance.value?.autoplay && autoplayEnabled.value)
            swiperInstance.value.autoplay.start();
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
        modules.value = [Navigation, Autoplay];
        // styles
        // @ts-expect-error - css import has no type declarations
        await import('swiper/css');
        ready.value = true;
    });
</script>

<style scoped>
    /* Minimal styles for window layout */
    .nf-window {
        width: 100%;
        background-color: red;
        display: flex;
        gap: 8px;
        justify-content: center;
    }
    .nf-card {
        flex: 0 0 auto;
        width: 180px;
        aspect-ratio: 16/9;
        overflow: hidden;
        border-radius: 6px;
        background: #111;
    }
    .nf-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    .nf-empty {
        padding: 32px 0;
        text-align: center;
        color: #888;
    }
</style>
