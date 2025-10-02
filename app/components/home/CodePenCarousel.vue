<template>
  <section class="cp-carousel">
    <div class="cp-header">
      <h2 class="cp-title">CodePen Style Carousel (Cards)</h2>
      <div class="cp-nav">
        <button
          class="cp-btn previous"
          @click="movePrev"
          :disabled="moving"
          aria-label="Previous"
        >
          <i class="i-tabler-chevron-left" />
        </button>
        <button
          class="cp-btn next"
          @click="moveNext"
          :disabled="moving"
          aria-label="Next"
        >
          <i class="i-tabler-chevron-right" />
        </button>
      </div>
    </div>

    <div class="cp-viewport">
      <div ref="carousel" class="carousel" :style="carouselInlineStyle">
        <div v-for="(slide, sIdx) in slides" :key="slide.id" class="slide">
          <div
            v-for="(item, i) in slide.items"
            :key="item.id || sIdx + '-' + i"
            class="card"
          >
            <div class="thumb-wrap">
              <img :src="item.image" :alt="item.title" draggable="false" />
              <div class="caption">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Edge hotspots (optional) -->
      <button class="edge edge-left" @click="movePrev" aria-label="Previous" />
      <button class="edge edge-right" @click="moveNext" aria-label="Next" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";

/**
 * Simplified 1:1 logic port of the referenced CodePen (ExavELa) but using cards instead of <video>.
 * Differences from the more advanced NetflixCarousel:
 * - Uses left positioning + CSS transition instead of transform translate + grid auto-flow.
 * - Reorders DOM (prepend/append) directly BEFORE or AFTER animation just like original.
 * - Minimal reactive state: only "moving" lock + slides array.
 * - Easier to understand / closer to tutorial code.
 */

interface Item {
  id?: string | number;
  title: string;
  image: string;
}

const props = defineProps<{
  items?: Item[];
  perSlide?: number;
  growFactor?: number;
}>();

const perSlide = computed(() => props.perSlide ?? 6);
const growFactor = computed(() => props.growFactor ?? 1.8);

// Demo fallback data
const demoItems: Item[] = Array.from({ length: 12 }).map((_, i) => ({
  id: "demo-" + i,
  title: "Item " + (i + 1),
  image: `https://placehold.co/341x192/png?text=${encodeURIComponent(
    "Item " + (i + 1)
  )}`,
}));

const source = computed(() => (props.items?.length ? props.items : demoItems));

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

interface Slide {
  id: string;
  items: Item[];
}
const slides = ref<Slide[]>([]);

function rebuild() {
  const base = chunk(source.value, perSlide.value);
  if (base.length < 2) {
    // Duplicate until we have at least 2 slides so loop looks infinite
    while (base.length < 2) base.push([...base[0]]);
  }
  slides.value = base.map((items, i) => ({
    id: "sl-" + i + "-" + items.length,
    items,
  }));
}

watch([source, perSlide], rebuild, { immediate: true });

const carousel = ref<HTMLElement | null>(null);
const moving = ref(false);
// We always animate a fixed percentage just like codepen (94%)
const SLIDE_WIDTH_PERCENT = 94;
const carouselInlineStyle = computed(() => ({
  "--slide-width": SLIDE_WIDTH_PERCENT + "%",
}));

function moveNext() {
  // CodePen version moves first slide left (-94%), after transition completes -> append first
  if (moving.value || !carousel.value) return;
  const el = carousel.value;
  moving.value = true;
  // Animate to left
  requestAnimationFrame(() => {
    el.style.transition = "all 1s";
    el.style.left = "-" + SLIDE_WIDTH_PERCENT + "%";
    const done = () => {
      el.removeEventListener("transitionend", done);
      // Reset transition, move first -> end, reset left
      el.style.transition = "none";
      el.appendChild(el.firstElementChild!);
      el.style.left = "0";
      // Force reflow to flush styles
      void el.offsetWidth;
      moving.value = false;
    };
    el.addEventListener("transitionend", done);
  });
}

function movePrev() {
  // CodePen version (for moving right) prepends last slide, sets left -94%, then animates back to 0.
  if (moving.value || !carousel.value) return;
  const el = carousel.value;
  moving.value = true;
  // Put last slide to front without animation
  el.style.transition = "none";
  el.prepend(el.lastElementChild!);
  el.style.left = "-" + SLIDE_WIDTH_PERCENT + "%";
  // Next frame animate back to 0
  requestAnimationFrame(() => {
    el.style.transition = "all 1s";
    el.style.left = "0";
    const done = () => {
      el.removeEventListener("transitionend", done);
      el.style.transition = "none";
      moving.value = false;
    };
    el.addEventListener("transitionend", done);
  });
}

// Hover effect scaling — pure CSS via data attribute index
// We'll add mouseenter to set attribute on carousel root (if needed for future)
function handleKey(e: KeyboardEvent) {
  if (e.key === "ArrowRight") {
    e.preventDefault();
    moveNext();
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    movePrev();
  }
}

nextTick(() => {
  window.addEventListener("keydown", handleKey);
});
</script>

<style scoped>
.cp-carousel {
  position: relative;
  padding: 30px 0;
}
.cp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.cp-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
}
.cp-nav {
  display: flex;
  gap: 10px;
}
.cp-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.35s;
}
.cp-btn:hover:not(:disabled) {
  background: linear-gradient(130deg, #ff962f, #ff5d00);
  border-color: #ff962f;
}
.cp-btn:disabled {
  opacity: 0.4;
  cursor: default;
}

.cp-viewport {
  position: relative;
  overflow: hidden;
  width: 100%;
}
.carousel {
  position: relative;
  display: flex;
  left: 0;
  width: 100%;
}
.slide {
  flex: 0 0 var(--slide-width, 94%);
  display: flex;
  gap: 8px;
  padding: 4px;
  transition: transform 0.7s;
}

/* Hover shift of neighbor slides (like original) */
.carousel:hover .slide {
  transform: translate3d(-148px, 0, 0);
}
.slide:hover ~ .slide {
  transform: translate3d(148px, 0, 0);
}

.card {
  position: relative;
  width: 260px;
  height: 148px;
  flex: 0 0 auto;
  cursor: pointer;
  transition: transform 0.7s;
  transform-origin: left center;
}
.card .thumb-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: #10151b;
  border-radius: 10px;
  overflow: hidden;
}
.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.card .caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 0.65rem;
  padding: 4px 6px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent);
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.3px;
}

/* Scale + push siblings */
.slide .card:hover {
  transform: scale(var(--grow, 1.8));
  z-index: 10;
}
.slide .card:hover ~ .card {
  transform: translate3d(calc((var(--grow, 1.8) - 1) * 130px), 0, 0);
}
:root,
.cp-carousel {
  --grow: 1.8;
}

/* Edge hotspots */
.edge {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 7%;
  border: none;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.35), transparent);
  cursor: pointer;
  opacity: 0;
  transition: 0.4s;
}
.edge-right {
  right: 0;
  left: auto;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.35), transparent);
}
.cp-viewport:hover .edge {
  opacity: 1;
}

@media (max-width: 1100px) {
  .carousel:hover .slide {
    transform: translate3d(-120px, 0, 0);
  }
  .slide:hover ~ .slide {
    transform: translate3d(120px, 0, 0);
  }
}
@media (max-width: 760px) {
  .carousel:hover .slide,
  .slide:hover ~ .slide {
    transform: none;
  }
  .slide .card:hover {
    transform: scale(1.25);
  }
  .slide .card:hover ~ .card {
    transform: none;
  }
  .edge {
    display: none;
  }
}
</style>
