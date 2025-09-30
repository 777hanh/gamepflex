<template>
  <header class="w-full">
    <div class="py-3 px-4 md:px-6 lg:px-8">
      <div class="flex items-center justify-between w-full">
        <nav class="flex items-center w-full">
          <div class="flex items-center gap-4">
            <UButton
              variant="ghost"
              icon="i-tabler-menu-2"
              class="lg:hidden"
              @click="isMenuOpen = !isMenuOpen"
            />
            <NuxtLink to="/" class="flex items-center gap-2">
              <UIcon name="i-tabler-brand-game" class="text-2xl text-primary" />
              <span class="text-xl font-bold">GamePlex</span>
            </NuxtLink>
          </div>
          
          <div :class="[
            'lg:flex items-center gap-6 ml-10',
            isMenuOpen ? 'absolute top-16 left-0 right-0 bg-gray-900 p-4 z-50' : 'hidden'
          ]">
            <ul class="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <li>
                <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
              </li>
              <li class="relative group">
                <button class="flex items-center gap-1 hover:text-primary">
                  Tournament
                  <UIcon name="i-tabler-chevron-down" class="text-sm" />
                </button>
                <ul class="hidden group-hover:block absolute top-full left-0 bg-gray-900 p-2 rounded min-w-40 z-10">
                  <li class="py-1">
                    <NuxtLink to="/tournaments" class="hover:text-primary block px-2 py-1">Tournaments</NuxtLink>
                  </li>
                  <li class="py-1">
                    <NuxtLink to="/tournaments-details" class="hover:text-primary block px-2 py-1">Tournaments Details</NuxtLink>
                  </li>
                </ul>
              </li>
              <li>
                <NuxtLink to="/game" class="hover:text-primary">Game</NuxtLink>
              </li>
              <li class="relative group">
                <button class="flex items-center gap-1 hover:text-primary">
                  Teams
                  <UIcon name="i-tabler-chevron-down" class="text-sm" />
                </button>
                <ul class="hidden group-hover:block absolute top-full left-0 bg-gray-900 p-2 rounded min-w-40 z-10">
                  <li class="py-1">
                    <NuxtLink to="/teams" class="hover:text-primary block px-2 py-1">Teams</NuxtLink>
                  </li>
                  <li class="py-1">
                    <NuxtLink to="/teams-details" class="hover:text-primary block px-2 py-1">Teams Details</NuxtLink>
                  </li>
                </ul>
              </li>
              <li class="relative group">
                <button class="flex items-center gap-1 hover:text-primary">
                  Pages
                  <UIcon name="i-tabler-chevron-down" class="text-sm" />
                </button>
                <ul class="hidden group-hover:block absolute top-full left-0 bg-gray-900 p-2 rounded min-w-40 z-10">
                  <li class="py-1">
                    <NuxtLink to="/signup" class="hover:text-primary block px-2 py-1">Sign Up</NuxtLink>
                  </li>
                  <li class="py-1">
                    <NuxtLink to="/signin" class="hover:text-primary block px-2 py-1">Sign In</NuxtLink>
                  </li>
                  <li class="py-1">
                    <NuxtLink to="/error" class="hover:text-primary block px-2 py-1">Error</NuxtLink>
                  </li>
                  <li class="py-1">
                    <NuxtLink to="/faq" class="hover:text-primary block px-2 py-1">FAQ</NuxtLink>
                  </li>
                  <li class="py-1">
                    <NuxtLink to="/terms-condition" class="hover:text-primary block px-2 py-1">Terms Conditions</NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        
        <div class="flex items-center gap-3">
          <UButton
            variant="solid"
            color="primary"
            class="rounded-full"
            icon="i-tabler-wallet"
          >
            <span class="hidden md:inline">Connect Wallet</span>
          </UButton>
          
          <UButton
            variant="ghost"
            icon="i-tabler-bell"
            class="rounded-full"
            @click="isNotificationOpen = !isNotificationOpen"
          />
          
          <div class="relative">
            <UButton
              variant="ghost"
              class="rounded-full"
              @click="isProfileOpen = !isProfileOpen"
            >
              <div class="flex items-center gap-2">
                <UAvatar
                  src="/assets/img/profile.png"
                  alt="Profile"
                  size="sm"
                />
                <span class="hidden lg:inline">David Malan</span>
                <UIcon name="i-tabler-chevron-down" class="hidden lg:block" />
              </div>
            </UButton>
            
            <div v-if="isProfileOpen" class="absolute top-full right-0 mt-2 bg-gray-900 p-2 rounded min-w-40 z-10">
              <NuxtLink to="/profile" class="block px-3 py-2 hover:bg-gray-800 rounded">Profile</NuxtLink>
              <button class="block w-full text-left px-3 py-2 hover:bg-gray-800 rounded">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Notification Panel -->
    <div v-if="isNotificationOpen" class="absolute right-4 top-16 bg-gray-900 p-4 rounded shadow-lg z-50 w-80">
      <div class="space-y-4">
        <div v-for="notification in notifications" :key="notification.id" class="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
          <UAvatar v-if="notification.avatar" :src="notification.avatar" size="sm" />
          <div>
            <p class="font-medium">{{ notification.title }}</p>
            <p class="text-sm text-gray-400">{{ notification.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const isMenuOpen = ref(false)
const isNotificationOpen = ref(false)
const isProfileOpen = ref(false)

const notifications = [
  { id: 1, title: 'Cristofer Dorwart', message: 'Winners The Last Game', avatar: '/assets/img/avatar1.png' },
  { id: 2, title: 'Piter Maio', message: 'Accept your challenge', avatar: '/assets/img/avatar2.png' },
  { id: 3, title: 'Copa Punto Gamer', message: 'Tournament start' },
  { id: 4, title: 'Daily Bonus', message: 'Tournament start' }
]
</script>