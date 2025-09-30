<template>
  <div class="container mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-8 text-center">Tournaments</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="tournament in tournaments" :key="tournament.id" class="bg-gray-800 rounded-lg overflow-hidden">
        <img :src="tournament.image || '/assets/img/tournament-placeholder.png'" :alt="tournament.name" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h3 class="text-xl font-bold mb-2">{{ tournament.name }}</h3>
          <div class="flex justify-between mb-2">
            <span class="text-gray-300">Game: {{ tournament.game }}</span>
            <span class="text-primary">{{ tournament.prize }}</span>
          </div>
          <p class="text-gray-400 mb-4">Date: {{ tournament.date }}</p>
          <div class="flex gap-2">
            <UButton color="primary" :to="`/tournaments-details?id=${tournament.id}`">Details</UButton>
            <UButton variant="outline">Join Now</UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['data-loader']
})

const apiStore = useApiStore()
const tournaments = computed(() => apiStore.tournaments)
</script>