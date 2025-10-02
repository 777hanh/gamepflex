<template>
  <section class="section-padding games-carousel-section bg-dark-alt">
    <div class="container position-relative">
      <div class="section-header text-center mb-5">
        <h2 class="display-6 fw-bold text-white mb-3">
          Gaming To The Next Level
        </h2>
        <p class="text-muted">Trải nghiệm nhanh các tựa game nổi bật</p>
      </div>
      <ClientOnly>
        <Swiper
          :modules="swiperModules"
          class="games-swiper"
          :space-between="24"
          :slides-per-view="1.1"
          :breakpoints="{
            576: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.3 },
            992: { slidesPerView: 3.2 },
            1200: { slidesPerView: 4 },
          }"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :speed="600"
          :loop="true"
          navigation
        >
          <SwiperSlide v-for="(g, i) in games" :key="g.id">
            <div
              class="carousel-item magnetic-depth magnetic h-100"
              data-aos="fade-up"
              data-aos-duration="700"
              :data-aos-delay="(i * 60) % 480"
              data-depth-ease="0.14"
            >
              <div
                class="magnetic-inner item-inner p-3 h-100 d-flex flex-column"
              >
                <NuxtImg
                  :src="g.image"
                  :alt="g.name"
                  width="420"
                  height="236"
                  class="w-100 rounded mb-3 game-img"
                />
                <h6 class="text-white mb-1">{{ g.name }}</h6>
                <small class="text-muted mb-2">{{ g.description }}</small>
                <div
                  class="mt-auto d-flex justify-content-between align-items-center small"
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
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
// @ts-expect-error swiper css types not required
import "swiper/css";
// @ts-expect-error swiper css types not required
import "swiper/css/navigation";
export interface GameItem {
  id: number;
  name: string;
  description: string;
  image: string;
  players: string;
}
defineProps<{ games: GameItem[] }>();
const swiperModules = [Autoplay, Navigation];
</script>

<style scoped>
.games-swiper {
  padding: 10px 6px 40px;
}
.carousel-item {
  background: #141b24;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  position: relative;
  height: 100%;
}
.carousel-item .game-img {
  object-fit: cover;
  border-radius: 14px;
  height: 180px;
}
.carousel-item:hover {
  box-shadow: 0 10px 30px -8px rgba(0, 0, 0, 0.55),
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
