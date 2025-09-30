<template>
  <div class="game-details-page">
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
    </div>
    <div v-else-if="!game" class="error-container">
      <div class="container">
        <h2>Game not found</h2>
        <p>The game you're looking for doesn't exist or has been removed.</p>
        <NuxtLink to="/games" class="btn">Back to Games</NuxtLink>
      </div>
    </div>
    <template v-else>
      <!-- Hero Section -->
      <section class="game-hero" :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${game.coverImage || game.image})` }">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-8" data-aos="fade-right">
              <div class="game-hero-content">
                <div class="game-category">{{ game.category }}</div>
                <h1 class="game-title">{{ game.title }}</h1>
                <div class="game-meta">
                  <div class="meta-item">
                    <i class="fas fa-star"></i>
                    <span>{{ game.rating }} Rating</span>
                  </div>
                  <div class="meta-item">
                    <i class="fas fa-users"></i>
                    <span>{{ formatNumber(game.players) }} Players</span>
                  </div>
                  <div class="meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>{{ formatDate(game.releaseDate) }}</span>
                  </div>
                </div>
                <div class="game-platforms">
                  <span v-for="(platform, index) in game.platform" :key="index" class="platform-badge">
                    {{ platform }}
                  </span>
                </div>
                <div class="game-actions">
                  <button class="btn btn-primary">
                    <i class="fas fa-gamepad"></i> Play Now
                  </button>
                  <button class="btn btn-outline" @click="toggleFavorite">
                    <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i> 
                    {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
                  </button>
                </div>
              </div>
            </div>
            <div class="col-lg-4" data-aos="fade-left">
              <div class="game-thumbnail">
                <img :src="game.image" :alt="game.title">
                <div class="game-rating">
                  <i class="fas fa-star"></i>
                  <span>{{ game.rating }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Game Info Section -->
      <section class="game-info-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <!-- Game Description -->
              <div class="game-description card-dark" data-aos="fade-up">
                <h2>About {{ game.title }}</h2>
                <div class="description-content" v-html="game.description"></div>
              </div>

              <!-- Game Features -->
              <div class="game-features card-dark" data-aos="fade-up">
                <h2>Key Features</h2>
                <ul class="features-list">
                  <li v-for="(feature, index) in game.features" :key="index" data-aos="fade-up" :data-aos-delay="index * 100">
                    <i class="fas fa-check-circle"></i>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <!-- Game Screenshots -->
              <div class="game-screenshots card-dark" data-aos="fade-up">
                <h2>Screenshots</h2>
                <div class="screenshots-slider">
                  <div class="row">
                    <div v-for="(screenshot, index) in game.screenshots" :key="index" class="col-md-6 col-lg-4">
                      <div class="screenshot-item" data-aos="zoom-in" :data-aos-delay="index * 100">
                        <img :src="screenshot" :alt="`${game.title} Screenshot ${index + 1}`" @click="openLightbox(index)">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Game Reviews -->
              <div class="game-reviews card-dark" data-aos="fade-up">
                <h2>Player Reviews</h2>
                <div class="reviews-summary">
                  <div class="rating-big">
                    <span>{{ game.rating }}</span>
                    <div class="stars">
                      <i v-for="i in 5" :key="i" :class="i <= Math.floor(game.rating) ? 'fas fa-star' : (i - game.rating < 1 && i - game.rating > 0 ? 'fas fa-star-half-alt' : 'far fa-star')"></i>
                    </div>
                    <p>{{ game.reviews?.length || 0 }} Reviews</p>
                  </div>
                  <div class="rating-breakdown">
                    <div v-for="i in 5" :key="i" class="breakdown-item">
                      <span>{{ 6 - i }} stars</span>
                      <div class="progress">
                        <div class="progress-bar" :style="{ width: `${calculateRatingPercentage(6 - i)}%` }"></div>
                      </div>
                      <span>{{ countRatingsByStars(6 - i) }}</span>
                    </div>
                  </div>
                </div>
                <div class="reviews-list">
                  <div v-for="(review, index) in game.reviews" :key="index" class="review-item" data-aos="fade-up">
                    <div class="review-header">
                      <div class="reviewer-info">
                        <img :src="review.avatar || '/assets/img/avatar-placeholder.jpg'" :alt="review.username">
                        <div>
                          <h4>{{ review.username }}</h4>
                          <div class="review-stars">
                            <i v-for="i in 5" :key="i" :class="i <= review.rating ? 'fas fa-star' : 'far fa-star'"></i>
                          </div>
                        </div>
                      </div>
                      <div class="review-date">{{ formatDate(review.date) }}</div>
                    </div>
                    <div class="review-content">
                      <p>{{ review.comment }}</p>
                    </div>
                  </div>
                </div>
                <div class="write-review" data-aos="fade-up">
                  <h3>Write a Review</h3>
                  <div class="rating-select">
                    <span>Your Rating:</span>
                    <div class="stars-select">
                      <i v-for="i in 5" :key="i" 
                         :class="i <= userRating ? 'fas fa-star' : 'far fa-star'"
                         @click="userRating = i"></i>
                    </div>
                  </div>
                  <div class="form-group">
                    <textarea v-model="userReview" placeholder="Write your review here..." rows="4"></textarea>
                  </div>
                  <button class="btn" @click="submitReview">Submit Review</button>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <!-- Game Details Sidebar -->
              <div class="game-sidebar">
                <!-- Developer Info -->
                <div class="sidebar-widget card-dark" data-aos="fade-left">
                  <h3>Developer</h3>
                  <div class="developer-info">
                    <img :src="game.developer?.logo || '/assets/img/developer-placeholder.jpg'" :alt="game.developer?.name">
                    <div>
                      <h4>{{ game.developer?.name }}</h4>
                      <p>{{ game.developer?.games || 0 }} games published</p>
                    </div>
                  </div>
                </div>

                <!-- Game Details -->
                <div class="sidebar-widget card-dark" data-aos="fade-left">
                  <h3>Game Details</h3>
                  <ul class="details-list">
                    <li>
                      <span>Release Date:</span>
                      <span>{{ formatDate(game.releaseDate) }}</span>
                    </li>
                    <li>
                      <span>Genre:</span>
                      <span>{{ game.category }}</span>
                    </li>
                    <li>
                      <span>Platforms:</span>
                      <span>{{ game.platform.join(', ') }}</span>
                    </li>
                    <li>
                      <span>Players:</span>
                      <span>{{ formatNumber(game.players) }}</span>
                    </li>
                    <li>
                      <span>Age Rating:</span>
                      <span>{{ game.ageRating || 'Everyone' }}</span>
                    </li>
                    <li>
                      <span>File Size:</span>
                      <span>{{ game.fileSize || 'N/A' }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Similar Games -->
                <div class="sidebar-widget card-dark" data-aos="fade-left">
                  <h3>Similar Games</h3>
                  <div class="similar-games">
                    <div v-for="(similarGame, index) in similarGames" :key="index" class="similar-game-item">
                      <img :src="similarGame.image" :alt="similarGame.title">
                      <div class="similar-game-info">
                        <h4>{{ similarGame.title }}</h4>
                        <div class="similar-game-meta">
                          <span><i class="fas fa-star"></i> {{ similarGame.rating }}</span>
                          <span><i class="fas fa-gamepad"></i> {{ similarGame.category }}</span>
                        </div>
                        <NuxtLink :to="`/games/${similarGame.id}`" class="btn btn-sm">View</NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Lightbox for Screenshots -->
      <div class="lightbox" v-if="lightboxOpen" @click="closeLightbox">
        <div class="lightbox-content">
          <button class="lightbox-close" @click.stop="closeLightbox"><i class="fas fa-times"></i></button>
          <button class="lightbox-prev" @click.stop="prevImage" v-if="game.screenshots.length > 1"><i class="fas fa-chevron-left"></i></button>
          <img :src="game.screenshots[currentScreenshot]" :alt="`${game.title} Screenshot ${currentScreenshot + 1}`">
          <button class="lightbox-next" @click.stop="nextImage" v-if="game.screenshots.length > 1"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useApiStore } from '~/stores/api';
import { Game, Review } from '~/services/api';
import { useAnimation } from '~/composables/useAnimation';

definePageMeta({
  middleware: ['data-loader']
});

// Route params
const route = useRoute();
const gameId = route.params.id as string;

// Store
const apiStore = useApiStore();

// State
const loading = ref(true);
const game = ref<Game | null>(null);
const isFavorite = ref(false);
const userRating = ref(0);
const userReview = ref('');
const lightboxOpen = ref(false);
const currentScreenshot = ref(0);

// Animation
const { initAnimations, cleanupAnimations } = useAnimation();

// Lấy dữ liệu game từ API
const fetchGame = async () => {
  loading.value = true;
  try {
    // Trong thực tế, sẽ gọi API để lấy dữ liệu game theo ID
    // Ở đây, chúng ta sẽ lấy từ store để giả lập
    const foundGame = apiStore.games.find(g => g.id === gameId);
    if (foundGame) {
      game.value = {
        ...foundGame,
        coverImage: foundGame.image, // Giả sử có thêm ảnh cover
        description: `
          <p>${foundGame.title} is an exciting game that offers players an immersive experience in a ${foundGame.category} world. With stunning graphics and engaging gameplay, it has quickly become one of the most popular games on our platform.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
          <p>Dive into a world of adventure and challenge yourself with various quests and missions. Compete with players from around the world and climb the leaderboards.</p>
        `,
        features: [
          'Immersive gameplay experience',
          'Stunning high-definition graphics',
          'Multiplayer support for up to 64 players',
          'Regular content updates and events',
          'Cross-platform compatibility',
          'Custom character creation'
        ],
        screenshots: [
          foundGame.image,
          '/assets/img/game-screenshot-1.jpg',
          '/assets/img/game-screenshot-2.jpg',
          '/assets/img/game-screenshot-3.jpg',
          '/assets/img/game-screenshot-4.jpg'
        ],
        reviews: generateMockReviews(),
        developer: {
          name: 'GamePlex Studios',
          logo: '/assets/img/developer-logo.png',
          games: 12
        },
        ageRating: 'Teen',
        fileSize: '4.2 GB'
      };
    }
  } catch (error) {
    console.error('Error fetching game:', error);
  } finally {
    loading.value = false;
  }
};

// Tạo reviews giả
function generateMockReviews(): Review[] {
  return [
    {
      id: '1',
      username: 'GamerPro123',
      avatar: '/assets/img/avatar-1.jpg',
      rating: 5,
      comment: 'This game is absolutely amazing! The graphics are stunning and the gameplay is so immersive. I can\'t stop playing it!',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    {
      id: '2',
      username: 'CasualGamer',
      avatar: '/assets/img/avatar-2.jpg',
      rating: 4,
      comment: 'Really enjoying this game so far. The controls are intuitive and the story is engaging. Would recommend to friends.',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
    },
    {
      id: '3',
      username: 'GameCritic',
      avatar: '/assets/img/avatar-3.jpg',
      rating: 3,
      comment: 'Decent game with some interesting mechanics, but there are a few bugs that need to be fixed. The developer seems to be actively working on improvements though.',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago
    }
  ];
}

// Tính phần trăm đánh giá theo số sao
const calculateRatingPercentage = (stars: number): number => {
  if (!game.value || !game.value.reviews || game.value.reviews.length === 0) return 0;
  const count = countRatingsByStars(stars);
  return (count / game.value.reviews.length) * 100;
};

// Đếm số lượng đánh giá theo số sao
const countRatingsByStars = (stars: number): number => {
  if (!game.value || !game.value.reviews) return 0;
  return game.value.reviews.filter(review => Math.round(review.rating) === stars).length;
};

// Lấy danh sách game tương tự
const similarGames = computed(() => {
  if (!game.value) return [];
  return apiStore.games
    .filter(g => g.id !== gameId && g.category === game.value?.category)
    .slice(0, 3);
});

// Format số
const formatNumber = (num: number): string => {
  return num > 1000 ? (num / 1000).toFixed(1) + 'k' : num.toString();
};

// Format ngày
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Toggle yêu thích
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  // Trong thực tế, sẽ gọi API để cập nhật trạng thái yêu thích
};

// Gửi đánh giá
const submitReview = () => {
  if (userRating.value === 0) {
    alert('Please select a rating');
    return;
  }
  if (!userReview.value.trim()) {
    alert('Please write a review');
    return;
  }
  
  // Trong thực tế, sẽ gọi API để gửi đánh giá
  if (game.value && game.value.reviews) {
    game.value.reviews.unshift({
      id: Date.now().toString(),
      username: 'You',
      avatar: '/assets/img/avatar-you.jpg',
      rating: userRating.value,
      comment: userReview.value,
      date: new Date().toISOString()
    });
    
    // Reset form
    userRating.value = 0;
    userReview.value = '';
    
    // Recalculate game rating
    if (game.value.reviews.length > 0) {
      const totalRating = game.value.reviews.reduce((sum, review) => sum + review.rating, 0);
      game.value.rating = parseFloat((totalRating / game.value.reviews.length).toFixed(1));
    }
  }
};

// Lightbox functions
const openLightbox = (index: number) => {
  currentScreenshot.value = index;
  lightboxOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  document.body.style.overflow = '';
};

const nextImage = (e: Event) => {
  e.stopPropagation();
  if (!game.value) return;
  currentScreenshot.value = (currentScreenshot.value + 1) % game.value.screenshots.length;
};

const prevImage = (e: Event) => {
  e.stopPropagation();
  if (!game.value) return;
  currentScreenshot.value = (currentScreenshot.value - 1 + game.value.screenshots.length) % game.value.screenshots.length;
};

// Keyboard navigation for lightbox
const handleKeyDown = (e: KeyboardEvent) => {
  if (!lightboxOpen.value) return;
  
  switch (e.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowRight':
      if (game.value) nextImage(new Event('keydown'));
      break;
    case 'ArrowLeft':
      if (game.value) prevImage(new Event('keydown'));
      break;
  }
};

// Lifecycle hooks
onMounted(() => {
  fetchGame();
  document.addEventListener('keydown', handleKeyDown);
  initAnimations();
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
  cleanupAnimations();
});
</script>

<style scoped>
/* Game Hero Section */
.game-hero {
  padding: 120px 0 80px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.game-hero-content {
  color: #fff;
}

.game-category {
  display: inline-block;
  background-color: rgba(255, 94, 162, 0.2);
  color: #ff5ea2;
  padding: 5px 15px;
  border-radius: 30px;
  font-size: 14px;
  margin-bottom: 15px;
}

.game-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
}

.game-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  color: #ccc;
}

.meta-item i {
  margin-right: 8px;
  color: #ff5ea2;
}

.game-platforms {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.platform-badge {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 5px 15px;
  border-radius: 5px;
  font-size: 14px;
}

.game-actions {
  display: flex;
  gap: 15px;
}

.game-thumbnail {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.game-thumbnail img {
  width: 100%;
  height: auto;
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

/* Game Info Section */
.game-info-section {
  padding: 60px 0;
}

.card-dark {
  background-color: #1a1a1a;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.game-description h2,
.game-features h2,
.game-screenshots h2,
.game-reviews h2 {
  font-size: 24px;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 15px;
}

.game-description h2::after,
.game-features h2::after,
.game-screenshots h2::after,
.game-reviews h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #ff5ea2, #ff9966);
}

.description-content {
  color: #ccc;
  line-height: 1.7;
}

.description-content p {
  margin-bottom: 15px;
}

/* Features List */
.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  color: #ccc;
}

.features-list li i {
  color: #ff5ea2;
  margin-right: 10px;
  margin-top: 3px;
}

/* Screenshots */
.screenshots-slider {
  margin: 0 -10px;
}

.screenshot-item {
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.screenshot-item:hover {
  transform: scale(1.05);
}

.screenshot-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

/* Reviews */
.reviews-summary {
  display: flex;
  margin-bottom: 30px;
  gap: 30px;
}

.rating-big {
  text-align: center;
  padding: 20px;
  background-color: rgba(255, 94, 162, 0.1);
  border-radius: 10px;
  min-width: 150px;
}

.rating-big span {
  font-size: 48px;
  font-weight: 700;
  color: #ff5ea2;
}

.rating-big .stars {
  margin: 10px 0;
  color: #f1c40f;
}

.rating-big p {
  color: #ccc;
  margin: 0;
}

.rating-breakdown {
  flex: 1;
}

.breakdown-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.breakdown-item span {
  width: 60px;
  color: #ccc;
}

.breakdown-item span:last-child {
  width: 30px;
  text-align: right;
}

.breakdown-item .progress {
  flex: 1;
  height: 8px;
  background-color: #333;
  border-radius: 4px;
  margin: 0 10px;
  overflow: hidden;
}

.breakdown-item .progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #ff5ea2, #ff9966);
}

.reviews-list {
  margin-bottom: 30px;
}

.review-item {
  border-bottom: 1px solid #333;
  padding: 20px 0;
}

.review-item:last-child {
  border-bottom: none;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.reviewer-info {
  display: flex;
  align-items: center;
}

.reviewer-info img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
}

.reviewer-info h4 {
  margin: 0 0 5px;
  font-size: 16px;
}

.review-stars {
  color: #f1c40f;
  font-size: 14px;
}

.review-date {
  color: #999;
  font-size: 14px;
}

.review-content p {
  color: #ccc;
  margin: 0;
}

.write-review h3 {
  font-size: 20px;
  margin-bottom: 20px;
}

.rating-select {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.rating-select span {
  margin-right: 15px;
  color: #ccc;
}

.stars-select {
  color: #f1c40f;
  font-size: 24px;
  cursor: pointer;
}

.stars-select i {
  margin-right: 5px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group textarea {
  width: 100%;
  padding: 15px;
  background-color: #222;
  border: 1px solid #333;
  border-radius: 5px;
  color: #fff;
  resize: vertical;
}

/* Sidebar */
.game-sidebar {
  position: sticky;
  top: 30px;
}

.sidebar-widget {
  margin-bottom: 30px;
}

.sidebar-widget h3 {
  font-size: 20px;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
}

.sidebar-widget h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #ff5ea2, #ff9966);
}

.developer-info {
  display: flex;
  align-items: center;
}

.developer-info img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 15px;
  object-fit: cover;
}

.developer-info h4 {
  margin: 0 0 5px;
  font-size: 16px;
}

.developer-info p {
  color: #ccc;
  margin: 0;
}

.details-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.details-list li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #333;
  color: #ccc;
}

.details-list li:last-child {
  border-bottom: none;
}

.details-list li span:first-child {
  color: #999;
}

.similar-games {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.similar-game-item {
  display: flex;
  background-color: #222;
  border-radius: 8px;
  overflow: hidden;
}

.similar-game-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.similar-game-info {
  padding: 10px;
  flex: 1;
}

.similar-game-info h4 {
  font-size: 16px;
  margin: 0 0 5px;
}

.similar-game-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #ccc;
}

.similar-game-meta i {
  color: #ff5ea2;
}

/* Lightbox */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}

.lightbox-close,
.lightbox-prev,
.lightbox-next {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.lightbox-close:hover,
.lightbox-prev:hover,
.lightbox-next:hover {
  background-color: rgba(255, 94, 162, 0.8);
}

.lightbox-close {
  top: -50px;
  right: 0;
}

.lightbox-prev {
  left: -60px;
  top: 50%;
  transform: translateY(-50%);
}

.lightbox-next {
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
}

/* Loading */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 94, 162, 0.3);
  border-radius: 50%;
  border-top-color: #ff5ea2;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error */
.error-container {
  text-align: center;
  padding: 100px 0;
}

/* Responsive */
@media (max-width: 991px) {
  .game-title {
    font-size: 36px;
  }
  
  .reviews-summary {
    flex-direction: column;
  }
  
  .game-sidebar {
    margin-top: 30px;
    position: static;
  }
  
  .lightbox-prev {
    left: 20px;
  }
  
  .lightbox-next {
    right: 20px;
  }
}

@media (max-width: 767px) {
  .game-hero {
    padding: 80px 0 40px;
  }
  
  .game-title {
    font-size: 28px;
  }
  
  .game-actions {
    flex-direction: column;
  }
  
  .game-thumbnail {
    margin-top: 30px;
  }
  
  .screenshot-item img {
    height: 120px;
  }
}
</style>