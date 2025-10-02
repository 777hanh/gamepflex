<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center mb-5">Tournaments</h1>

        <!-- Filters -->
        <div class="d-flex justify-content-center mb-4">
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-primary">All</button>
            <button type="button" class="btn btn-outline-primary">Live</button>
            <button type="button" class="btn btn-outline-primary">
              Upcoming
            </button>
            <button type="button" class="btn btn-outline-primary">
              Completed
            </button>
          </div>
        </div>

        <!-- Tournaments Grid -->
        <div class="row g-4">
          <div
            v-for="tournament in tournaments"
            :key="tournament.id"
            class="col-lg-4 col-md-6"
          >
            <div class="card h-100 shadow-sm">
              <img
                :src="tournament.image"
                class="card-img-top"
                :alt="tournament.name"
                style="height: 200px; object-fit: cover"
              />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ tournament.name }}</h5>
                <p class="card-text text-muted">{{ tournament.game }}</p>
                <p class="card-text small">
                  <i class="bi bi-calendar" /> {{ tournament.date }}
                </p>
                <p class="card-text small">
                  <i class="bi bi-trophy" /> Prize: {{ tournament.prize }}
                </p>
                <div class="mt-auto">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <small class="text-muted"
                      >{{ tournament.participants }} participants</small
                    >
                    <NuxtLink
                      :to="`/tournaments/${tournament.id}`"
                      class="btn btn-primary btn-sm"
                    >
                      View Details
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Sample tournament data
const tournaments = ref([
  {
    id: 1,
    name: "Championship Series",
    game: "League of Legends",
    date: "2024-02-15",
    prize: "$10,000",
    participants: 128,
    image:
      "https://via.placeholder.com/400x200/007bff/ffffff?text=LoL+Tournament",
  },
  {
    id: 2,
    name: "Pro Circuit",
    game: "Counter-Strike 2",
    date: "2024-02-20",
    prize: "$25,000",
    participants: 64,
    image:
      "https://via.placeholder.com/400x200/dc3545/ffffff?text=CS2+Tournament",
  },
  {
    id: 3,
    name: "World Cup",
    game: "Valorant",
    date: "2024-02-25",
    prize: "$50,000",
    participants: 256,
    image:
      "https://via.placeholder.com/400x200/28a745/ffffff?text=Valorant+Cup",
  },
  {
    id: 4,
    name: "Masters League",
    game: "Dota 2",
    date: "2024-03-01",
    prize: "$15,000",
    participants: 96,
    image:
      "https://via.placeholder.com/400x200/ffc107/000000?text=Dota+2+Masters",
  },
  {
    id: 5,
    name: "Ultimate Battle",
    game: "Overwatch 2",
    date: "2024-03-05",
    prize: "$20,000",
    participants: 80,
    image: "https://via.placeholder.com/400x200/6f42c1/ffffff?text=OW2+Battle",
  },
  {
    id: 6,
    name: "Summer Championship",
    game: "Rocket League",
    date: "2024-03-10",
    prize: "$8,000",
    participants: 144,
    image: "https://via.placeholder.com/400x200/fd7e14/ffffff?text=RL+Summer",
  },
]);

// SEO
useHead({
  title: "Tournaments - GamePlex",
  meta: [
    {
      name: "description",
      content:
        "Join exciting gaming tournaments and compete for amazing prizes",
    },
  ],
});
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.btn-group .btn {
  border-radius: 0;
}

.btn-group .btn:first-child {
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}

.btn-group .btn:last-child {
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}
</style>
