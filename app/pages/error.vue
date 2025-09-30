<template>
  <div class="error-page">
    <div class="container">
      <div class="error-content" data-aos="fade-up">
        <div class="error-image">
          <img src="/assets/img/404.png" alt="404 Error">
        </div>
        <h1 class="error-title">Oops! Page Not Found</h1>
        <p class="error-text">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <div class="error-actions">
          <NuxtLink to="/" class="btn btn-primary">
            <i class="fas fa-home"></i> Back to Home
          </NuxtLink>
          <button class="btn btn-outline" @click="goBack">
            <i class="fas fa-arrow-left"></i> Go Back
          </button>
        </div>
        <div class="error-search">
          <p>Or try searching:</p>
          <div class="search-form">
            <input type="text" placeholder="Search...">
            <button type="submit">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useAnimation } from '~/composables/useAnimation';

// Animation
const { initAnimations, cleanupAnimations } = useAnimation();

// Go back function
const goBack = () => {
  window.history.length > 1 ? window.history.go(-1) : navigateTo('/');
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
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0a0a0a;
  padding: 60px 0;
}

.error-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.error-image {
  margin-bottom: 30px;
}

.error-image img {
  max-width: 100%;
  height: auto;
}

.error-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #fff;
  background: linear-gradient(90deg, #ff5ea2, #ff9966);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.error-text {
  font-size: 18px;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 30px;
}

.error-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
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

.error-search {
  margin-top: 30px;
}

.error-search p {
  font-size: 16px;
  color: #ccc;
  margin-bottom: 15px;
}

.search-form {
  display: flex;
  max-width: 400px;
  margin: 0 auto;
}

.search-form input {
  flex: 1;
  padding: 12px 15px;
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-right: none;
  border-radius: 8px 0 0 8px;
  color: #fff;
  font-size: 14px;
}

.search-form button {
  padding: 0 20px;
  background: linear-gradient(90deg, #ff5ea2, #ff9966);
  border: none;
  border-radius: 0 8px 8px 0;
  color: #fff;
  cursor: pointer;
}

@media (max-width: 767px) {
  .error-title {
    font-size: 28px;
  }
  
  .error-text {
    font-size: 16px;
  }
  
  .error-actions {
    flex-direction: column;
  }
  
  .search-form {
    flex-direction: column;
    gap: 10px;
  }
  
  .search-form input {
    border-radius: 8px;
    border-right: 1px solid #333;
  }
  
  .search-form button {
    border-radius: 8px;
  }
}
</style>