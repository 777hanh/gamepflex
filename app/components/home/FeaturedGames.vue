<template>
  <section id="featured-games" class="featured-games-section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title" data-aos="fade-right">Featured Games</h2>
        <div class="nav-buttons" data-aos="fade-left" data-aos-delay="120">
          <button class="fg-nav-btn prev magnetic" @click="swiper?.slidePrev()">
            <i class="i-tabler-chevron-left" />
          </button>
          <button class="fg-nav-btn next magnetic" @click="swiper?.slideNext()">
            <i class="i-tabler-chevron-right" />
          </button>
        </div>
      </div>

      <div
        class="featured-games-wrapper"
        data-aos="fade-up"
        data-aos-delay="60"
      >
        <component
          v-if="ready && SwiperComponent && internalGames.length > 0"
          :is="SwiperComponent"
          :modules="modules"
          :loop="internalGames.length > 1"
          :speed="520"
          :centered-slides="true"
          :slides-per-view="slidesPerView"
          :space-between="spaceBetween"
          :breakpoints="breakpoints"
          :grab-cursor="true"
          :autoplay="autoplayCfg"
          :virtual="undefined"
          @swiper="onSwiper"
          @slide-change="onSlideChange"
          @progress="onProgress"
          class="fg-swiper simple-center"
        >
          <component
            v-for="(g, i) in internalGames"
            :is="SwiperSlideComponent"
            :key="'fg-' + (g.id || i)"
            class="fg-slide"
            :class="{ 'is-active': i === realActiveIndex }"
          >
            <div
              class="featured-game-card magnetic-depth"
              data-depth-rot="16"
              data-depth-trans="14"
              data-magnetic-strength="1.05"
            >
              <div class="fg-card-inner magnetic-inner">
                <div class="fg-media">
                  <NuxtImg
                    :src="g.image"
                    :alt="g.name"
                    format="webp"
                    width="560"
                    height="340"
                    loading="lazy"
                    class="fg-img"
                  />
                  <div class="fg-date-badge">
                    <i class="i-tabler-calendar-time me-1" />{{
                      g.date || "15.02.2022"
                    }}
                  </div>
                  <div class="fg-status-pill">
                    <span class="dot"></span>{{ g.status || "Playing" }}
                  </div>
                </div>
                <h3 class="fg-title" :title="g.name">{{ g.name }}</h3>
                <div class="fg-meta">
                  <div class="fg-meta-group">
                    <span class="coin bitcoin"
                      ><i class="i-tabler-currency-bitcoin" />{{
                        g.coinA || 75
                      }}</span
                    >
                    <span class="sep" />
                    <span class="coin token"
                      ><i class="i-tabler-coin" />{{ g.coinB || 54 }}</span
                    >
                  </div>
                  <div class="fg-price">{{ g.price || "$49.97" }}</div>
                </div>
              </div>
            </div>
          </component>
        </component>
        <div v-else class="fg-loading">
          <template v-if="!ready">
            <span class="spinner" /> Đang tải slider...
          </template>
          <div v-else class="fg-skeleton-wrap">
            <div v-for="n in 3" :key="'skel-' + n" class="fg-skel shimmer" />
            <p class="small text-muted mt-4 mb-0">Chưa có dữ liệu hiển thị</p>
          </div>
        </div>
      </div>

      <div class="fg-pagination-dots" aria-hidden="true">
        <span
          v-for="(g, i) in internalGames"
          :key="'dot-' + (g.id || i)"
          class="dot"
          :class="{ active: i === realActiveIndex }"
          @click="goTo(i)"
        />
      </div>
      <div class="fg-autoplay-progress" v-if="ready">
        <div
          class="bar"
          :style="{ '--p': (progress * 100).toFixed(2) + '%' }"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef, watch, nextTick } from "vue";
// Lazy load Swiper only on client to create a separate chunk
const SwiperComponent = shallowRef<any>(null);
const SwiperSlideComponent = shallowRef<any>(null);
const modules = ref<any[]>([]);
const ready = ref(false);

export interface FeaturedGame {
  id: number | string;
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
  /** Enable internal auto load trigger when nearing the end */
  autoLoad?: boolean;
  /** How many items from the end before triggering load (default 4) */
  bufferThreshold?: number;
  /** Extra lead (in items) for forward (next) direction so data có sẵn trước khi chạm cuối (default 2) */
  forwardLead?: number;
  /** Debounce time between load triggers (ms, default 450) */
  debounceMs?: number;
  /** Optional async loader returning new games; if absent an event will be emitted */
  loader?: () => Promise<FeaturedGame[]>;
  /** Số slide nhìn trước (look ahead) khi đi tới để tính remaining sớm hơn (default 1) */
  lookAhead?: number;
}>();
const emit = defineEmits<{ (e: "load-more"): void }>();

// Internal mutable list to allow fast append / prepend without forcing full re-render of parent
const internalGames = ref<FeaturedGame[]>(
  Array.isArray(props.games) ? [...props.games] : []
);
let prevLen = internalGames.value.length;
const loadingMore = ref(false);
let lastLoadTs = 0;
watch(
  () => props.games,
  (val) => {
    if (!Array.isArray(val)) return;
    const wasEmpty = internalGames.value.length === 0;
    internalGames.value = [...val];
    // If new items arrived, clear loading flag
    if (internalGames.value.length > prevLen) {
      loadingMore.value = false;
    }
    prevLen = internalGames.value.length;
    nextTick(() => {
      if (swiper.value) {
        swiper.value.update?.();
        if (wasEmpty && internalGames.value.length)
          swiper.value.slideToLoop(0, 0);
      }
      // After updates, re-check buffer in case we are still close to the tail
      checkBuffer();
    });
  }
);

const swiper = ref<any>(null);
const realActiveIndex = ref(0);
const autoplayCfg = {
  delay: 3000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
};
// Simple layout (no coverflow) => using scale/opacity via CSS on active/prev/next
const slidesPerView = "auto";
const spaceBetween = 34;
const progress = ref(0); // autoplay ratio 0..1
const hashSync = true; // enable route hash sync
const lastProgressCheck = ref(0);

const breakpoints = {
  520: { slidesPerView: 1.4, spaceBetween: 28 },
  680: { slidesPerView: 1.9, spaceBetween: 30 },
  900: { slidesPerView: 2.6, spaceBetween: 34 },
  1180: { slidesPerView: 3.2, spaceBetween: 38 },
  1480: { slidesPerView: 3.6, spaceBetween: 42 },
};

function onSwiper(sw: any) {
  swiper.value = sw;
  updateCenter(sw);
}
function onSlideChange(sw: any) {
  updateCenter(sw);
  progress.value = 0; // reset progress bar
  if (hashSync) updateHash();
  prefetchNext();
  checkBuffer(sw?.swipeDirection || undefined);
}
function updateCenter(sw: any) {
  const len = internalGames.value.length || 1;
  realActiveIndex.value = sw.realIndex % len;
}
function updateHash() {
  if (typeof window === "undefined") return;
  const id = internalGames.value[realActiveIndex.value]?.id;
  if (!id) return;
  const newHash = `game-${id}`;
  if (window.location.hash !== "#" + newHash) {
    history.replaceState(null, "", `#${newHash}`);
  }
}
function prefetchNext() {
  if (!import.meta.client) return;
  const len = internalGames.value.length;
  if (!len) return;
  const nextIndex = (realActiveIndex.value + 1) % len;
  const next = internalGames.value[nextIndex];
  if (!next?.image) return;
  const linkId = "prefetch-game-" + next.id;
  if (document.getElementById(linkId)) return;
  const l = document.createElement("link");
  l.id = linkId;
  l.rel = "prefetch";
  l.as = "image";
  l.href = next.image;
  document.head.appendChild(l);
}
function goTo(i: number) {
  if (swiper.value) {
    swiper.value.slideToLoop(i);
  }
}

// Liên tục kiểm tra trong lúc người dùng đang kéo (vuốt sang trái để đi NEXT)
function onProgress(sw: any) {
  if (!props.autoLoad) return;
  const now = performance.now();
  // throttle để tránh spam
  if (now - lastProgressCheck.value < 120) return;
  lastProgressCheck.value = now;
  try {
    // Khi diff < 0 (LTR) nghĩa là user kéo sang trái => đi tới slide tiếp theo
    const movingNext =
      sw?.touches && typeof sw.touches.diff === "number" && sw.touches.diff < 0;
    if (movingNext) {
      checkBuffer("next");
    }
  } catch {
    // silent: defensive
  }
}

function triggerLoadMore() {
  if (loadingMore.value) return;
  loadingMore.value = true;
  lastLoadTs = performance.now();
  if (typeof props.loader === "function") {
    // Use provided async loader
    Promise.resolve(props.loader())
      .then((res) => {
        if (Array.isArray(res) && res.length) {
          appendGames(res);
        } else {
          // Nothing returned => mark as not loading so future retry can occur
          loadingMore.value = false;
        }
      })
      .catch(() => {
        loadingMore.value = false;
      });
  } else {
    // Fallback: emit event for parent to handle
    emit("load-more");
  }
}

interface BufferOptions {
  predictive?: boolean;
}
function checkBuffer(direction?: string, opts: BufferOptions = {}) {
  if (!props.autoLoad) return;
  const base = props.bufferThreshold ?? 4;
  const forwardLead = props.forwardLead ?? 2;
  const lookAhead = props.lookAhead ?? 1;
  const total = internalGames.value.length;
  if (!total) return;
  const usePredict = opts.predictive || direction === "next";
  const logicalPosition = usePredict
    ? realActiveIndex.value + 1 + lookAhead
    : realActiveIndex.value + 1;
  const remaining = total - logicalPosition;
  const effectiveThreshold = usePredict ? base + forwardLead : base;
  if (remaining <= effectiveThreshold) {
    const now = performance.now();
    const debounce = props.debounceMs ?? 450;
    if (now - lastLoadTs >= debounce) {
      triggerLoadMore();
    }
  }
}

onMounted(async () => {
  if (!import.meta.client) return;
  const [{ Swiper: SwiperCmp, SwiperSlide: SlideCmp }, swiperMod] =
    await Promise.all([import("swiper/vue"), import("swiper/modules")]);
  SwiperComponent.value = SwiperCmp;
  SwiperSlideComponent.value = SlideCmp;
  const { Navigation, Autoplay } = swiperMod as any;
  modules.value = [Navigation, Autoplay];
  // @ts-expect-error css side effect
  await import("swiper/css");
  // @ts-expect-error css side effect
  await import("swiper/css/effect-coverflow");
  ready.value = true;
  // initial hash parse
  if (hashSync && location.hash.startsWith("#game-")) {
    const targetId = location.hash.replace("#game-", "");
    const idx = props.games.findIndex((g) => String(g.id) === targetId);
    if (idx >= 0) {
      // delay until swiper instance ready
      requestAnimationFrame(() => {
        if (swiper.value) swiper.value.slideToLoop(idx, 0);
      });
    }
  }
  prefetchNext();
  // autoplay progress tracking
  const step = () => {
    if (swiper.value?.autoplay?.running) {
      const delay = autoplayCfg.delay;
      const time = swiper.value.autoplay.timeLeft
        ? delay - swiper.value.autoplay.timeLeft
        : 0;
      progress.value = Math.min(1, Math.max(0, time / delay));
    }
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  // Initial buffer check
  checkBuffer("next");
  // Prefill ngay nếu lúc vào đã thiếu buffer (chạy vài vòng tối đa 2 lần để tránh spam)
  if (props.autoLoad) {
    let attempts = 0;
    const prefill = () => {
      attempts++;
      checkBuffer("next", { predictive: true });
      if (attempts < 2 && !loadingMore.value) {
        const base = props.bufferThreshold ?? 4;
        const forwardLead = props.forwardLead ?? 2;
        const lookAhead = props.lookAhead ?? 1;
        const total = internalGames.value.length;
        const targetRemaining = base + forwardLead;
        const logicalPos = realActiveIndex.value + 1 + lookAhead;
        const remaining = total - logicalPos;
        if (remaining <= targetRemaining) {
          // Try again after micro delay if still low
          setTimeout(prefill, 120);
        }
      }
    };
    prefill();
    // Continuous predictive loop trong lúc kéo để không cần thả mới nạp
    const predictiveLoop = () => {
      if (swiper.value && !loadingMore.value) {
        checkBuffer("next", { predictive: true });
      }
      requestAnimationFrame(predictiveLoop);
    };
    requestAnimationFrame(predictiveLoop);
  }
});

// Virtual slides config (enable only if many slides for perf)
// removed virtual complexity for stability until slides > threshold and verified

// Exposed API for parent components to stream data efficiently
function rebuildLoop(preserveIndex = true) {
  if (!swiper.value || !swiper.value.params.loop) return;
  const current = realActiveIndex.value;
  try {
    swiper.value.loopDestroy();
    swiper.value.updateSlides();
    swiper.value.loopCreate();
    swiper.value.updateSlidesClasses();
    if (preserveIndex) swiper.value.slideToLoop(current, 0, false);
  } catch {
    /* silent */
  }
}
function appendGames(list: FeaturedGame[]) {
  if (!Array.isArray(list) || !list.length) return;
  internalGames.value.push(...list);
  nextTick(() => {
    swiper.value?.update?.();
    rebuildLoop();
    checkBuffer();
  });
}
function prependGames(list: FeaturedGame[]) {
  if (!Array.isArray(list) || !list.length) return;
  internalGames.value.unshift(...list);
  nextTick(() => {
    swiper.value?.update?.();
    rebuildLoop();
    const added = list.length;
    if (swiper.value) swiper.value.slideTo(swiper.value.activeIndex + added, 0);
    checkBuffer();
  });
}
defineExpose({ appendGames, prependGames });
</script>

<style scoped>
.featured-games-section {
  position: relative;
  padding: 80px 0 60px;
}
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}
.section-title {
  font-size: clamp(1.3rem, 2.1vw, 2.2rem);
  font-weight: 700;
  letter-spacing: 0.5px;
  background: linear-gradient(92deg, #fff, #7ee7ff 45%, #19b4ff 70%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0;
}
.nav-buttons {
  display: flex;
  gap: 14px;
}
.fg-nav-btn {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.35s, border-color 0.35s, transform 0.35s;
}
.fg-nav-btn:hover {
  background: linear-gradient(140deg, #ff8c2b, #ff5d00);
  border-color: #ff8c2b;
  transform: translateY(-3px);
}
.featured-games-wrapper {
  position: relative;
  /* revert to block so Swiper's centeredSlides math stays correct */
}
.fg-swiper {
  padding: 14px 6px 66px;
  overflow: visible;
  margin: 0 auto;
  width: auto;
  max-width: 1600px; /* prevent over-expansion on ultrawide */
}
/* simplified center style */
.fg-swiper.simple-center :deep(.swiper-slide) {
  transition: transform 0.55s cubic-bezier(0.22, 0.8, 0.3, 1), opacity 0.55s;
  opacity: 0.28;
  transform: scale(0.72) translateY(12px);
}
.fg-swiper.simple-center :deep(.swiper-slide.swiper-slide-prev),
.fg-swiper.simple-center :deep(.swiper-slide.swiper-slide-next) {
  opacity: 0.55;
  transform: scale(0.82) translateY(6px);
}
.fg-swiper.simple-center :deep(.swiper-slide.swiper-slide-active) {
  opacity: 1;
  transform: scale(1) translateY(0);
  z-index: 2;
}
.fg-swiper.simple-center :deep(.swiper-wrapper) {
  align-items: stretch;
}
/* Ensure the active slide visually sits in the middle even after dynamic appends */
.fg-swiper :deep(.swiper-wrapper) {
  justify-content: center; /* helps when slide widths < container */
}
.fg-slide {
  width: clamp(260px, 40vw, 400px);
  max-width: 80vw;
  transition: filter 0.6s, box-shadow 0.6s;
  filter: saturate(0.7) brightness(0.92);
}
.fg-slide.is-active {
  filter: saturate(1) brightness(1.05);
}
.featured-game-card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 34px;
  background: linear-gradient(170deg, #181b20, #121417);
  padding: 14px 14px 18px;
  box-shadow: 0 10px 28px -8px rgba(0, 0, 0, 0.55);
  transition: background 0.4s, box-shadow 0.4s;
  isolation: isolate;
}
.featured-game-card::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2px;
  border-radius: inherit;
  background: linear-gradient(130deg, #ff7d2f, #ff4800 35%, #ffce54 70%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}
.fg-slide.is-active .featured-game-card::before {
  opacity: 1;
}
.fg-card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.fg-media {
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  aspect-ratio: 16/10;
  background: #0d0f12;
}
.fg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s ease, filter 1s ease;
  transform: scale(1.04);
}
.fg-slide.is-active .fg-img {
  transform: scale(1.08);
}
.fg-date-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.72rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  padding: 6px 10px 5px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  backdrop-filter: blur(6px);
  letter-spacing: 0.2px;
}
.fg-status-pill {
  position: absolute;
  left: 14px;
  bottom: 14px;
  font-size: 0.8rem;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.55);
  padding: 8px 22px 7px;
  border-radius: 32px;
  color: #fff;
  border: 2px solid #5bff3d;
  display: inline-flex;
  gap: 6px;
  align-items: center;
  backdrop-filter: blur(6px);
}
.fg-status-pill .dot {
  width: 8px;
  height: 8px;
  background: #5bff3d;
  border-radius: 50%;
  box-shadow: 0 0 8px #5bff3d;
}
.fg-title {
  font-size: clamp(1rem, 0.95rem + 0.3vw, 1.18rem);
  font-weight: 700;
  line-height: 1.25;
  color: #fff;
  margin: 18px 4px 12px;
  min-height: 2.2em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.fg-meta {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 6px 0;
  font-size: 0.78rem;
  font-weight: 500;
  color: #d4dae3;
}
.fg-meta-group {
  display: flex;
  align-items: center;
  gap: 10px;
}
.coin {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px 4px 6px;
  border-radius: 28px;
  background: #1d2127;
  color: #fff;
  line-height: 1;
  font-weight: 600;
  font-size: 0.7rem;
}
.coin i {
  font-size: 0.9rem;
}
.coin.bitcoin {
  background: linear-gradient(140deg, #242017, #38240e);
  border: 1px solid #ff9b38;
  color: #ffba63;
}
.coin.token {
  background: linear-gradient(140deg, #12262a, #10313a);
  border: 1px solid #20cfff;
  color: #76e6ff;
}
.sep {
  width: 1px;
  height: 18px;
  background: linear-gradient(
    to bottom,
    transparent,
    #3a424d 40%,
    #3a424d 60%,
    transparent
  );
}
.fg-price {
  padding: 5px 12px 5px;
  background: #1c2026;
  border-radius: 22px;
  font-size: 0.7rem;
  letter-spacing: 0.5px;
  color: #fff;
  font-weight: 600;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}
.fg-slide:not(.is-active) .featured-game-card {
  background: linear-gradient(180deg, #14171b, #101214);
  box-shadow: 0 6px 16px -6px rgba(0, 0, 0, 0.55);
}
.fg-pagination-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: -8px;
  position: relative;
  z-index: 2;
}
.fg-pagination-dots .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(130deg, #2a2f35, #171b20);
  position: relative;
  transition: background 0.4s, transform 0.4s;
  cursor: pointer;
}
.fg-pagination-dots .dot.active {
  background: linear-gradient(120deg, #ff7f30, #ff4500);
  transform: scale(1.35);
  box-shadow: 0 0 0 4px rgba(255, 126, 48, 0.2);
}
.fg-autoplay-progress {
  position: relative;
  height: 6px;
  margin: 24px auto 0;
  width: clamp(220px, 40%, 380px);
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
}
.fg-autoplay-progress .bar {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #ff7d2f, #ff4800);
  width: var(--p);
  transition: width 0.18s linear;
}
.fg-loading {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 80px 0;
  justify-content: center;
  font-size: 0.9rem;
  color: #9aa4b1;
}
.spinner {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.18);
  border-top-color: #ff7d2f;
  animation: spin 0.85s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@media (max-width: 640px) {
  .fg-nav-btn {
    width: 46px;
    height: 46px;
  }
  .featured-game-card {
    border-radius: 28px;
    padding: 12px 12px 16px;
  }
  .fg-media {
    border-radius: 22px;
  }
}
</style>
