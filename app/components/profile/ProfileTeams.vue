<template>
  <div class="teams-content">
    <div class="teams-grid">
      <div v-if="teams.length === 0" class="no-teams">
        <i class="fas fa-users"></i>
        <p>Chưa tham gia đội nào</p>
        <NuxtLink to="/teams" class="btn-find-team">Tìm đội</NuxtLink>
      </div>
      <div 
        v-for="team in teams" 
        :key="team.id" 
        class="team-card"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div class="team-logo">
          <img :src="team.logo" :alt="team.name" />
        </div>
        <div class="team-info">
          <h3>{{ team.name }}</h3>
          <div class="team-meta">
            <div class="meta-item">
              <i class="fas fa-gamepad"></i>
              <span>{{ team.game }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-globe"></i>
              <span>{{ team.region }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-users"></i>
              <span>{{ team.members }} thành viên</span>
            </div>
          </div>
          <div class="team-role">
            <span class="role-badge" :class="getRoleClass(team.role)">
              {{ team.role }}
            </span>
          </div>
        </div>
        <div class="team-actions">
          <NuxtLink :to="`/teams/${team.id}`" class="btn-details">
            Chi tiết
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  teams: {
    type: Array,
    required: true
  }
});

// Helper functions
const getRoleClass = (role: string) => {
  switch (role.toLowerCase()) {
    case 'captain': return 'captain';
    case 'manager': return 'manager';
    case 'coach': return 'coach';
    case 'player': return 'player';
    default: return '';
  }
};
</script>

<style scoped>
.teams-content {
  padding: 10px 0;
}

.teams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.no-teams {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  color: #999;
}

.no-teams i {
  font-size: 48px;
  margin-bottom: 15px;
  opacity: 0.5;
}

.btn-find-team {
  margin-top: 20px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #ff5ea2, #ff9966);
  border-radius: 6px;
  color: #fff;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.btn-find-team:hover {
  opacity: 0.9;
}

.team-card {
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.team-logo {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #222;
  padding: 20px;
}

.team-logo img {
  max-width: 100%;
  max-height: 100px;
  object-fit: contain;
}

.team-info {
  padding: 15px;
  flex-grow: 1;
}

.team-info h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #fff;
}

.team-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 15px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ccc;
  font-size: 13px;
}

.meta-item i {
  color: #ff5ea2;
  width: 16px;
  text-align: center;
}

.team-role {
  margin-top: 10px;
}

.role-badge {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.role-badge.captain {
  background: linear-gradient(135deg, #ff5ea2, #ff9966);
}

.role-badge.manager {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
}

.role-badge.coach {
  background: linear-gradient(135deg, #43e97b, #38f9d7);
}

.role-badge.player {
  background: linear-gradient(135deg, #a18cd1, #fbc2eb);
}

.team-actions {
  padding: 0 15px 15px;
  display: flex;
  justify-content: flex-end;
}

.btn-details {
  padding: 8px 15px;
  background-color: #333;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-details:hover {
  background-color: #444;
}

@media (max-width: 767px) {
  .teams-grid {
    grid-template-columns: 1fr;
  }
}
</style>