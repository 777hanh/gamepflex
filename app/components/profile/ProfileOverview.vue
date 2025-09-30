<template>
  <div class="overview-content">
    <div class="about-section">
      <h3>Giới thiệu</h3>
      <p>{{ user.bio }}</p>
      <div class="user-info">
        <div class="info-item">
          <i class="fas fa-gamepad"></i>
          <span>Game yêu thích: {{ user.favoriteGames.join(', ') }}</span>
        </div>
        <div class="info-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>Vị trí: {{ user.location }}</span>
        </div>
        <div class="info-item">
          <i class="fas fa-calendar-alt"></i>
          <span>Tham gia: {{ formatDate(user.joinDate) }}</span>
        </div>
        <div class="info-item">
          <i class="fas fa-link"></i>
          <span>Website: <a :href="user.website" target="_blank">{{ user.website }}</a></span>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <h3>Thống kê</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-trophy"></i>
          </div>
          <div class="stat-info">
            <h4>Giải đấu tham gia</h4>
            <p>{{ user.stats.tournaments }}</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-award"></i>
          </div>
          <div class="stat-info">
            <h4>Giải thưởng</h4>
            <p>{{ formatCurrency(user.stats.earnings) }}</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-gamepad"></i>
          </div>
          <div class="stat-info">
            <h4>Trận đấu</h4>
            <p>{{ user.stats.matches }}</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="stat-info">
            <h4>Tỉ lệ thắng</h4>
            <p>{{ calculateWinRate(user.stats.wins, user.stats.matches) }}%</p>
          </div>
        </div>
      </div>
    </div>

    <div class="recent-activity">
      <h3>Hoạt động gần đây</h3>
      <div class="activity-list">
        <div v-for="(activity, index) in recentActivities" :key="index" class="activity-item">
          <div class="activity-icon" :class="activity.type">
            <i :class="getActivityIcon(activity.type)"></i>
          </div>
          <div class="activity-content">
            <p class="activity-text">{{ activity.text }}</p>
            <p class="activity-time">{{ formatTimeAgo(activity.time) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  user: {
    type: Object,
    required: true
  },
  recentActivities: {
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(amount);
};

const calculateWinRate = (wins: number, matches: number) => {
  if (matches === 0) return 0;
  return Math.round((wins / matches) * 100);
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  if (diffSec < 60) {
    return `${diffSec} giây trước`;
  } else if (diffMin < 60) {
    return `${diffMin} phút trước`;
  } else if (diffHour < 24) {
    return `${diffHour} giờ trước`;
  } else if (diffDay < 30) {
    return `${diffDay} ngày trước`;
  } else {
    return formatDate(date.toISOString().split('T')[0]);
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'tournament': return 'fas fa-trophy';
    case 'win': return 'fas fa-medal';
    case 'team': return 'fas fa-users';
    case 'achievement': return 'fas fa-award';
    default: return 'fas fa-bell';
  }
};
</script>

<style scoped>
.overview-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.about-section, .stats-section, .recent-activity {
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 20px;
}

.about-section h3, .stats-section h3, .recent-activity h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #fff;
}

.user-info {
  margin-top: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #ccc;
}

.info-item i {
  color: #ff5ea2;
  width: 20px;
  text-align: center;
}

.info-item a {
  color: #ff5ea2;
  text-decoration: none;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.stat-card {
  background-color: #222;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff5ea2, #ff9966);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
}

.stat-info h4 {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 5px;
}

.stat-info p {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  background-color: #222;
  border-radius: 8px;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
}

.activity-icon.tournament {
  background: linear-gradient(135deg, #ff5ea2, #ff9966);
}

.activity-icon.win {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
}

.activity-icon.team {
  background: linear-gradient(135deg, #43e97b, #38f9d7);
}

.activity-icon.achievement {
  background: linear-gradient(135deg, #fa709a, #fee140);
}

.activity-content {
  flex: 1;
}

.activity-text {
  color: #fff;
  margin-bottom: 5px;
}

.activity-time {
  font-size: 12px;
  color: #999;
}

@media (max-width: 767px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .activity-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .activity-icon {
    margin-bottom: 10px;
  }
}
</style>