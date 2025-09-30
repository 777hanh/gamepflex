<template>
  <div class="games-page">
    <!-- Hero Section -->
    <section class="page-header">
      <div class="container">
        <div class="page-header-content">
          <h1 class="page-title" data-aos="fade-up">Explore Games</h1>
          <p class="page-subtitle" data-aos="fade-up" data-aos-delay="100">Discover the most popular games on our platform</p>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section">
      <div class="container">
        <div class="filter-wrapper" data-aos="fade-up">
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search games..." 
              @input="filterGames"
            >
            <i class="fas fa-search"></i>
          </div>
          <div class="filter-options">
            <div class="filter-item">
              <select v-model="categoryFilter" @change="filterGames">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
              </select>
            </div>
            <div class="filter-item">
              <select v-model="platformFilter" @change="filterGames">
                <option value="">All Platforms</option>
                <option v-for="platform in platforms" :key="platform" :value="platform">{{ platform }}</option>
              </select>
            </div>
            <div class="filter-item">
              <select v-model="sortBy" @change="filterGames">
                <option value="popularity">Popularity</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Games Grid Section -->
    <section class="games-grid-section">
      <div class="container">
        <div v-if="filteredGames.length === 0" class="no-results" data-aos="fade-up">
          <i class="fas fa-search"></i>
          <h3>No games found</h3>
          <p>Try changing your search criteria or browse all games</p>
          <button class="btn" @click="resetFilters">Reset Filters</button>
        </div>
        <div v-else class="row">
          <div v-for="game in filteredGames" :key="game.id" class="col-xl-3 col-lg-4 col-md-6">
            <div class="game-card scroll-fade-up" data-aos="fade-up">
              <div class="game-thumb">
                <img :src="game.image" :alt="game.title">
                <div class="game-rating">
                  <i class="fas fa-star"></i>
                  <span>{{ game.rating }}</span>
                </div>
              </div>
              <div class="game-content">
                <h3 class="game-title">{{ game.title }}</h3>
                <div class="game-meta">
                  <div class="meta-item">
                    <i class="fas fa-tag"></i>
                    <span>{{ game.category }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="fas fa-users"></i>
                    <span>{{ formatNumber(game.players) }} players</span>
                  </div>
                </div>
                <div class="game-platform">
                  <span v-for="(platform, index) in game.platform" :key="index" class="platform-badge">
                    {{ platform }}
                  </span>
                </div>
                <NuxtLink :to="`/games/${game.id}`" class="btn btn-sm">View Game</NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination" v-if="filteredGames.length > 0" data-aos="fade-up">
          <button 
            class="pagination-btn" 
            :class="{ disabled: currentPage === 1 }"
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <button 
            v-for="page in totalPages" 
            :key="page" 
            class="pagination-btn" 
            :class="{ active: currentPage === page }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
          <button 
            class="pagination-btn" 
            :class="{ disabled: currentPage === totalPages }"
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useApiStore } from '~/stores/api';
import { Game } from '~/services/api';

definePageMeta({
  middleware: ['data-loader']
});

// Lấy dữ liệu từ store
const apiStore = useApiStore();
const allGames = ref<Game[]>([]);

// Filters
const searchQuery = ref('');
const categoryFilter = ref('');
const platformFilter = ref('');
const sortBy = ref('popularity');
const currentPage = ref(1);
const gamesPerPage = 12;

// Lấy danh sách categories và platforms từ games
const categories = computed(() => {
  const uniqueCategories = new Set<string>();
  allGames.value.forEach(game => {
    uniqueCategories.add(game.category);
  });
  return Array.from(uniqueCategories);
});

const platforms = computed(() => {
  const uniquePlatforms = new Set<string>();
  allGames.value.forEach(game => {
    game.platform.forEach(platform => {
      uniquePlatforms.add(platform);
    });
  });
  return Array.from(uniquePlatforms);
});

// Lọc games theo các tiêu chí
const filteredGames = computed(() => {
  let result = [...allGames.value];
  
  // Lọc theo search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(game => 
      game.title.toLowerCase().includes(query) || 
      game.category.toLowerCase().includes(query)
    );
  }
  
  // Lọc theo category
  if (categoryFilter.value) {
    result = result.filter(game => game.category === categoryFilter.value);
  }
  
  // Lọc theo platform
  if (platformFilter.value) {
    result = result.filter(game => game.platform.includes(platformFilter.value));
  }
  
  // Sắp xếp
  switch (sortBy.value) {
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
      break;
    case 'popularity':
    default:
      result.sort((a, b) => b.players - a.players);
      break;
  }
  
  return result;
});

// Phân trang
const paginatedGames = computed(() => {
  const startIndex = (currentPage.value - 1) * gamesPerPage;
  const endIndex = startIndex + gamesPerPage;
  return filteredGames.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(filteredGames.value.length / gamesPerPage);
});

// Format number
const formatNumber = (num: number): string => {
  return num > 1000 ? (num / 1000).toFixed(1) + 'k' : num.toString();
};

// Thay đổi trang
const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Reset filters
const resetFilters = () => {
  searchQuery.value = '';
  categoryFilter.value = '';
  platformFilter.value = '';
  sortBy.value = 'popularity';
  currentPage.value = 1;
};

// Filter games
const filterGames = () => {
  currentPage.value = 1;
};

// Lấy dữ liệu khi component được mount
onMounted(() => {
  allGames.value = apiStore.games;
});
</script>

<style scoped>
/* Page Header */
.page-header {
  padding: 100px 0 60px;
  background: linear-gradient(rgba(15, 15, 15, 0.9), rgba(15, 15, 15, 0.9)), url('/assets/img/page-header-bg.jpg') no-repeat center center;
  background-size: cover;
  text-align: center;
}

.page-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 15px;
}

.page-subtitle {
  font-size: 18px;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto;
}

/* Filter Section */
.filter-section {
  padding: 30px 0;
  background-color: #0a0a0a;
}

.filter-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 250px;
}

.search-box input {
  width: 100%;
  padding: 12px 20px;
  padding-right: 40px;
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 30px;
  color: #fff;
}

.search-box i {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.filter-options {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.filter-item select {
  padding: 10px 15px;
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 5px;
  color: #fff;
  min-width: 150px;
}

/* Games Grid Section */
.games-grid-section {
  padding: 60px 0;
}

.no-results {
  text-align: center;
  padding: 50px 0;
}

.no-results i {
  font-size: 48px;
  color: #666;
  margin-bottom: 20px;
}

.no-results h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.no-results p {
  color: #999;
  margin-bottom: 20px;
}

/* Game Card */
.game-card {
  background-color: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.game-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.game-thumb {
  position: relative;
}

.game-thumb img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.game-rating {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #f1c40f;
  padding: 5px 10px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.game-rating i {
  margin-right: 5px;
}

.game-content {
  padding: 20px;
}

.game-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.game-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.meta-item {
  display: flex;
  align-items: center;
  color: #ccc;
  font-size: 14px;
}

.meta-item i {
  margin-right: 5px;
  color: #ff5ea2;
}

.game-platform {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 15px;
}

.platform-badge {
  background-color: rgba(255, 94, 162, 0.1);
  color: #ff5ea2;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 12px;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 40px;
}

.pagination-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 5px;
  color: #fff;
  font-weight: 600;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(.disabled) {
  background-color: #ff5ea2;
  border-color: #ff5ea2;
}

.pagination-btn.active {
  background-color: #ff5ea2;
  border-color: #ff5ea2;
}

.pagination-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 991px) {
  .filter-wrapper {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    width: 100%;
  }
  
  .filter-options {
    width: 100%;
    justify-content: space-between;
  }
  
  .filter-item {
    flex: 1;
  }
  
  .filter-item select {
    width: 100%;
    min-width: auto;
  }
}

@media (max-width: 767px) {
  .page-title {
    font-size: 32px;
  }
  
  .filter-options {
    flex-direction: column;
  }
}
</style>