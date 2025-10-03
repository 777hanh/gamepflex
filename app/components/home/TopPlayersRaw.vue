<template>
    <!-- top player section start  -->
    <section class="top-player-section pt-120 pb-120" id="top-player">
        <!-- sword animation -->
        <div class="sword-area">
            <img class="w-100" src="assets/img/sword.png" alt="sword" />
        </div>
        <div class="red-ball end-0"></div>
        <div class="container">
            <div class="row justify-content-between mb-15">
                <div class="col-sm-6">
                    <h2
                        class="display-four tcn-1 cursor-scale growUp title-anim"
                    >
                        Top Player
                    </h2>
                </div>
                <div class="col-sm-6 d-none d-sm-block">
                    <div
                        class="d-flex justify-content-end align-items-center gap-6"
                    >
                        <div
                            class="swiper-btn top-player-prev box-style"
                            data-ripple-center
                        >
                            <i class="ti ti-chevron-left fs-xl"></i>
                        </div>
                        <div
                            class="swiper-btn top-player-next box-style"
                            data-ripple-center
                        >
                            <i class="ti ti-chevron-right fs-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" id="sword-trigger">
                <div class="col">
                    <div
                        class="swiper swiper-top-player top-player-overflow-guard"
                    >
                        <div class="swiper-wrapper my-1">
                            <!-- Dynamic slides from player array -->
                            <div
                                v-for="(player, index) in allSlides"
                                :key="`player-${index}`"
                                class="swiper-slide"
                            >
                                <div
                                    class="player-card d-grid card-tilt gap-6 p-6"
                                    data-tilt
                                >
                                    <div
                                        class="player-info-area d-between w-100"
                                    >
                                        <div
                                            class="player-info d-flex align-items-center gap-4"
                                        >
                                            <div
                                                class="player-img position-relative"
                                            >
                                                <img
                                                    class="rounded-circle w-100"
                                                    :src="player.img"
                                                    alt="player"
                                                />
                                                <span
                                                    class="player-status position-absolute tcn-1 fs-xs d-center end-0 bottom-0"
                                                    >{{ player.rank }}</span
                                                >
                                            </div>
                                            <div>
                                                <h5
                                                    class="player-name tcn-1 title-anim mb-1"
                                                >
                                                    {{ player.name }}
                                                </h5>
                                                <span class="tcn-6 fs-sm">{{
                                                    player.role
                                                }}</span>
                                            </div>
                                        </div>
                                        <form action="#">
                                            <button
                                                class="follow-btn box-style"
                                            >
                                                <i
                                                    class="ti ti-user-plus fs-xl"
                                                ></i>
                                            </button>
                                        </form>
                                    </div>
                                    <div
                                        class="player-score-details d-flex align-items-center flex-wrap gap-3"
                                    >
                                        <div class="score">
                                            <h6 class="score-title tcn-6 mb-2">
                                                Score
                                            </h6>
                                            <ul
                                                class="d-flex align-items-center tcp-2 gap-1"
                                            >
                                                <li>
                                                    <i
                                                        class="ti ti-star-filled"
                                                    ></i>
                                                </li>
                                                <li>
                                                    <i
                                                        class="ti ti-star-filled"
                                                    ></i>
                                                </li>
                                                <li>
                                                    <i
                                                        class="ti ti-star-filled"
                                                    ></i>
                                                </li>
                                                <li>
                                                    <i
                                                        class="ti ti-star-half-filled"
                                                    ></i>
                                                </li>
                                                <li>
                                                    <i class="ti ti-star"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="rank">
                                            <h6 class="rank-title tcn-6 mb-2">
                                                Rank
                                            </h6>
                                            <span class="tcn-1 fs-sm">
                                                <i class="ti ti-diamond"></i>
                                                Diamond
                                            </span>
                                        </div>
                                        <div class="region">
                                            <h6 class="region-title tcn-6 mb-2">
                                                Region
                                            </h6>
                                            <span
                                                class="tcn-1 fs-sm text-uppercase"
                                            >
                                                {{ player.region }}
                                            </span>
                                        </div>
                                        <div class="team">
                                            <h6 class="team-title tcn-6 mb-2">
                                                Team
                                            </h6>
                                            <span
                                                class="tcs-1 fs-sm text-uppercase"
                                            >
                                                {{ player.team }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End dynamic slides -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- top player section end -->
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    if (import.meta.client) gsap.registerPlugin(ScrollTrigger);

    // Player data array for cleaner template (maintains raw fidelity)
    interface Player {
        id: number;
        name: string;
        role: string;
        img: string;
        rank: number;
        region: string;
        team: string;
    }

    const players: Player[] = [
        {
            id: 1,
            name: 'Jane Cooper',
            role: 'Duelist',
            img: 'assets/img/top-player1.png',
            rank: 1,
            region: 'EUW',
            team: 'fire'
        },
        {
            id: 2,
            name: 'Savannah Nguyen',
            role: 'Duelist',
            img: 'assets/img/top-player2.png',
            rank: 2,
            region: 'EUW',
            team: 'lft'
        },
        {
            id: 3,
            name: 'Guy Hawkins',
            role: 'Duelist',
            img: 'assets/img/top-player3.png',
            rank: 3,
            region: 'EUW',
            team: 'liqud'
        }
    ];

    // Repeat pattern for smooth loop (4x = 12 total slides)
    const allSlides = [
        ...players,
        ...players,
        ...players,
        ...players,
        ...players,
        ...players,
        ...players
    ];

    onMounted(() => {
        if (!import.meta.client) return;

        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;
        if (prefersReduced) return;

        // Wait for GSAP ScrollTrigger to be initialized
        setTimeout(() => {
            const topPlayerSection = document.getElementById('top-player');
            const swordArea =
                document.querySelector<HTMLElement>('.sword-area');

            if (!topPlayerSection || !swordArea) {
                console.error('Top Player section or Sword not found!');
                return;
            }

            console.log('Sword element found:', swordArea);

            // Scene 2: Sword rotates 180deg when #top-player appears
            gsap.to(swordArea, {
                rotate: '180deg',
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: topPlayerSection,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: 2,
                    markers: true,
                    onEnter: () =>
                        console.log('Sword rotation animation triggered!')
                }
            });
        }, 300);
    });
</script>

<style scoped>
    /* No scoped styles: global CSS handles visuals */
</style>
