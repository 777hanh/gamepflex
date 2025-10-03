<template>
    <section
        class="section-padding position-relative overflow-hidden"
        id="tournament-hero"
    >
        <!-- Diamond animation -->
        <div class="diamond-area">
            <svg
                class="w-100"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <polygon
                    points="50,10 80,40 50,90 20,40"
                    fill="rgba(0,200,255,0.3)"
                    stroke="rgba(0,200,255,0.6)"
                    stroke-width="2"
                />
                <polygon
                    points="50,10 80,40 50,50 20,40"
                    fill="rgba(0,200,255,0.5)"
                />
            </svg>
        </div>
        <!-- game console animation -->
        <div class="game-console-area">
            <svg
                class="w-100"
                viewBox="0 0 200 150"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="20"
                    y="30"
                    width="160"
                    height="90"
                    rx="10"
                    fill="rgba(255,140,0,0.2)"
                    stroke="rgba(255,140,0,0.5)"
                    stroke-width="2"
                />
                <rect
                    x="50"
                    y="50"
                    width="100"
                    height="50"
                    fill="rgba(0,0,0,0.5)"
                />
                <circle cx="165" cy="80" r="8" fill="rgba(255,140,0,0.6)" />
                <circle cx="145" cy="80" r="8" fill="rgba(0,200,255,0.6)" />
            </svg>
        </div>
        <div class="red-ball top-50"></div>
        <div class="tournaments-bg-art" aria-hidden="true" />
        <div class="container">
            <div class="section-header mb-5 text-center">
                <h2 class="display-5 fw-bold mb-3 text-white">
                    Live Tournaments
                </h2>
                <p class="text-muted lead">
                    Gia nhập ngay – tranh tài vì vinh quang & phần thưởng
                </p>
            </div>
            <div class="row g-4">
                <div v-for="t in tournaments" :key="t.id" class="col-lg-6">
                    <div
                        class="tournament-card magnetic-depth magnetic h-100 p-4"
                        data-aos="fade-up"
                        data-aos-duration="700"
                        :data-aos-delay="(t.id * 70) % 500"
                        data-depth-rot="16"
                        data-depth-trans="12"
                    >
                        <div class="d-flex align-items-center mb-4 gap-3">
                            <NuxtImg
                                :src="t.gameIcon"
                                :alt="t.game"
                                class="rounded shadow-sm"
                                width="64"
                                height="64"
                                format="webp"
                                densities="x1 x2"
                            />
                            <div>
                                <h4 class="mb-1 text-white">{{ t.name }}</h4>
                                <span class="text-muted small">{{
                                    t.game
                                }}</span>
                            </div>
                            <span class="badge bg-danger ms-auto px-3 py-2"
                                >LIVE</span
                            >
                        </div>
                        <div class="row mb-4 text-center">
                            <div class="col-6">
                                <span class="text-muted d-block small mb-1"
                                    >Prize Pool</span
                                >
                                <h5 class="text-warning mb-0">
                                    ${{ t.prizePool }}
                                </h5>
                            </div>
                            <div class="col-6">
                                <span class="text-muted d-block small mb-1"
                                    >Players</span
                                >
                                <h5 class="text-info mb-0">
                                    {{ t.players }}/{{ t.maxPlayers }}
                                </h5>
                            </div>
                        </div>
                        <div class="mb-4">
                            <div
                                class="d-flex justify-content-between small mb-2"
                            >
                                <span class="text-muted">Registration</span>
                                <span class="fw-semibold text-white"
                                    >{{
                                        Math.round(
                                            (t.players / t.maxPlayers) * 100
                                        )
                                    }}%</span
                                >
                            </div>
                            <div class="progress progress-thin">
                                <div
                                    class="progress-bar bg-accent"
                                    :style="{
                                        width:
                                            (t.players / t.maxPlayers) * 100 +
                                            '%'
                                    }"
                                />
                            </div>
                        </div>
                        <NuxtLink
                            :to="`/tournaments/${t.id}`"
                            class="btn btn-primary d-flex align-items-center justify-content-center magnetic w-100 gap-2"
                        >
                            <i class="fas fa-trophy" />
                            Tham gia ngay
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import gsap from 'gsap';
    import ScrollTrigger from 'gsap/ScrollTrigger';
    export interface LiveTournament {
        id: number;
        name: string;
        game: string;
        gameIcon: string;
        prizePool: string;
        players: number;
        maxPlayers: number;
    }
    // use underscore to avoid unused var lint error if not referenced directly
    const _props = defineProps<{ tournaments: LiveTournament[] }>();
    if (import.meta.client) {
        gsap.registerPlugin(ScrollTrigger);
        requestAnimationFrame(() => {
            const art = document.querySelector('.tournaments-bg-art');
            const section = document.getElementById('tournament-hero');
            if (!art || !section) return;
            gsap.fromTo(
                art,
                { scale: 1.1, opacity: 0.45 },
                {
                    scale: 0,
                    opacity: 0.05,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        end: 'bottom 40%',
                        scrub: true
                    }
                }
            );
        });
    }
</script>

<style scoped>
    .section-padding {
        padding: 90px 0;
    }
    .tournaments-bg-art {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1200px;
        height: 1200px;
        transform: translate(-50%, -50%);
        background: radial-gradient(
            circle at 50% 50%,
            rgba(255, 140, 0, 0.25),
            transparent 70%
        );
        pointer-events: none;
        z-index: 0;
    }

    /* Ensure GSAP animation elements are visible */
    :deep(.diamond-area),
    :deep(.game-console-area) {
        z-index: 1;
        pointer-events: none;
    }
    .tournament-card {
        background: linear-gradient(
            155deg,
            #1f2532 0%,
            #131821 60%,
            #101319 100%
        );
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 18px;
        position: relative;
    }
    .progress-thin {
        height: 8px;
        background: rgba(255, 255, 255, 0.07);
        border-radius: 4px;
        overflow: hidden;
    }
    .progress-bar {
        background: linear-gradient(90deg, #00c6ff, #0072ff);
    }
    .bg-accent {
        background: #00b4ff !important;
    }
</style>
