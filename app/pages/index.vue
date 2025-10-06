<template>
    <div>
        <!-- <HeroSection id="hero" /> -->
        <!-- Raw cloned 3D swiper (phase 2 verification) -->
        <!-- <Swiper3DRaw /> -->
        <!-- <FeaturedGames id="featured-games" :games="featuredGames" /> -->
        <!-- <HomeNetflixCarousel id="netflix-carousel" /> -->
        <!-- Raw cloned Top Players (phase 2 verification) -->
        <!-- <TopPlayersRaw /> -->
        <!-- <LiveTournaments id="tournaments" :tournaments="liveTournaments" /> -->
        <!-- <GamesCarousel id="games-carousel" :games="featuredGames" /> -->
        <!-- <TopTeams id="top-teams" :teams="topTeams" /> -->
        <!-- <CallToAction id="cta" /> -->
    </div>
</template>

<script setup lang="ts">
    import { useInteractiveEffects } from '../composables/useInteractiveEffects';
    import { useHomeData } from '../composables/useHomeData';
    import HeroSection from '../components/home/HeroSection.vue';
    import FeaturedGames from '../components/home/FeaturedGames.vue';
    import LiveTournaments from '../components/home/LiveTournaments.vue';
    import TopTeams from '../components/home/TopTeams.vue';
    import CallToAction from '../components/home/CallToAction.vue';
    // Raw clone components
    import TopPlayersRaw from '../components/home/TopPlayersRaw.vue';
    import GamesCarousel from '../components/home/GamesCarousel.vue';
    import HomeNetflixCarousel from '~/components/home/NetflixCarousel.vue';
    import Swiper3DRaw from '~/components/home/Swiper3DRaw.vue';

    useHead({
        title: 'GamePlex - Ultimate Gaming Platform',
        meta: [
            {
                name: 'description',
                content:
                    'Join the ultimate gaming platform for tournaments, teams, and esports competitions.'
            }
        ]
    });

    const { featuredGames, liveTournaments, topTeams } = useHomeData();

    useInteractiveEffects();
</script>

<style scoped></style>
