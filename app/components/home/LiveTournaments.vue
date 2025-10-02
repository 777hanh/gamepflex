<template>
  <section
    class="section-padding position-relative overflow-hidden"
    data-aos="fade-up"
    data-aos-duration="800"
    id="tournaments"
  >
    <div class="tournaments-bg-art" aria-hidden="true" />
    <div class="container">
      <div class="section-header text-center mb-5">
        <h2 class="display-5 fw-bold text-white mb-3">Live Tournaments</h2>
        <p class="text-muted lead">
          Gia nhập ngay – tranh tài vì vinh quang & phần thưởng
        </p>
      </div>
      <div class="row g-4">
        <div v-for="t in tournaments" :key="t.id" class="col-lg-6">
          <div
            class="tournament-card h-100 p-4 magnetic-depth magnetic"
            data-aos="fade-up"
            data-aos-duration="700"
            :data-aos-delay="(t.id * 70) % 500"
            data-depth-rot="16"
            data-depth-trans="12"
          >
            <div class="d-flex align-items-center mb-4 gap-3">
              <NuxtImg
                :src="t.gameIcon"
                :alt="t.game"
                class="rounded shadow-sm"
                width="64"
                height="64"
                format="webp"
                densities="x1 x2"
              />
              <div>
                <h4 class="mb-1 text-white">{{ t.name }}</h4>
                <span class="text-muted small">{{ t.game }}</span>
              </div>
              <span class="ms-auto badge bg-danger px-3 py-2">LIVE</span>
            </div>
            <div class="row text-center mb-4">
              <div class="col-6">
                <span class="text-muted d-block small mb-1">Prize Pool</span>
                <h5 class="text-warning mb-0">${{ t.prizePool }}</h5>
              </div>
              <div class="col-6">
                <span class="text-muted d-block small mb-1">Players</span>
                <h5 class="text-info mb-0">
                  {{ t.players }}/{{ t.maxPlayers }}
                </h5>
              </div>
            </div>
            <div class="mb-4">
              <div class="d-flex justify-content-between mb-2 small">
                <span class="text-muted">Registration</span>
                <span class="text-white fw-semibold"
                  >{{ Math.round((t.players / t.maxPlayers) * 100) }}%</span
                >
              </div>
              <div class="progress progress-thin">
                <div
                  class="progress-bar bg-accent"
                  :style="{ width: (t.players / t.maxPlayers) * 100 + '%' }"
                />
              </div>
            </div>
            <NuxtLink
              :to="`/tournaments/${t.id}`"
              class="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 magnetic"
            >
              <i class="fas fa-trophy" />
              Tham gia ngay
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
export interface LiveTournament {
  id: number;
  name: string;
  game: string;
  gameIcon: string;
  prizePool: string;
  players: number;
  maxPlayers: number;
}
// use underscore to avoid unused var lint error if not referenced directly
const _props = defineProps<{ tournaments: LiveTournament[] }>();
if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
  requestAnimationFrame(() => {
    const art = document.querySelector(".tournaments-bg-art");
    const section = document.getElementById("tournaments");
    if (!art || !section) return;
    gsap.fromTo(
      art,
      { scale: 1.1, opacity: 0.45 },
      {
        scale: 0,
        opacity: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "bottom 40%",
          scrub: true,
        },
      }
    );
  });
}
</script>

<style scoped>
.section-padding {
  padding: 90px 0;
}
.tournaments-bg-art {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1200px;
  height: 1200px;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 140, 0, 0.25),
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}
.tournament-card {
  background: linear-gradient(155deg, #1f2532 0%, #131821 60%, #101319 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  position: relative;
}
.progress-thin {
  height: 8px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 4px;
  overflow: hidden;
}
.progress-bar {
  background: linear-gradient(90deg, #00c6ff, #0072ff);
}
.bg-accent {
  background: #00b4ff !important;
}
</style>
