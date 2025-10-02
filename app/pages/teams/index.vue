<template>
  <div class="teams-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>Teams</h1>
          <p>Browse gaming teams and their achievements.</p>

          <div class="teams-grid">
            <div v-for="team in teams" :key="team.id" class="team-card">
              <h3>{{ team.name }}</h3>
              <p>{{ team.description }}</p>
              <NuxtLink :to="`/teams/${team.id}`" class="btn btn-primary">
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
const teams = ref([
  {
    id: "team-alpha",
    name: "Team Alpha",
    description: "Professional esports team competing in multiple tournaments.",
  },
  {
    id: "team-beta",
    name: "Team Beta",
    description: "Rising stars in the gaming community.",
  },
  {
    id: "team-gamma",
    name: "Team Gamma",
    description: "Veterans with years of competitive experience.",
  },
]);

useHead({
  title: "Teams - GamePlex",
  meta: [
    {
      name: "description",
      content: "Browse gaming teams and their achievements on GamePlex.",
    },
  ],
});
</script>

<style scoped>
.teams-page {
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

.teams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.team-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.team-card h3 {
  color: #fff;
  margin-bottom: 1rem;
}

.team-card p {
  color: #888;
  margin-bottom: 1.5rem;
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
