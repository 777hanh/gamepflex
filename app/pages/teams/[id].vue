<template>
  <div class="team-details-page">
    <!-- Hero Section -->
    <section class="hero-section" :style="{ backgroundImage: `url(${teamData.banner || '/assets/img/team-banner-default.jpg'})` }">
      <div class="container">
        <div class="hero-content" data-aos="fade-up">
          <div class="team-logo">
            <img :src="teamData.logo" :alt="teamData.name">
          </div>
          <h1 class="team-name">{{ teamData.name }}</h1>
          <div class="team-meta">
            <span class="team-game">{{ teamData.game }}</span>
            <span class="team-region">{{ getRegionName(teamData.region) }}</span>
            <span class="team-rank">#{{ teamData.rank }}</span>
          </div>
          <div class="team-actions">
            <button class="btn btn-primary">
              <i class="fas fa-user-plus"></i> Theo dõi
            </button>
            <button class="btn btn-outline">
              <i class="fas fa-share-alt"></i> Chia sẻ
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="main-content">
      <div class="container">
        <div class="content-grid">
          <!-- Left Column - Team Info -->
          <div class="left-column">
            <!-- Team Description -->
            <div class="team-description" data-aos="fade-up">
              <h3 class="section-title">Giới thiệu</h3>
              <p>{{ teamData.description || 'Chưa có thông tin giới thiệu.' }}</p>
              <div class="team-founded" v-if="teamData.foundedDate">
                <strong>Ngày thành lập:</strong> {{ formatDate(teamData.foundedDate) }}
              </div>
            </div>

            <!-- Team Stats -->
            <TeamStats :team="teamData" />

            <!-- Team Members -->
            <TeamMembers :members="teamMembers" />

            <!-- Team Achievements -->
            <TeamAchievements :team="teamData" />

            <!-- Recent Matches -->
            <div class="recent-matches" data-aos="fade-up">
              <h3 class="section-title">Trận đấu gần đây</h3>
              <div class="matches-list">
                <div v-for="(match, index) in recentMatches" :key="index" class="match-item" 
                     data-aos="fade-up" :data-aos-delay="100 + (index * 50)">
                  <div class="match-date">{{ formatDate(match.date) }}</div>
                  <div class="match-tournament">{{ match.tournament }}</div>
                  <div class="match-teams">
                    <div class="team team-left" :class="{ 'winner': match.result === 'win' }">
                      <img :src="teamData.logo" :alt="teamData.name">
                      <span>{{ teamData.name }}</span>
                    </div>
                    <div class="match-score">
                      <span>{{ match.score }}</span>
                    </div>
                    <div class="team team-right" :class="{ 'winner': match.result === 'loss' }">
                      <img :src="match.opponent.logo" :alt="match.opponent.name">
                      <span>{{ match.opponent.name }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="recentMatches.length === 0" class="no-matches">
                  <p>Chưa có trận đấu nào được ghi nhận.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Sidebar -->
          <div class="right-column">
            <!-- Social Links -->
            <div class="social-links" data-aos="fade-up">
              <h3 class="sidebar-title">Kết nối</h3>
              <div class="social-buttons">
                <a v-if="teamData.socialLinks?.twitter" :href="teamData.socialLinks.twitter" target="_blank" class="social-btn twitter">
                  <i class="fab fa-twitter"></i>
                </a>
                <a v-if="teamData.socialLinks?.twitch" :href="teamData.socialLinks.twitch" target="_blank" class="social-btn twitch">
                  <i class="fab fa-twitch"></i>
                </a>
                <a v-if="teamData.socialLinks?.youtube" :href="teamData.socialLinks.youtube" target="_blank" class="social-btn youtube">
                  <i class="fab fa-youtube"></i>
                </a>
                <a v-if="teamData.socialLinks?.discord" :href="teamData.socialLinks.discord" target="_blank" class="social-btn discord">
                  <i class="fab fa-discord"></i>
                </a>
              </div>
            </div>

            <!-- Upcoming Tournaments -->
            <div class="upcoming-tournaments" data-aos="fade-up">
              <h3 class="sidebar-title">Giải đấu sắp tới</h3>
              <div class="tournaments-list">
                <div v-for="(tournament, index) in upcomingTournaments" :key="index" class="tournament-item"
                     data-aos="fade-up" :data-aos-delay="100 + (index * 50)">
                  <div class="tournament-image">
                    <img :src="tournament.image" :alt="tournament.name">
                  </div>
                  <div class="tournament-info">
                    <h4 class="tournament-name">{{ tournament.name }}</h4>
                    <div class="tournament-meta">
                      <span class="tournament-date">
                        <i class="far fa-calendar-alt"></i> {{ formatDate(tournament.startDate) }}
                      </span>
                      <span class="tournament-prize">
                        <i class="fas fa-trophy"></i> {{ formatCurrency(tournament.prizePool) }}
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="upcomingTournaments.length === 0" class="no-tournaments">
                  <p>Không có giải đấu sắp tới.</p>
                </div>
              </div>
            </div>

            <!-- Similar Teams -->
            <div class="similar-teams" data-aos="fade-up">
              <h3 class="sidebar-title">Đội tương tự</h3>
              <div class="teams-list">
                <div v-for="(team, index) in similarTeams" :key="index" class="similar-team-item"
                     data-aos="fade-up" :data-aos-delay="100 + (index * 50)">
                  <div class="team-image">
                    <img :src="team.logo" :alt="team.name">
                  </div>
                  <div class="team-info">
                    <h4 class="team-name">{{ team.name }}</h4>
                    <div class="team-meta">
                      <span class="team-game">{{ team.game }}</span>
                      <span class="team-region">{{ getRegionName(team.region) }}</span>
                    </div>
                  </div>
                  <NuxtLink :to="`/teams/${team.id}`" class="view-team">
                    <i class="fas fa-arrow-right"></i>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useAnimation } from '~/composables/useAnimation';

// Interfaces
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

interface Member {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
  role: string;
  kda: string;
  matches: number;
  socialLinks?: {
    twitter?: string;
    twitch?: string;
    youtube?: string;
  };
}

interface Match {
  date: string;
  tournament: string;
  score: string;
  result: 'win' | 'loss' | 'draw';
  opponent: {
    name: string;
    logo: string;
  };
}

interface Tournament {
  id: string;
  name: string;
  image: string;
  startDate: string;
  prizePool: number;
}

// Route
const route = useRoute();
const teamId = route.params.id as string;

// Animation
const { initAnimations, cleanupAnimations } = useAnimation();

// Mock data
const teamData = ref<Team>({
  id: teamId,
  name: 'Team Liquid',
  logo: '/assets/img/teams/team-liquid.png',
  banner: '/assets/img/teams/team-liquid-banner.jpg',
  game: 'League of Legends',
  region: 'na',
  rank: 3,
  members: 5,
  wins: 120,
  losses: 45,
  tournaments: 28,
  description: 'Team Liquid là một tổ chức thể thao điện tử chuyên nghiệp đa quốc gia. Được thành lập vào năm 2000 với tư cách là một trang web cộng đồng StarCraft, nó đã phát triển thành một đội thể thao điện tử hàng đầu với các đội thi đấu trong nhiều trò chơi khác nhau.',
  foundedDate: '2000-01-01',
  achievements: [
    'Vô địch LCS Mùa Xuân 2019',
    'Vô địch LCS Mùa Hè 2019',
    'Top 4 MSI 2019',
    'Top 8 Worlds 2020',
    'Vô địch IEM Katowice 2019'
  ],
  socialLinks: {
    twitter: 'https://twitter.com/teamliquid',
    twitch: 'https://twitch.tv/teamliquid',
    youtube: 'https://youtube.com/teamliquid',
    discord: 'https://discord.gg/teamliquid'
  }
});

const teamMembers = ref<Member[]>([
  {
    id: '1',
    name: 'Nicolaj Jensen',
    nickname: 'Jensen',
    avatar: '/assets/img/members/member1.jpg',
    role: 'Mid',
    kda: '4.2',
    matches: 86,
    socialLinks: {
      twitter: 'https://twitter.com/jensen',
      twitch: 'https://twitch.tv/jensen'
    }
  },
  {
    id: '2',
    name: 'Lucas Tao Kilmer Larsen',
    nickname: 'Santorin',
    avatar: '/assets/img/members/member2.jpg',
    role: 'Jungle',
    kda: '3.8',
    matches: 92,
    socialLinks: {
      twitter: 'https://twitter.com/santorin'
    }
  },
  {
    id: '3',
    name: 'Barney Morris',
    nickname: 'Alphari',
    avatar: '/assets/img/members/member3.jpg',
    role: 'Top',
    kda: '3.5',
    matches: 78,
    socialLinks: {
      twitter: 'https://twitter.com/alphari',
      youtube: 'https://youtube.com/alphari'
    }
  },
  {
    id: '4',
    name: 'Edward Ra',
    nickname: 'Tactical',
    avatar: '/assets/img/members/member4.jpg',
    role: 'ADC',
    kda: '4.0',
    matches: 90,
    socialLinks: {
      twitch: 'https://twitch.tv/tactical'
    }
  },
  {
    id: '5',
    name: 'Jo Yong-in',
    nickname: 'CoreJJ',
    avatar: '/assets/img/members/member5.jpg',
    role: 'Support',
    kda: '4.5',
    matches: 95,
    socialLinks: {
      twitter: 'https://twitter.com/corejj',
      youtube: 'https://youtube.com/corejj'
    }
  }
]);

const recentMatches = ref<Match[]>([
  {
    date: '2023-06-15',
    tournament: 'LCS Summer 2023',
    score: '2-0',
    result: 'win',
    opponent: {
      name: 'Cloud9',
      logo: '/assets/img/teams/cloud9.png'
    }
  },
  {
    date: '2023-06-10',
    tournament: 'LCS Summer 2023',
    score: '1-2',
    result: 'loss',
    opponent: {
      name: 'TSM',
      logo: '/assets/img/teams/tsm.png'
    }
  },
  {
    date: '2023-06-05',
    tournament: 'LCS Summer 2023',
    score: '2-1',
    result: 'win',
    opponent: {
      name: '100 Thieves',
      logo: '/assets/img/teams/100thieves.png'
    }
  }
]);

const upcomingTournaments = ref<Tournament[]>([
  {
    id: '1',
    name: 'LCS Summer Playoffs 2023',
    image: '/assets/img/tournaments/lcs.jpg',
    startDate: '2023-08-20',
    prizePool: 200000
  },
  {
    id: '2',
    name: 'Worlds 2023',
    image: '/assets/img/tournaments/worlds.jpg',
    startDate: '2023-10-10',
    prizePool: 2000000
  }
]);

const similarTeams = ref<Team[]>([
  {
    id: 'cloud9',
    name: 'Cloud9',
    logo: '/assets/img/teams/cloud9.png',
    game: 'League of Legends',
    region: 'na',
    rank: 2,
    members: 5,
    wins: 115,
    losses: 50,
    tournaments: 25
  },
  {
    id: 'tsm',
    name: 'TSM',
    logo: '/assets/img/teams/tsm.png',
    game: 'League of Legends',
    region: 'na',
    rank: 4,
    members: 5,
    wins: 110,
    losses: 55,
    tournaments: 24
  },
  {
    id: '100thieves',
    name: '100 Thieves',
    logo: '/assets/img/teams/100thieves.png',
    game: 'League of Legends',
    region: 'na',
    rank: 5,
    members: 5,
    wins: 95,
    losses: 60,
    tournaments: 20
  }
]);

// Utility functions
const getRegionName = (regionCode: string): string => {
  const regions: Record<string, string> = {
    'na': 'Bắc Mỹ',
    'eu': 'Châu Âu',
    'kr': 'Hàn Quốc',
    'cn': 'Trung Quốc',
    'vn': 'Việt Nam',
    'sea': 'Đông Nam Á',
    'jp': 'Nhật Bản',
    'br': 'Brazil',
    'lan': 'Mỹ Latinh (Bắc)',
    'las': 'Mỹ Latinh (Nam)',
    'oce': 'Châu Đại Dương',
    'tr': 'Thổ Nhĩ Kỳ',
    'ru': 'Nga'
  };
  
  return regions[regionCode.toLowerCase()] || regionCode;
};

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('vi-VN', options);
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

// Lifecycle hooks
onMounted(() => {
  initAnimations();
});

onUnmounted(() => {
  cleanupAnimations();
});
</script>

<style scoped>
.team-details-page {
  background-color: #0a0a0a;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 40px;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(10, 10, 10, 0.3), rgba(10, 10, 10, 0.9));
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.team-logo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #ff5ea2;
  margin-bottom: 20px;
}

.team-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-name {
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
}

.team-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.team-meta span {
  font-size: 14px;
  padding: 5px 12px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.team-rank {
  background: linear-gradient(90deg, #ff5ea2, #ff9966) !important;
  font-weight: 600;
}

.team-actions {
  display: flex;
  gap: 15px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn i {
  margin-right: 8px;
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

/* Main Content */
.main-content {
  padding: 60px 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

/* Left Column */
.left-column {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.team-description {
  background-color: #151515;
  border-radius: 12px;
  padding: 24px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fff;
}

.team-description p {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 15px;
}

.team-founded {
  color: #ccc;
  font-size: 14px;
}

.team-founded strong {
  color: #fff;
}

/* Recent Matches */
.recent-matches {
  background-color: #151515;
  border-radius: 12px;
  padding: 24px;
}

.matches-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.match-item {
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.match-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.match-date {
  font-size: 12px;
  color: #ccc;
  margin-bottom: 5px;
}

.match-tournament {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 10px;
}

.match-teams {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.team {
  display: flex;
  align-items: center;
  flex: 1;
}

.team img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

.team span {
  margin-left: 10px;
  font-size: 14px;
  color: #fff;
}

.team-left {
  justify-content: flex-start;
}

.team-right {
  justify-content: flex-end;
  flex-direction: row-reverse;
}

.team-right span {
  margin-left: 0;
  margin-right: 10px;
}

.match-score {
  padding: 5px 15px;
  background-color: #252525;
  border-radius: 20px;
  font-weight: 600;
  color: #fff;
}

.winner span {
  color: #ff5ea2;
}

.no-matches {
  text-align: center;
  padding: 20px;
  background-color: #1a1a1a;
  border-radius: 8px;
}

.no-matches p {
  color: #ccc;
  font-size: 15px;
}

/* Right Column */
.right-column {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #fff;
}

/* Social Links */
.social-links {
  background-color: #151515;
  border-radius: 12px;
  padding: 24px;
}

.social-buttons {
  display: flex;
  gap: 10px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  transition: all 0.3s ease;
}

.twitter {
  background-color: #1da1f2;
}

.twitch {
  background-color: #9146ff;
}

.youtube {
  background-color: #ff0000;
}

.discord {
  background-color: #7289da;
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

/* Upcoming Tournaments */
.upcoming-tournaments {
  background-color: #151515;
  border-radius: 12px;
  padding: 24px;
}

.tournaments-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tournament-item {
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tournament-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.tournament-image {
  width: 80px;
  height: 60px;
  flex-shrink: 0;
}

.tournament-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tournament-info {
  flex: 1;
  padding: 10px 15px;
}

.tournament-name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 5px;
}

.tournament-meta {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.tournament-meta span {
  font-size: 12px;
  color: #ccc;
}

.tournament-meta i {
  margin-right: 5px;
  color: #ff5ea2;
}

.no-tournaments {
  text-align: center;
  padding: 20px;
  background-color: #1a1a1a;
  border-radius: 8px;
}

.no-tournaments p {
  color: #ccc;
  font-size: 15px;
}

/* Similar Teams */
.similar-teams {
  background-color: #151515;
  border-radius: 12px;
  padding: 24px;
}

.teams-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.similar-team-item {
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.similar-team-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.team-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  flex-shrink: 0;
}

.team-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-info {
  flex: 1;
}

.team-name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 5px;
}

.team-meta {
  display: flex;
  gap: 10px;
}

.team-meta span {
  font-size: 12px;
  color: #ccc;
}

.view-team {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #252525;
  border-radius: 50%;
  color: #fff;
  transition: all 0.3s ease;
}

.view-team:hover {
  background: linear-gradient(90deg, #ff5ea2, #ff9966);
}

@media (max-width: 991px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .right-column {
    order: -1;
  }
}

@media (max-width: 767px) {
  .hero-section {
    height: 350px;
  }
  
  .team-logo {
    width: 100px;
    height: 100px;
  }
  
  .team-name {
    font-size: 28px;
  }
  
  .team-meta {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .team-actions {
    flex-direction: column;
  }
  
  .match-teams {
    flex-direction: column;
    gap: 10px;
  }
  
  .match-score {
    margin: 10px 0;
  }
  
  .team-left, .team-right {
    justify-content: center;
  }
}
</style>