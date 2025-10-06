<template>
    <div class="w-full px-3 md:w-1/2 xl:w-1/3">
        <div class="tournament-card bgn-4 p-3 xl:p-4">
            <div class="tournament-img relative mb-8">
                <div class="img-area overflow-hidden">
                    <img
                        class="w-100"
                        :src="tournament.image"
                        alt="tournament"
                    />
                </div>
                <span class="card-status tcn-1 fs-sm absolute left-0 px-6 py-2">
                    <span class="dot-icon alt-icon ps-3">{{
                        tournament.status
                    }}</span>
                </span>
            </div>
            <div class="tournament-content px-0 sm:px-2 xl:px-4">
                <div class="tournament-info mb-5">
                    <NuxtLink
                        :to="`/tournaments/${tournament.id}`"
                        class="block"
                    >
                        <h4
                            class="tournament-title tcn-1 cursor-scale growDown title-anim mb-1"
                        >
                            {{ tournament.name }}
                        </h4>
                    </NuxtLink>
                    <p class="tcn-6 fs-sm truncate">{{ tournament.type }}</p>
                </div>
                <div class="hr-line line3"></div>
                <div class="card-info my-5 flex flex-wrap items-center gap-3">
                    <div
                        class="price-money bgn-3 flex h-full items-center gap-3 px-3 py-2"
                    >
                        <div class="flex items-center gap-2">
                            <img
                                class="w-full"
                                src="/assets/img/bitcoin.png"
                                alt="bitcoin"
                            />
                            <span class="tcn-1 fs-sm">{{
                                tournament.bitcoinAmount
                            }}</span>
                        </div>
                        <div class="v-line"></div>
                        <div class="flex items-center gap-2">
                            <img
                                class="w-100"
                                src="/assets/img/tether.png"
                                alt="tether"
                            />
                            <span class="tcn-1 fs-sm"
                                >${{ tournament.prizePool }}</span
                            >
                        </div>
                    </div>
                    <div
                        class="ticket-fee bgn-3 flex h-full items-center gap-1 px-3 py-2"
                    >
                        <Ticket class="fs-base tcp-2 h-4 w-4" />
                        <span class="tcn-1 fs-sm">{{
                            tournament.entryFee
                        }}</span>
                    </div>
                    <div
                        class="date-time bgn-3 flex h-full items-center gap-1 px-3 py-2"
                    >
                        <Calendar1Icon class="fs-base tcn-1 h-4 w-4" />
                        <span class="tcn-1 fs-sm">{{ tournament.date }}</span>
                    </div>
                </div>
                <div class="hr-line line3"></div>
                <div class="card-more-info d-between mt-6">
                    <div class="teams-info d-between gap-3 xl:gap-5">
                        <div class="teams flex items-center gap-1">
                            <Users class="fs-base h-4 w-4" />
                            <span class="tcn-6 fs-sm"
                                >{{ tournament.currentTeams }}/{{
                                    tournament.maxTeams
                                }}
                                Teams</span
                            >
                        </div>
                        <div class="player flex items-center gap-1">
                            <User class="fs-base h-4 w-4" />
                            <span class="tcn-6 fs-sm"
                                >{{ tournament.players }} Players</span
                            >
                        </div>
                    </div>
                    <NuxtLink
                        :to="`/tournaments/${tournament.id}`"
                        class="btn2"
                    >
                        <ArrowRight class="fs-2xl" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {
        ArrowRight,
        User,
        Users,
        Calendar1Icon,
        Ticket
    } from 'lucide-vue-next';

    export interface TournamentData {
        id: number;
        name: string;
        type: string;
        image: string;
        status: string;
        bitcoinAmount: number;
        prizePool: string;
        entryFee: string;
        date: string;
        currentTeams: number;
        maxTeams: number;
        players: number;
    }

    defineProps<{
        tournament: TournamentData;
    }>();
</script>

<style scoped>
    /* Ensure tournament images fit properly - matching source template */
    .tournament-img .img-area img {
        object-fit: cover;
        width: 100%;
    }
</style>
