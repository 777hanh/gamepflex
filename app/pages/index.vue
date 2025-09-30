<template>
  <div>
    <!-- Hero Section with Video Background -->
    <section class="relative py-20 px-4 md:px-8 overflow-hidden">
      <div class="absolute inset-0 z-0 overflow-hidden">
        <video autoplay loop muted class="w-full h-full object-cover opacity-30">
          <source src="/assets/video/hero-bg.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
      </div>
      
      <div class="container mx-auto relative z-10">
        <div class="flex flex-col md:flex-row gap-8 items-center">
          <div class="w-full md:w-1/2" data-aos="fade-up">
            <div class="glitch-wrapper">
              <h1 class="text-4xl md:text-6xl font-bold mb-4 glitch" data-text="GamePlex">Welcome to <span class="text-primary">GamePlex</span></h1>
            </div>
            <p class="text-lg mb-6 text-gray-300">The ultimate gaming tournament platform for professional gamers and enthusiasts. Join thousands of players competing for glory and prizes.</p>
            <div class="flex flex-wrap gap-4">
              <UButton color="primary" size="lg" to="/tournaments" class="btn-glow">
                <i class="fas fa-trophy mr-2"></i> Explore Tournaments
              </UButton>
              <UButton variant="outline" size="lg" to="/register" class="btn-outline-glow">
                <i class="fas fa-user-plus mr-2"></i> Join Now
              </UButton>
            </div>
            
            <div class="mt-8 flex items-center">
              <div class="flex -space-x-2">
                <img v-for="(avatar, index) in userAvatars.slice(0, 4)" :key="index" :src="avatar" class="w-10 h-10 rounded-full border-2 border-gray-800" :alt="`User ${index + 1}`">
              </div>
              <p class="ml-4 text-sm text-gray-400"><span class="text-primary font-bold">{{ userAvatars.length }}+</span> gamers joined this week</p>
            </div>
          </div>
          <div class="w-full md:w-1/2 relative" data-aos="fade-left" data-aos-delay="200">
            <img src="/assets/img/hero.png" alt="Hero" class="w-full rounded-lg floating-element" />
            <div class="absolute -top-4 -right-4 bg-primary text-white text-sm px-4 py-2 rounded-full animate-pulse">
              Live Now!
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section with Animated Counters -->
    <section class="py-12 px-4 md:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
      <div class="container mx-auto">
        <div class="flex flex-wrap justify-between" data-aos="fade-up">
          <div class="text-center p-6 w-full sm:w-1/2 md:w-1/4 stat-card">
            <div class="stat-icon mb-4">
              <i class="fas fa-users text-4xl text-primary"></i>
            </div>
            <h3 class="text-4xl font-bold text-white mb-2" id="playerCount">0</h3>
            <p class="text-gray-300">Active Players</p>
          </div>
          <div class="text-center p-6 w-full sm:w-1/2 md:w-1/4 stat-card">
            <div class="stat-icon mb-4">
              <i class="fas fa-trophy text-4xl text-primary"></i>
            </div>
            <h3 class="text-4xl font-bold text-white mb-2" id="tournamentCount">0</h3>
            <p class="text-gray-300">Tournaments</p>
          </div>
          <div class="text-center p-6 w-full sm:w-1/2 md:w-1/4 stat-card">
            <div class="stat-icon mb-4">
              <i class="fas fa-coins text-4xl text-primary"></i>
            </div>
            <h3 class="text-4xl font-bold text-white mb-2" id="prizeCount">$0</h3>
            <p class="text-gray-300">Prize Pool</p>
          </div>
          <div class="text-center p-6 w-full sm:w-1/2 md:w-1/4 stat-card">
            <div class="stat-icon mb-4">
              <i class="fas fa-gamepad text-4xl text-primary"></i>
            </div>
            <h3 class="text-4xl font-bold text-white mb-2" id="gameCount">0</h3>
            <p class="text-gray-300">Games</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Tournaments with Hover Effects -->
    <section class="py-16 px-4 md:px-8 bg-gray-900">
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold" data-aos="fade-up">
            <span class="relative">
              Featured Tournaments
              <span class="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
            </span>
          </h2>
          <UButton to="/tournaments" variant="ghost" class="hidden md:flex items-center">
            View All <i class="fas fa-arrow-right ml-2"></i>
          </UButton>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(tournament, index) in featuredTournaments" :key="tournament.id" 
               class="tournament-card bg-gray-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-glow" 
               data-aos="fade-up" 
               :data-aos-delay="index * 100">
            <div class="relative">
              <img :src="tournament.image" :alt="tournament.name" class="w-full h-56 object-cover" />
              <div class="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 m-2 rounded-full">
                {{ tournament.status }}
              </div>
              <div class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                <div class="flex items-center">
                  <img :src="tournament.gameIcon" alt="Game Icon" class="w-8 h-8 rounded-full mr-2" />
                  <span class="text-sm text-gray-300">{{ tournament.game }}</span>
                </div>
              </div>
            </div>
            <div class="p-5">
              <h3 class="text-xl font-bold mb-3">{{ tournament.name }}</h3>
              <div class="flex justify-between mb-4">
                <div class="flex items-center">
                  <i class="fas fa-calendar-alt text-gray-400 mr-2"></i>
                  <span class="text-gray-300 text-sm">{{ tournament.date }}</span>
                </div>
                <div class="flex items-center">
                  <i class="fas fa-users text-gray-400 mr-2"></i>
                  <span class="text-gray-300 text-sm">{{ tournament.participants }}/{{ tournament.maxParticipants }}</span>
                </div>
              </div>
              <div class="flex justify-between items-center mb-4">
                <div>
                  <span class="text-xs text-gray-400">Prize Pool</span>
                  <div class="text-primary font-bold">{{ tournament.prize }}</div>
                </div>
                <div class="bg-gray-700 px-3 py-1 rounded-full text-xs">
                  <i class="fas fa-globe mr-1"></i> {{ tournament.region }}
                </div>
              </div>
              <UButton color="primary" block class="mt-2">
                <i class="fas fa-sign-in-alt mr-2"></i> Join Tournament
              </UButton>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-8 md:hidden" data-aos="fade-up">
          <UButton to="/tournaments" variant="outline">View All Tournaments</UButton>
        </div>
      </div>
    </section>

    <!-- Popular Games with Carousel -->
    <section class="py-16 px-4 md:px-8 bg-gray-800">
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold" data-aos="fade-up">
            <span class="relative">
              Popular Games
              <span class="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
            </span>
          </h2>
          <UButton to="/games" variant="ghost" class="hidden md:flex items-center">
            View All <i class="fas fa-arrow-right ml-2"></i>
          </UButton>
        </div>
        
        <div class="game-carousel" data-aos="fade-up">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(game, index) in popularGames" :key="game.id" 
                class="game-card bg-gray-900 rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-glow"
                :data-aos-delay="index * 100">
              <div class="relative">
                <img :src="game.image" :alt="game.name" class="w-full h-40 object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                <div class="absolute bottom-0 left-0 w-full p-4">
                  <h3 class="text-xl font-bold">{{ game.name }}</h3>
                </div>
              </div>
              <div class="p-4">
                <div class="flex justify-between mb-3">
                  <div class="flex items-center">
                    <i class="fas fa-users text-gray-400 mr-2"></i>
                    <span class="text-gray-300 text-sm">{{ game.players }} Players</span>
                  </div>
                  <div class="flex items-center">
                    <i class="fas fa-trophy text-gray-400 mr-2"></i>
                    <span class="text-gray-300 text-sm">{{ game.tournaments }} Tournaments</span>
                  </div>
                </div>
                <div class="flex items-center mb-4">
                  <div class="text-yellow-400 flex">
                    <i v-for="i in 5" :key="i" :class="[
                      'fas', 
                      i <= game.rating ? 'fa-star' : 'fa-star text-gray-600'
                    ]"></i>
                  </div>
                  <span class="text-gray-400 text-xs ml-2">({{ game.reviews }} reviews)</span>
                </div>
                <UButton color="primary" block>
                  <i class="fas fa-play mr-2"></i> Play Now
                </UButton>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-8 md:hidden" data-aos="fade-up">
          <UButton to="/games" variant="outline">View All Games</UButton>
        </div>
      </div>
    </section>

    <!-- Upcoming Events with Timeline -->
    <section class="py-16 px-4 md:px-8 bg-gray-900">
      <div class="container mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center" data-aos="fade-up">
          <span class="relative">
            Upcoming Events
            <span class="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-primary"></span>
          </span>
        </h2>
        
        <div class="relative event-timeline" data-aos="fade-up">
          <!-- Timeline Line -->
          <div class="absolute left-0 md:left-1/2 top-0 h-full w-1 bg-primary transform md:translate-x-[-50%] hidden md:block"></div>
          
          <div class="space-y-12">
            <div v-for="(event, index) in upcomingEvents" :key="event.id" 
                class="relative flex flex-col md:flex-row" 
                :class="{'md:flex-row-reverse': index % 2 !== 0}"
                data-aos="fade-up">
              
              <!-- Timeline Dot -->
              <div class="absolute left-0 md:left-1/2 top-0 w-5 h-5 rounded-full bg-primary border-4 border-gray-900 transform translate-x-[-50%] hidden md:block"></div>
              
              <!-- Content -->
              <div class="md:w-1/2 md:pr-12" :class="{'md:pl-12 md:pr-0': index % 2 !== 0}">
                <div class="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-primary transition-all duration-300">
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold">{{ event.name }}</h3>
                    <span class="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs">{{ event.type }}</span>
                  </div>
                  <p class="text-gray-400 mb-4">{{ event.description }}</p>
                  <div class="flex justify-between items-center">
                    <div class="flex items-center">
                      <i class="fas fa-calendar-alt text-gray-500 mr-2"></i>
                      <span class="text-gray-300">{{ event.date }}</span>
                    </div>
                    <UButton size="sm" color="primary">
                      <i class="fas fa-bell mr-2"></i> Remind Me
                    </UButton>
                  </div>
                </div>
              </div>
              
              <!-- Empty space for timeline alignment -->
              <div class="hidden md:block md:w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter & CTA -->
    <section class="py-16 px-4 md:px-8 bg-gradient-to-r from-primary/20 to-gray-900">
      <div class="container mx-auto">
        <div class="max-w-3xl mx-auto text-center" data-aos="fade-up">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p class="text-gray-300 mb-8">Subscribe to our newsletter for the latest tournaments, game releases, and exclusive offers.</p>
          
          <div class="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <UInput placeholder="Enter your email" class="flex-grow" size="lg" />
            <UButton color="primary" size="lg">Subscribe</UButton>
          </div>
          
          <div class="mt-8 flex justify-center space-x-6">
            <a href="#" class="text-gray-400 hover:text-primary transition-colors">
              <i class="fab fa-discord text-2xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-primary transition-colors">
              <i class="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-primary transition-colors">
              <i class="fab fa-twitch text-2xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-primary transition-colors">
              <i class="fab fa-youtube text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useApiStore } from '~/stores/api';
import { useAnimation } from '~/composables/useAnimation';
import type { Tournament, Game } from '~/types';

definePageMeta({
  middleware: ['data-loader']
});

const apiStore = useApiStore();

// Mock data for enhanced UI
const userAvatars = [
  '/assets/img/avatars/user1.jpg',
  '/assets/img/avatars/user2.jpg',
  '/assets/img/avatars/user3.jpg',
  '/assets/img/avatars/user4.jpg',
  '/assets/img/avatars/user5.jpg',
  '/assets/img/avatars/user6.jpg',
];

const featuredTournaments = ref([
  {
    id: 1,
    name: 'Valorant Champions Tour',
    game: 'Valorant',
    gameIcon: '/assets/img/games/valorant-icon.png',
    image: '/assets/img/tournaments/valorant-tournament.jpg',
    date: 'Aug 15 - Sep 10, 2023',
    prize: '$500,000',
    status: 'Registration Open',
    participants: 128,
    maxParticipants: 256,
    region: 'Global'
  },
  {
    id: 2,
    name: 'League of Legends World Cup',
    game: 'League of Legends',
    gameIcon: '/assets/img/games/lol-icon.png',
    image: '/assets/img/tournaments/lol-tournament.jpg',
    date: 'Sep 25 - Oct 30, 2023',
    prize: '$1,000,000',
    status: 'Coming Soon',
    participants: 64,
    maxParticipants: 64,
    region: 'International'
  },
  {
    id: 3,
    name: 'CS:GO Major Championship',
    game: 'Counter-Strike: Global Offensive',
    gameIcon: '/assets/img/games/csgo-icon.png',
    image: '/assets/img/tournaments/csgo-tournament.jpg',
    date: 'Jul 5 - Jul 15, 2023',
    prize: '$750,000',
    status: 'In Progress',
    participants: 24,
    maxParticipants: 24,
    region: 'Europe'
  }
]);

const popularGames = ref([
  {
    id: 1,
    name: 'Valorant',
    image: '/assets/img/games/valorant.jpg',
    players: '2.5M',
    tournaments: 350,
    rating: 5,
    reviews: 12453
  },
  {
    id: 2,
    name: 'League of Legends',
    image: '/assets/img/games/lol.jpg',
    players: '5M',
    tournaments: 820,
    rating: 4,
    reviews: 28764
  },
  {
    id: 3,
    name: 'Counter-Strike 2',
    image: '/assets/img/games/cs2.jpg',
    players: '1.8M',
    tournaments: 540,
    rating: 5,
    reviews: 18932
  },
  {
    id: 4,
    name: 'Fortnite',
    image: '/assets/img/games/fortnite.jpg',
    players: '3.2M',
    tournaments: 410,
    rating: 4,
    reviews: 15678
  }
]);

const upcomingEvents = ref([
  {
    id: 1,
    name: 'Summer Gaming Festival',
    type: 'Festival',
    description: 'Join us for the biggest gaming event of the summer with exclusive game reveals and tournaments.',
    date: 'July 15-20, 2023'
  },
  {
    id: 2,
    name: 'Pro League Season Finals',
    type: 'Tournament',
    description: 'Watch the top teams compete for the championship title and a share of the $200,000 prize pool.',
    date: 'August 5-7, 2023'
  },
  {
    id: 3,
    name: 'GamePlex Anniversary',
    type: 'Special Event',
    description: 'Celebrate our 5th anniversary with special tournaments, exclusive rewards, and legendary guests.',
    date: 'September 10, 2023'
  }
]);

// Animation utilities
const { animateCounter } = useAnimation();

// Parallax effect for hero image
const handleMouseMove = (e: MouseEvent) => {
  const elements = document.querySelectorAll('.floating-element');
  elements.forEach((element: Element) => {
    const htmlElement = element as HTMLElement;
    const speed = 0.05;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    htmlElement.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
};

onMounted(() => {
  // Initialize AOS animations
  if (process.client) {
    // @ts-ignore - AOS is loaded globally
    AOS.init({
      duration: 800,
      once: false,
      offset: 50,
      easing: 'ease-out-cubic'
    });
    
    // Animate counters with delay for better UX
    setTimeout(() => {
      animateCounter('#playerCount', 10000);
      animateCounter('#tournamentCount', 500);
      animateCounter('#prizeCount', 2000000, '$');
      animateCounter('#gameCount', 50);
    }, 500);

    // Add parallax effect
    document.addEventListener('mousemove', handleMouseMove);
  }
});

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('mousemove', handleMouseMove);
  }
});
</script>

<style scoped>
/* Floating animation */
.floating-element {
  animation: float 6s ease-in-out infinite;
  transition: transform 0.3s ease-out;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

/* Glowing buttons */
.btn-glow {
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(var(--color-primary-500), 0.7);
  transition: all 0.3s ease;
}

.btn-glow:hover {
  box-shadow: 0 0 20px rgba(var(--color-primary-500), 0.9);
}

.btn-outline-glow:hover {
  box-shadow: 0 0 15px rgba(var(--color-primary-500), 0.5);
}

/* Stats card hover effect */
.stat-card {
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-bottom: 3px solid var(--color-primary-500);
}

.stat-icon {
  transition: all 0.3s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.2);
}

/* Glitch effect for title */
.glitch-wrapper {
  position: relative;
  display: inline-block;
}

.glitch {
  position: relative;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.glitch::before {
  left: 2px;
  text-shadow: -1px 0 #ff00c1;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -1px 0 #00fff9;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim2 5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% { clip: rect(31px, 9999px, 94px, 0); }
  4.16666% { clip: rect(91px, 9999px, 43px, 0); }
  8.33333% { clip: rect(15px, 9999px, 67px, 0); }
  12.5% { clip: rect(25px, 9999px, 55px, 0); }
  16.66666% { clip: rect(75px, 9999px, 5px, 0); }
  20.83333% { clip: rect(45px, 9999px, 92px, 0); }
  25% { clip: rect(5px, 9999px, 29px, 0); }
  29.16666% { clip: rect(8px, 9999px, 83px, 0); }
  33.33333% { clip: rect(42px, 9999px, 97px, 0); }
  37.5% { clip: rect(56px, 9999px, 8px, 0); }
  41.66666% { clip: rect(69px, 9999px, 86px, 0); }
  45.83333% { clip: rect(10px, 9999px, 64px, 0); }
  50% { clip: rect(31px, 9999px, 88px, 0); }
  54.16666% { clip: rect(88px, 9999px, 14px, 0); }
  58.33333% { clip: rect(26px, 9999px, 48px, 0); }
  62.5% { clip: rect(67px, 9999px, 4px, 0); }
  66.66666% { clip: rect(44px, 9999px, 23px, 0); }
  70.83333% { clip: rect(63px, 9999px, 56px, 0); }
  75% { clip: rect(95px, 9999px, 72px, 0); }
  79.16666% { clip: rect(2px, 9999px, 23px, 0); }
  83.33333% { clip: rect(12px, 9999px, 76px, 0); }
  87.5% { clip: rect(63px, 9999px, 85px, 0); }
  91.66666% { clip: rect(89px, 9999px, 32px, 0); }
  95.83333% { clip: rect(10px, 9999px, 41px, 0); }
  100% { clip: rect(87px, 9999px, 3px, 0); }
}

@keyframes glitch-anim2 {
  0% { clip: rect(65px, 9999px, 100px, 0); }
  4.16666% { clip: rect(96px, 9999px, 43px, 0); }
  8.33333% { clip: rect(92px, 9999px, 6px, 0); }
  12.5% { clip: rect(23px, 9999px, 6px, 0); }
  16.66666% { clip: rect(54px, 9999px, 30px, 0); }
  20.83333% { clip: rect(59px, 9999px, 71px, 0); }
  25% { clip: rect(54px, 9999px, 96px, 0); }
  29.16666% { clip: rect(8px, 9999px, 63px, 0); }
  33.33333% { clip: rect(89px, 9999px, 44px, 0); }
  37.5% { clip: rect(89px, 9999px, 25px, 0); }
  41.66666% { clip: rect(54px, 9999px, 93px, 0); }
  45.83333% { clip: rect(21px, 9999px, 35px, 0); }
  50% { clip: rect(99px, 9999px, 78px, 0); }
  54.16666% { clip: rect(58px, 9999px, 23px, 0); }
  58.33333% { clip: rect(54px, 9999px, 67px, 0); }
  62.5% { clip: rect(23px, 9999px, 86px, 0); }
  66.66666% { clip: rect(10px, 9999px, 87px, 0); }
  70.83333% { clip: rect(37px, 9999px, 87px, 0); }
  75% { clip: rect(98px, 9999px, 32px, 0); }
  79.16666% { clip: rect(13px, 9999px, 9px, 0); }
  83.33333% { clip: rect(57px, 9999px, 98px, 0); }
  87.5% { clip: rect(29px, 9999px, 35px, 0); }
  91.66666% { clip: rect(74px, 9999px, 31px, 0); }
  95.83333% { clip: rect(44px, 9999px, 69px, 0); }
  100% { clip: rect(76px, 9999px, 67px, 0); }
}

/* Card hover effects */
.tournament-card:hover, .game-card:hover {
  box-shadow: 0 0 25px rgba(var(--color-primary-500), 0.4);
}

.shadow-glow {
  box-shadow: 0 0 20px rgba(var(--color-primary-500), 0.4);
}

/* Timeline animations */
.event-timeline .bg-primary {
  background: linear-gradient(to bottom, var(--color-primary-500), var(--color-primary-700));
}
</style>