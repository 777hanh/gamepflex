<template>
  <div class="team-stats" data-aos="fade-up">
    <h3 class="stats-title">Thống kê đội</h3>
    <div class="stats-grid">
      <div class="stat-item" data-aos="fade-up" data-aos-delay="100">
        <div class="stat-value">{{ team.wins }}</div>
        <div class="stat-label">Trận thắng</div>
      </div>
      <div class="stat-item" data-aos="fade-up" data-aos-delay="200">
        <div class="stat-value">{{ team.losses }}</div>
        <div class="stat-label">Trận thua</div>
      </div>
      <div class="stat-item" data-aos="fade-up" data-aos-delay="300">
        <div class="stat-value">{{ winRate }}%</div>
        <div class="stat-label">Tỉ lệ thắng</div>
      </div>
      <div class="stat-item" data-aos="fade-up" data-aos-delay="400">
        <div class="stat-value">{{ team.tournaments }}</div>
        <div class="stat-label">Giải đấu</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Team {
  id: string;
  name: string;
  logo: string;
  game: string;
  region: string;
  rank: number;
  members: number;
  wins: number;
  losses: number;
  tournaments: number;
  description?: string;
  banner?: string;
  foundedDate?: string;
  achievements?: string[];
  socialLinks?: {
    twitter?: string;
    twitch?: string;
    youtube?: string;
    discord?: string;
  };
}

const props = defineProps<{
  team: Team;
}>();

// Tính tỉ lệ thắng
const winRate = computed(() => {
  const totalMatches = props.team.wins + props.team.losses;
  if (totalMatches === 0) return 0;
  return Math.round((props.team.wins / totalMatches) * 100);
});
</script>

<style scoped>
.team-stats {
  background-color: #151515;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
}

.stats-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fff;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.stat-item {
  text-align: center;
  padding: 15px;
  background-color: #1a1a1a;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 5px;
  background: linear-gradient(90deg, #ff5ea2, #ff9966);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 14px;
  color: #ccc;
}

@media (max-width: 767px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>