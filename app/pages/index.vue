<template>
  <div>
    <HeroSection id="hero" />
    <FeaturedGames id="featured-games" :games="featuredGames" />
    <HomeNetflixCarousel id="netflix-carousel" />
    <TopPlayers id="top-players" :players="topPlayers" />
    <LiveTournaments id="tournaments" :tournaments="liveTournaments" />
    <GamesCarousel id="games-carousel" :games="featuredGames" />
    <TopTeams id="top-teams" :teams="topTeams" />
    <CallToAction id="cta" />
  </div>
</template>

<script setup lang="ts">
import { useInteractiveEffects } from "../composables/useInteractiveEffects";
import { useHomeData } from "../composables/useHomeData";
import HeroSection from "../components/home/HeroSection.vue";
import FeaturedGames from "../components/home/FeaturedGames.vue";
import LiveTournaments from "../components/home/LiveTournaments.vue";
import TopTeams from "../components/home/TopTeams.vue";
import CallToAction from "../components/home/CallToAction.vue";
import TopPlayers from "../components/home/TopPlayers.vue";
import GamesCarousel from "../components/home/GamesCarousel.vue";
import HomeNetflixCarousel from "~/components/home/NetflixCarousel.vue";

useHead({
  title: "GamePlex - Ultimate Gaming Platform",
  meta: [
    {
      name: "description",
      content:
        "Join the ultimate gaming platform for tournaments, teams, and esports competitions.",
    },
  ],
});

const { featuredGames, liveTournaments, topTeams, topPlayers } = useHomeData();

useInteractiveEffects();
</script>

<style scoped></style>
