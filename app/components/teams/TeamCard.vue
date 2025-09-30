<template>
  <div class="team-card">
    <div class="team-header">
      <div class="team-rank">#{{ team.rank }}</div>
      <div class="team-logo">
        <img :src="team.logo" :alt="team.name">
      </div>
    </div>
    <div class="team-content">
      <h3 class="team-name">{{ team.name }}</h3>
      <div class="team-region">
        <i class="fas fa-globe-americas"></i>
        <span>{{ getRegionName(team.region) }}</span>
      </div>
      <div class="team-games">
        <div v-for="game in team.games" :key="game.id" class="team-game">
          <img :src="game.icon" :alt="game.name">
          <span>{{ game.name }}</span>
        </div>
      </div>
      <div class="team-stats">
        <div class="stat-item">
          <div class="stat-value">{{ team.members }}</div>
          <div class="stat-label">Members</div>
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
      <div class="team-actions">
        <NuxtLink :to="`/teams/${team.id}`" class="btn btn-sm btn-primary">
          View Team
        </NuxtLink>
        <button class="btn btn-sm btn-outline">
          <i class="fas fa-star"></i>
        </button>
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
  banner?: string;
  region: string;
  rank: number;
  wins: number;
  tournaments: number;
  members: number;
  description?: string;
  games: Game[];
  featured?: boolean;
}

const props = defineProps<{
  team: Team;
}>();

// Utility functions
const getRegionName = (regionCode: string) => {
  const regions: Record<string, string> = {
    'na': 'North America',
    'eu': 'Europe',
    'asia': 'Asia',
    'sa': 'South America',
    'oce': 'Oceania'
  };
  
  return regions[regionCode] || regionCode;
};
</script>

<style scoped>
/* Team Card */
.team-card {
  background-color: #121212;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.team-header {
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1a;
}

.team-rank {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #ff5ea2;
  color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.team-logo {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #ff5ea2;
}

.team-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-content {
  padding: 20px;
}

.team-name {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #fff;
  text-align: center;
}

.team-region {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #ccc;
  margin-bottom: 15px;
}

.team-region i {
  margin-right: 6px;
  color: #ff5ea2;
}

.team-games {
  display: flex;
  flex-direction: column;
  gap: 8px;
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

.team-stats {
  display: flex;
  justify-content: space-around;
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

.team-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
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

.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
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
</style>