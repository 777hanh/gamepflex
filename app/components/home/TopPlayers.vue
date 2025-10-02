<template>
  <section
    class="section-padding bg-dark players-section position-relative overflow-hidden"
  >
    <div class="players-bg-art" aria-hidden="true"></div>
    <div class="container position-relative">
      <div class="section-header text-center mb-5">
        <h2 class="display-5 fw-bold text-white mb-3">Top Players</h2>
        <p class="text-muted lead">
          Những tuyển thủ xuất sắc đang thống trị bảng xếp hạng
        </p>
      </div>
      <ClientOnly>
        <Swiper
          :modules="swiperModules"
          class="players-swiper"
          :space-between="24"
          :slides-per-view="1.15"
          :breakpoints="breakpoints"
          :speed="560"
          :autoplay="{ delay: 2600, disableOnInteraction: false }"
          :loop="true"
          navigation
          free-mode
        >
          <SwiperSlide v-for="(p, i) in players" :key="p.id">
            <div
              class="player-card animated-border magnetic-depth magnetic h-100"
              data-aos="zoom-in"
              data-aos-duration="650"
              :data-aos-delay="(i * 70) % 500"
              data-depth-rot="20"
              data-depth-trans="18"
              data-depth-scale="0.045"
            >
              <div
                class="magnetic-inner player-inner p-4 h-100 d-flex flex-column"
              >
                <div class="d-flex align-items-center gap-3 mb-3">
                  <div class="rank-badge" :class="rankClass(i)">
                    #{{ i + 1 }}
                  </div>
                  <NuxtImg
                    :src="p.avatar"
                    :alt="p.name"
                    width="72"
                    height="72"
                    class="rounded-circle flex-shrink-0 player-avatar"
                  />
                  <div>
                    <h5 class="mb-1 text-white">{{ p.name }}</h5>
                    <small class="text-muted">{{ p.country }}</small>
                  </div>
                </div>
                <div class="row g-2 text-center mb-3">
                  <div class="col-4">
                    <h6 class="mb-0 text-accent">{{ p.wins }}</h6>
                    <small class="text-muted">Wins</small>
                  </div>
                  <div class="col-4">
                    <h6 class="mb-0 text-success">{{ p.kda }}</h6>
                    <small class="text-muted">KDA</small>
                  </div>
                  <div class="col-4">
                    <h6 class="mb-0 text-warning">{{ p.earnings }}</h6>
                    <small class="text-muted">Earnings</small>
                  </div>
                </div>
                <div class="mt-auto">
                  <NuxtLink
                    :to="`/profile?player=${p.id}`"
                    class="btn btn-outline-light w-100 btn-sm magnetic d-flex align-items-center justify-content-center gap-2"
                  >
                    <i class="fas fa-user" /> View Profile
                  </NuxtLink>
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
import { Navigation, Autoplay, FreeMode } from "swiper/modules";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// @ts-expect-error swiper css types not required
import "swiper/css";
// @ts-expect-error swiper css types not required
import "swiper/css/navigation";
export interface PlayerItem {
  id: number;
  name: string;
  country: string;
  avatar: string;
  wins: number;
  kda: string;
  earnings: string;
}
defineProps<{ players: PlayerItem[] }>();
const swiperModules = [Navigation, Autoplay, FreeMode];
const breakpoints = {
  576: { slidesPerView: 1.6 },
  768: { slidesPerView: 2.4 },
  992: { slidesPerView: 3.2 },
  1200: { slidesPerView: 4 },
};
function rankClass(i: number) {
  if (i === 0) return "rank-1";
  if (i === 1) return "rank-2";
  if (i === 2) return "rank-3";
  return "";
}

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
  // Background shrinking image effect
  requestAnimationFrame(() => {
    const el = document.querySelector(".players-bg-art") as HTMLElement | null;
    const section = document.getElementById("top-players");
    if (!el || !section) return;
    // Set initial style
    el.style.opacity = "0.9";
    gsap.fromTo(
      el,
      {
        scale: 1.15,
        xPercent: 0,
        yPercent: -10,
        rotate: 0,
        filter: "blur(0px)",
      },
      {
        scale: 0,
        xPercent: -40,
        yPercent: -10,
        rotate: -8,
        filter: "blur(2px)",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "center 40%",
          scrub: true,
        },
      }
    );
  });
}
</script>

<style scoped>
.players-swiper {
  padding: 10px 8px 36px;
}
.players-bg-art {
  position: absolute;
  top: 0;
  left: 50%;
  width: 900px;
  height: 900px;
  transform: translateX(-50%);
  background: radial-gradient(
    circle at 50% 50%,
    rgba(46, 203, 255, 0.35) 0%,
    rgba(0, 0, 0, 0) 70%
  );
  pointer-events: none;
  z-index: 0;
  will-change: transform, filter;
}
.player-card {
  border-radius: 20px;
  position: relative;
  background: #12171f;
  height: 100%;
}
.player-avatar {
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.15);
}
.rank-badge {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  color: #fff;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px -2px rgba(0, 150, 255, 0.4);
}
.rank-1 {
  background: linear-gradient(135deg, #ffd700, #ff9900);
}
.rank-2 {
  background: linear-gradient(135deg, #c0c0c0, #888);
}
.rank-3 {
  background: linear-gradient(135deg, #cd7f32, #a05a18);
}
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
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
  left: -10px;
}
.nav-btn.next {
  right: -10px;
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
