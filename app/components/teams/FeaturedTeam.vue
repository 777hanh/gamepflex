<template>
  <div class="featured-team" data-aos="fade-up" v-if="team">
    <div class="featured-team-inner">
      <div class="featured-team-image">
        <img :src="team.banner" :alt="team.name">
        <div class="featured-badge">
          <span>Featured</span>
        </div>
      </div>
      <div class="featured-team-content">
        <div class="team-logo">
          <img :src="team.logo" :alt="team.name">
        </div>
        <h3 class="team-title">{{ team.name }}</h3>
        <div class="team-games">
          <div v-for="game in team.games" :key="game.id" class="team-game">
            <img :src="game.icon" :alt="game.name">
            <span>{{ game.name }}</span>
          </div>
        </div>
        <div class="team-stats">
          <div class="stat-item">
            <div class="stat-value">{{ team.rank }}</div>
            <div class="stat-label">Global Rank</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ team.wins }}</div>
            <div class="stat-label">Wins</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ team.tournaments }}</div>
            <div class="stat-label">Tournaments</div>
          </div>
        </div>
        <div class="team-description">
          {{ team.description }}
        </div>
        <div class="team-actions">
          <NuxtLink :to="`/teams/${team.id}`" class="btn btn-primary">
            View Team
          </NuxtLink>
          <button class="btn btn-outline">
            <i class="fas fa-star"></i> Follow
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Game {
  id: string;
  name: string;
  icon: string;
}

interface Team {
  id: number;
  name: string;
  logo: string;
  banner: string;
  region: string;
  rank: number;
  wins: number;
  tournaments: number;
  members: number;
  description: string;
  games: Game[];
  featured: boolean;
}

const props = defineProps<{
  team: Team;
}>();
</script>

<style scoped>
/* Featured Team */
.featured-team {
  margin-bottom: 40px;
}

.featured-team-inner {
  display: flex;
  background-color: #121212;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.featured-team-image {
  position: relative;
  width: 40%;
  min-height: 300px;
}

.featured-team-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: linear-gradient(90deg, #ff5ea2, #ff9966);
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
}

.featured-team-content {
  width: 60%;
  padding: 30px;
  position: relative;
}

.featured-team-content .team-logo {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  border: 2px solid #ff5ea2;
}

.featured-team-content .team-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-team-content .team-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #fff;
}

.featured-team-content .team-games {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.team-game {
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  border-radius: 20px;
  padding: 5px 12px;
}

.team-game img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border-radius: 4px;
}

.team-game span {
  font-size: 12px;
  color: #ccc;
}

.featured-team-content .team-stats {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #ff5ea2;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  color: #ccc;
}

.featured-team-content .team-description {
  font-size: 14px;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 25px;
}

.featured-team-content .team-actions {
  display: flex;
  gap: 15px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(90deg, #ff5ea2, #ff9966);
  color: #fff;
  border: none;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-outline {
  background: transparent;
  border: 1px solid #ff5ea2;
  color: #ff5ea2;
}

.btn-outline:hover {
  background: rgba(255, 94, 162, 0.1);
}

/* Responsive */
@media (max-width: 991px) {
  .featured-team-inner {
    flex-direction: column;
  }
  
  .featured-team-image,
  .featured-team-content {
    width: 100%;
  }
}
</style>