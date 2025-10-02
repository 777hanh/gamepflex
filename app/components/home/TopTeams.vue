<template>
  <section class="section-padding bg-dark-alt">
    <div class="container">
      <div class="section-header text-center mb-5">
        <h2 class="display-5 fw-bold text-white mb-3">Top Teams</h2>
        <p class="text-muted lead">
          Những đội tuyển xuất sắc nhất đang dẫn đầu
        </p>
      </div>
      <div class="row g-4">
        <div
          v-for="(team, index) in teams"
          :key="team.id"
          class="col-md-6 col-lg-4"
        >
          <div
            class="team-card h-100 p-4 magnetic-depth magnetic"
            data-aos="fade-up"
            data-aos-duration="700"
            :data-aos-delay="(index * 80) % 600"
            data-depth-rot="17"
            data-depth-scale="0.04"
          >
            <div class="magnetic-inner h-100 d-flex flex-column">
              <div class="rank-badge position-absolute top-0 start-0 m-3">
                <span class="badge bg-accent px-3 py-2">#{{ index + 1 }}</span>
              </div>
              <div class="text-center mb-4 pt-3">
                <NuxtImg
                  :src="team.logo"
                  :alt="team.name"
                  class="rounded-circle mb-3 team-logo"
                  width="92"
                  height="92"
                  format="webp"
                  densities="x1 x2"
                />
                <h5 class="text-white mb-1">{{ team.name }}</h5>
                <span class="text-muted small">{{ team.region }}</span>
              </div>
              <div class="row text-center mb-4 g-3">
                <div class="col-4">
                  <h6 class="mb-0 text-primary">{{ team.wins }}</h6>
                  <small class="text-muted">Wins</small>
                </div>
                <div class="col-4">
                  <h6 class="mb-0 text-success">{{ team.members }}</h6>
                  <small class="text-muted">Members</small>
                </div>
                <div class="col-4">
                  <h6 class="mb-0 text-warning">${{ team.earnings }}</h6>
                  <small class="text-muted">Earnings</small>
                </div>
              </div>
              <NuxtLink
                :to="`/teams/${team.id}`"
                class="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2"
              >
                <i class="fas fa-eye" />
                Xem chi tiết
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface TopTeam {
  id: number;
  name: string;
  region: string;
  logo: string;
  wins: number;
  members: number;
  earnings: string;
}
const _props = defineProps<{ teams: TopTeam[] }>();
</script>

<style scoped>
.section-padding {
  padding: 90px 0;
}
.team-card {
  background: linear-gradient(155deg, #1f2532 0%, #131821 60%, #101319 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  position: relative;
}
.team-logo {
  width: 86px;
  height: 86px;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.15);
}
.bg-accent {
  background: #00b4ff !important;
}
</style>
