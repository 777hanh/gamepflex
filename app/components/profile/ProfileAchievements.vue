<template>
  <div class="achievements-content">
    <div class="achievements-grid">
      <div v-if="achievements.length === 0" class="no-achievements">
        <i class="fas fa-award"></i>
        <p>Chưa có thành tích nào</p>
      </div>
      <div 
        v-for="achievement in achievements" 
        :key="achievement.id" 
        class="achievement-card"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div class="achievement-icon" :class="achievement.rarity">
          <i :class="getAchievementIcon(achievement.type)"></i>
        </div>
        <div class="achievement-info">
          <h3>{{ achievement.name }}</h3>
          <p>{{ achievement.description }}</p>
          <div class="achievement-progress" v-if="achievement.progress < 100">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${achievement.progress}%` }"></div>
            </div>
            <span class="progress-text">{{ achievement.progress }}%</span>
          </div>
          <div class="achievement-status" v-if="achievement.progress === 100">
            <span class="status-badge completed">
              <i class="fas fa-check-circle"></i> Đã hoàn thành
            </span>
            <span class="achievement-date">{{ formatDate(achievement.completedDate) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  achievements: {
    type: Array,
    required: true
  }
});

// Helper functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

const getAchievementIcon = (type: string) => {
  switch (type) {
    case 'tournament': return 'fas fa-trophy';
    case 'win': return 'fas fa-medal';
    case 'team': return 'fas fa-users';
    case 'streak': return 'fas fa-fire';
    case 'level': return 'fas fa-star';
    default: return 'fas fa-award';
  }
};
</script>

<style scoped>
.achievements-content {
  padding: 10px 0;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.no-achievements {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  color: #999;
}

.no-achievements i {
  font-size: 48px;
  margin-bottom: 15px;
  opacity: 0.5;
}

.achievement-card {
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.achievement-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.achievement-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  flex-shrink: 0;
}

.achievement-icon.common {
  background: linear-gradient(135deg, #a8a8a8, #d3d3d3);
}

.achievement-icon.rare {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
}

.achievement-icon.epic {
  background: linear-gradient(135deg, #a18cd1, #fbc2eb);
}

.achievement-icon.legendary {
  background: linear-gradient(135deg, #ff5ea2, #ff9966);
}

.achievement-info {
  flex: 1;
}

.achievement-info h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #fff;
}

.achievement-info p {
  color: #ccc;
  font-size: 14px;
  margin-bottom: 15px;
}

.achievement-progress {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background-color: #333;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #ff5ea2, #ff9966);
  border-radius: 4px;
}

.progress-text {
  font-size: 12px;
  color: #ccc;
  min-width: 40px;
  text-align: right;
}

.achievement-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.completed {
  background-color: rgba(67, 233, 123, 0.2);
  color: #43e97b;
}

.achievement-date {
  font-size: 12px;
  color: #999;
}

@media (max-width: 767px) {
  .achievements-grid {
    grid-template-columns: 1fr;
  }
}
</style>