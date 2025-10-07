<template>
    <!-- tournament section start -->
    <section class="tournament-section" id="tournament-hero">
        <div class="tournament-wrapper">
            <div class="tournament-wrapper-border">
                <div class="container">
                    <div
                        class="mb-15 flex flex-wrap items-center justify-between gap-y-4 sm:gap-y-0"
                    >
                        <div class="w-full sm:w-2/3 md:w-1/2">
                            <h2
                                class="display-four tcn-1 cursor-scale growUp title-anim"
                            >
                                Tournaments
                            </h2>
                        </div>
                        <div class="w-full sm:w-1/3 sm:text-end md:w-1/2">
                            <NuxtLink
                                :to="routes.tournaments"
                                class="btn-half-border bg-primary relative inline-block rounded-full px-6 py-2"
                            >
                                View More
                            </NuxtLink>
                        </div>
                    </div>
                    <div
                        class="-mx-3 flex flex-wrap items-center justify-between"
                    >
                        <TournamentCard
                            v-for="tournament in tournaments"
                            :key="tournament.id"
                            :tournament="tournament"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- tournament section end -->
</template>

<script setup lang="ts">
    import { routes } from '~/constants';
    import type { TournamentData } from './TournamentCard.vue';
    import TournamentCard from './TournamentCard.vue';

    defineProps<{ tournaments: TournamentData[] }>();
</script>
