<template>
  <div class="team-details">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>Team Details</h1>
          <p>Team ID: {{ $route.params.id }}</p>
          <NuxtLink to="/teams" class="btn btn-primary">Back to Teams</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

useHead({
  title: `Team ${route.params.id} - GamePlex`,
  meta: [
    {
      name: "description",
      content: `Team details for ${route.params.id}`,
    },
  ],
});
</script>

<style scoped>
.team-details {
  padding: 2rem 0;
  min-height: 50vh;
}

h1 {
  color: #fff;
  margin-bottom: 1rem;
}

p {
  color: #888;
  margin-bottom: 2rem;
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
