<template>
  <div class="team-achievements" data-aos="fade-up">
    <h3 class="achievements-title">Thành tích</h3>
    <div class="achievements-list">
      <div v-for="(achievement, index) in team.achievements" :key="index" class="achievement-item" 
           data-aos="fade-up" :data-aos-delay="100 + (index * 50)">
        <div class="achievement-icon">
          <i class="fas fa-trophy"></i>
        </div>
        <div class="achievement-content">
          <p class="achievement-text">{{ achievement }}</p>
        </div>
      </div>
      <div v-if="!team.achievements || team.achievements.length === 0" class="no-achievements">
        <p>Chưa có thành tích nào được ghi nhận.</p>
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
</script>

<style scoped>
.team-achievements {
  background-color: #151515;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
}

.achievements-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fff;
}

.achievements-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.achievement-item {
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.achievement-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.achievement-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(90deg, #ff5ea2, #ff9966);
  border-radius: 50%;
  margin-right: 15px;
  flex-shrink: 0;
}

.achievement-icon i {
  color: #fff;
  font-size: 18px;
}

.achievement-content {
  flex: 1;
}

.achievement-text {
  font-size: 15px;
  color: #fff;
  line-height: 1.4;
}

.no-achievements {
  text-align: center;
  padding: 20px;
  background-color: #1a1a1a;
  border-radius: 8px;
}

.no-achievements p {
  color: #ccc;
  font-size: 15px;
}

@media (max-width: 767px) {
  .achievement-item {
    padding: 12px;
  }
  
  .achievement-icon {
    width: 32px;
    height: 32px;
  }
  
  .achievement-icon i {
    font-size: 14px;
  }
  
  .achievement-text {
    font-size: 14px;
  }
}
</style>