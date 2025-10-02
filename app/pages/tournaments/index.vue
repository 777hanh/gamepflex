<template>
  <div class="tournaments-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>Tournaments</h1>
          <p>Discover and join competitive gaming tournaments.</p>

          <div class="tournaments-grid">
            <div
              v-for="tournament in tournaments"
              :key="tournament.id"
              class="tournament-card"
            >
              <h3>{{ tournament.name }}</h3>
              <p>{{ tournament.description }}</p>
              <p class="tournament-date">Date: {{ tournament.date }}</p>
              <p class="tournament-prize">Prize: {{ tournament.prize }}</p>
              <NuxtLink
                :to="`/tournaments/${tournament.id}`"
                class="btn btn-primary"
              >
                View Details
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tournaments = ref([
  {
    id: "tournament-alpha",
    name: "Alpha Cup 2025",
    description: "Premier esports tournament with top teams competing.",
    date: "January 15, 2025",
    prize: "$50,000",
  },
  {
    id: "tournament-beta",
    name: "Beta Championship",
    description: "Regional championship for rising talent.",
    date: "February 20, 2025",
    prize: "$25,000",
  },
  {
    id: "tournament-gamma",
    name: "Gamma League Finals",
    description: "Season finale with the best teams.",
    date: "March 10, 2025",
    prize: "$100,000",
  },
]);

useHead({
  title: "Tournaments - GamePlex",
  meta: [
    {
      name: "description",
      content: "Discover and join competitive gaming tournaments on GamePlex.",
    },
  ],
});
</script>

<style scoped>
.tournaments-page {
  padding: 2rem 0;
  min-height: 70vh;
}

h1 {
  color: #fff;
  margin-bottom: 1rem;
}

p {
  color: #888;
  margin-bottom: 2rem;
}

.tournaments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.tournament-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tournament-card h3 {
  color: #fff;
  margin-bottom: 1rem;
}

.tournament-card p {
  color: #888;
  margin-bottom: 1rem;
}

.tournament-date {
  color: #007bff !important;
}

.tournament-prize {
  color: #28a745 !important;
  font-weight: bold;
}

.btn {
  padding: 12px 24px;
  background: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn:hover {
  background: #0056b3;
}
</style>
