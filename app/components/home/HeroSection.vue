<template>
    <!-- Hero Section start  -->
    <section
        class="hero-section position-relative drag-none pt-20 pb-120 select-none"
    >
        <div class="gradient-bg"></div>
        <div class="gradient-bg2"></div>
        <div class="star-area">
            <div class="big-star drag-none">
                <img class="w-100" src="/assets/img/big-star.png" alt="star" />
            </div>
            <div class="small-star">
                <img
                    class="w-100"
                    src="/assets/img/small-star.png"
                    alt="star"
                />
            </div>
        </div>
        <div class="rotate-award">
            <img class="w-100" src="/assets/img/award.png" alt="award" />
        </div>
        <div class="container pt-120 pb-15">
            <div
                class="g-6 justify-content-between align-items-center relative grid grid-cols-6"
            >
                <!-- Left Content -->
                <div class="col-span-3">
                    <div class="hero-content">
                        <ul
                            class="fs-2xl fw-semibold heading-font list-icon title-anim mb-5 flex gap-3"
                        >
                            <li>Play</li>
                            <li>Earn</li>
                            <li>Enjoy</li>
                        </ul>
                        <h1
                            class="hero-title display-one tcn-1 cursor-scale growUp mb-10"
                        >
                            ULTIMATE
                            <span class="d-block tcp-1">GAMER'S</span>
                            HAVEN
                        </h1>
                        <a
                            href="https://www.youtube.com/watch?v=G5kzUpWAusI"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="drag-none btn-half-border bg-primary relative flex rounded-full px-4! py-3! select-none"
                            >Play Now</a
                        >
                    </div>
                </div>

                <!-- Center Hero Banner -->
                <div class="absolute inset-0 col-span-full text-center">
                    <div
                        class="hero-banner-area justify-content-center align-items-center relative flex w-full"
                    >
                        <div
                            class="hero-banner-bg flex items-center justify-center"
                        >
                            <img
                                class="drag-none h-full w-full object-contain"
                                src="/assets/img/bg-1.png"
                                alt="banner"
                            />
                        </div>
                        <div
                            class="hero-banner-img flex max-w-none items-center justify-center"
                        >
                            <img
                                class="drag-none h-full w-full object-contain"
                                src="/assets/img/hero.png"
                                alt="banner"
                            />
                        </div>
                    </div>

                    <!-- Last Winners Panel - Top Right -->
                    <div class="absolute top-0 right-0 flex flex-col gap-4">
                        <div
                            class="winners-panel-container z-10 w-auto rounded-4xl"
                        >
                            <div
                                class="card-area tilt rounded-[inherit] px-4 py-3 lg:px-8 lg:py-6"
                                data-tilt
                            >
                                <h6
                                    class="tcn-1 dot-icon cursor-scale growDown title-anim"
                                >
                                    Last Winners
                                </h6>
                                <div
                                    class="mb-6 h-[1px] w-full bg-white/10"
                                ></div>

                                <div class="card-items mt-4 grid gap-3">
                                    <div
                                        class="card-item flex items-center gap-3"
                                    >
                                        <div
                                            class="card-img-area rounded-circle overflow-hidden"
                                        >
                                            <img
                                                class="w-100"
                                                src="/assets/img/avatar1.png"
                                                alt="profile"
                                            />
                                        </div>
                                        <div class="flex flex-col items-start">
                                            <h6
                                                class="card-title fw-semibold tcn-1 cursor-scale growDown2 title-anim mb-0"
                                            >
                                                Cristofer Dorwart
                                            </h6>
                                            <p
                                                class="card-text tcs-1 fw-medium fs-sm mb-0"
                                            >
                                                +$220
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        class="mb-6 h-[1px] w-full bg-white/10"
                                    ></div>

                                    <div
                                        class="card-item flex items-center gap-3"
                                    >
                                        <div
                                            class="card-img-area rounded-circle overflow-hidden"
                                        >
                                            <img
                                                class="w-100"
                                                src="/assets/img/avatar2.png"
                                                alt="profile"
                                            />
                                        </div>
                                        <div class="flex flex-col items-start">
                                            <h6
                                                class="card-title fw-semibold tcn-1 cursor-scale growDown2 title-anim mb-0"
                                            >
                                                Cristofer Dorwart
                                            </h6>
                                            <p
                                                class="card-text tcs-1 fw-medium fs-sm mb-0"
                                            >
                                                +$220
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        class="mb-6 h-[1px] w-full bg-white/10"
                                    ></div>

                                    <div
                                        class="card-item flex items-center gap-3"
                                    >
                                        <div
                                            class="card-img-area rounded-circle overflow-hidden"
                                        >
                                            <img
                                                class="w-100"
                                                src="/assets/img/avatar3.png"
                                                alt="profile"
                                            />
                                        </div>
                                        <div class="flex flex-col items-start">
                                            <h6
                                                class="card-title fw-semibold tcn-1 cursor-scale growDown2 title-anim mb-0"
                                            >
                                                Cristofer Dorwart
                                            </h6>
                                            <p
                                                class="card-text tcs-1 fw-medium fs-sm mb-0"
                                            >
                                                +$220
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Active Players - Bottom Right -->
                        <div class="active-players-container rounded-lg">
                            <div
                                class="active-player-list flex flex-col items-center gap-3"
                            >
                                <ul class="player-lists flex items-center">
                                    <li
                                        class="-mr-3! overflow-hidden rounded-[50%]"
                                    >
                                        <img
                                            src="/assets/img/player1.png"
                                            alt="player"
                                        />
                                    </li>
                                    <li
                                        class="rounded-circle -mr-3! overflow-hidden"
                                    >
                                        <img
                                            src="/assets/img/player2.png"
                                            alt="player"
                                        />
                                    </li>
                                    <li
                                        class="rounded-circle -mr-3! overflow-hidden"
                                    >
                                        <img
                                            src="/assets/img/player3.png"
                                            alt="player"
                                        />
                                    </li>
                                    <li
                                        class="rounded-circle -mr-3! overflow-hidden"
                                    >
                                        <img
                                            src="/assets/img/player4.png"
                                            alt="player"
                                        />
                                    </li>
                                    <li
                                        class="rounded-circle heading-font fs-sm active-count overflow-hidden"
                                    >
                                        99+
                                    </li>
                                </ul>
                                <span
                                    class="tcn-1 dot-icon cursor-scale growDown2 fs-sm"
                                    >Active Players</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid-lines overflow-hidden">
            <div class="lines">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <div class="lines">
                <div class="line-vertical"></div>
                <div class="line-vertical"></div>
                <div class="line-vertical"></div>
                <div class="line-vertical"></div>
                <div class="line-vertical"></div>
                <div class="line-vertical"></div>
                <div class="line-vertical"></div>
                <div class="line-vertical"></div>
                <div class="line-vertical"></div>
                <div class="line-vertical"></div>
            </div>
        </div>
    </section>
    <!-- Hero Section end  -->
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';

    onMounted(() => {
        if (import.meta.client) {
            // Initialize tilt effect for cards
            if ((window as any).VanillaTilt) {
                const tiltElements = document.querySelectorAll('[data-tilt]');
                if (tiltElements.length > 0) {
                    (window as any).VanillaTilt.init(tiltElements, {
                        max: 5,
                        speed: 3000
                    });
                }
            }

            // Initialize GSAP animations if available
            setTimeout(() => {
                try {
                    if ((window as any).initGsapCounters) {
                        (window as any).initGsapCounters();
                    }
                } catch {
                    /* ignore */
                }
            }, 120);
        }
    });
</script>

<style scoped>
    /* Hero Section Styles - matching original design */
    .hero-section {
        background-blend-mode: multiply;
        padding-top: 30px;
    }

    /* Gradient backgrounds */
    .gradient-bg,
    .gradient-bg2 {
        position: absolute;
        width: 400px;
        height: 300px;
        transform: rotate(90deg);
        top: 0;
        left: 0;
        border-radius: 150px;
        background: linear-gradient(
            135deg,
            rgba(255, 217, 0, 0.3) 0%,
            rgba(255, 69, 0, 0.2) 100%
        );
        filter: blur(355.5px);
        z-index: -1;
    }

    .gradient-bg2 {
        left: unset;
        right: 0;
        background: rgba(77, 210, 255, 0.3);
    }

    /* Star animations */
    .star-area {
        position: absolute;
        top: 150px;
        right: 150px;
        max-width: 200px;
    }

    .star-area .big-star {
        max-width: 150px;
        animation: growUp 2s ease-in-out infinite;
    }

    .star-area .small-star {
        position: absolute;
        right: 0;
        max-width: 48px;
        animation: rotate 2s ease-in-out infinite;
    }

    /* Award animation */
    .rotate-award {
        position: absolute;
        bottom: 150px;
        right: 150px;
        max-width: 100px;
        animation: rotateY 3s ease-in-out infinite;
    }

    /* Hero content card */
    .card-area {
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
    }

    .card-area .card-item .card-img-area {
        max-width: 72px;
        max-height: 72px;
        border: 2px solid rgba(255, 255, 255, 0.1);
    }

    /* Active player list */
    .active-player-list .player-lists li {
        width: 36px;
        min-width: 36px;
        max-width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid rgba(255, 255, 255, 0.2);
        overflow: hidden;
    }

    .active-player-list .player-lists li.active-count {
        background: #ff6b35;
        border-color: rgba(255, 255, 255, 0.3);
        color: #fff;
        font-weight: bold;
        font-size: 0.7rem;
    }

    /* Hero banner - Center positioning */
    .hero-banner-area {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 600px;
        z-index: 1;
    }

    .hero-banner-area .hero-banner-bg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        opacity: 0.8;
    }

    .hero-banner-area .hero-banner-img {
        position: relative;
        height: auto;
        z-index: 2;
    }

    /* Winners panel positioning */
    /* .winners-panel-container {
        top: 10%;
        right: -20%;
        width: 280px;
        z-index: 10;
    } */

    .winners-panel-container .card-area {
        border: 1px solid rgba(255, 255, 255, 0.15);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(15px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .winners-panel-container .card-img-area {
        width: 40px;
        height: 40px;
        border: 2px solid rgba(255, 255, 255, 0.2);
    }

    .active-players-container .active-player-list {
        background: rgba(255, 255, 255, 0);
        padding: 8px 16px;
        border-radius: 25px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
    }

    /* Grid lines */
    .grid-lines {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -2;
    }

    .lines .line {
        position: absolute;
        width: 1px;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.1);
        z-index: -1;
    }

    .lines .line::after {
        content: '';
        display: block;
        position: absolute;
        height: 30px;
        width: 100%;
        top: 0%;
        left: 0;
        background: linear-gradient(
            to bottom,
            rgba(255, 217, 0, 0) 0%,
            #ffd900 75%,
            #ffd900 100%
        );
        animation: run 4s 0s infinite linear;
        animation-fill-mode: forwards;
    }

    .lines .line:nth-child(3n + 1)::after {
        top: unset;
        animation: run 3s 0s infinite linear;
    }

    .lines .line:nth-child(1) {
        left: 6%;
    }
    .lines .line:nth-child(2) {
        left: 12%;
    }
    .lines .line:nth-child(3) {
        left: 18%;
    }
    .lines .line:nth-child(4) {
        left: 24%;
    }
    .lines .line:nth-child(5) {
        left: 30%;
    }
    .lines .line:nth-child(6) {
        left: 36%;
    }
    .lines .line:nth-child(7) {
        left: 42%;
    }
    .lines .line:nth-child(8) {
        left: 48%;
    }
    .lines .line:nth-child(9) {
        left: 54%;
    }
    .lines .line:nth-child(10) {
        left: 60%;
    }
    .lines .line:nth-child(11) {
        left: 66%;
    }
    .lines .line:nth-child(12) {
        left: 72%;
    }
    .lines .line:nth-child(13) {
        left: 78%;
    }
    .lines .line:nth-child(14) {
        left: 84%;
    }
    .lines .line:nth-child(15) {
        left: 90%;
    }
    .lines .line:nth-child(16) {
        left: 96%;
    }

    .lines .line-vertical {
        position: absolute;
        width: 100%;
        height: 1px;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.1);
        z-index: -1;
    }

    .lines .line-vertical:nth-child(1) {
        top: 10%;
    }
    .lines .line-vertical:nth-child(2) {
        top: 20%;
    }
    .lines .line-vertical:nth-child(3) {
        top: 30%;
    }
    .lines .line-vertical:nth-child(4) {
        top: 40%;
    }
    .lines .line-vertical:nth-child(5) {
        top: 50%;
    }
    .lines .line-vertical:nth-child(6) {
        top: 60%;
    }
    .lines .line-vertical:nth-child(7) {
        top: 70%;
    }
    .lines .line-vertical:nth-child(8) {
        top: 80%;
    }
    .lines .line-vertical:nth-child(9) {
        top: 90%;
    }
    .lines .line-vertical:nth-child(10) {
        top: 100%;
    }

    /* Animations */
    @keyframes growUp {
        50% {
            transform: scale(1.2);
        }
    }

    @keyframes rotate {
        50% {
            transform: rotate(360deg);
        }
    }

    @keyframes rotateY {
        50% {
            transform: rotateY(180deg);
        }
    }

    @keyframes run {
        0% {
            top: -30px;
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            top: 100%;
            opacity: 0;
        }
    }

    /* Responsive design */
    @media (max-width: 1750px) {
        .star-area,
        .rotate-award {
            display: none;
        }
    }

    @media (max-width: 1399px) {
        .hero-banner-area .hero-banner-bg {
            width: 500px;
            height: 600px;
        }
        .hero-banner-area {
            min-height: 500px;
        }
        .winners-panel-container {
            right: -15%;
            width: 260px;
        }
    }

    @media (max-width: 1199px) {
        .hero-banner-area {
            min-height: 400px;
        }
        .hero-banner-area .hero-banner-bg {
            width: 400px;
            height: 500px;
        }
        .winners-panel-container {
            right: -10%;
            width: 240px;
        }
        .active-players-container {
            right: -10%;
        }
    }

    @media (max-width: 991px) {
        .lines .line:nth-child(2n) {
            display: none;
        }
        .hero-banner-area {
            min-height: 350px;
        }
        .hero-banner-area .hero-banner-bg {
            width: 350px;
            height: 400px;
        }
    }

    @media (max-width: 767px) {
        .lines .line-vertical:nth-child(2n) {
            display: none;
        }
        .winners-panel-container {
            position: static;
            width: 100%;
            margin-top: 2rem;
        }
        .active-players-container {
            position: static;
            margin-top: 1rem;
            text-align: center;
        }
        .active-players-container .active-player-list {
            justify-content: center;
        }
    }

    @media (max-width: 575px) {
        .hero-banner-area {
            min-height: 300px;
        }
        .hero-banner-area .hero-banner-bg {
            display: none;
        }
        .winners-panel-container .card-img-area {
            width: 35px;
            height: 35px;
        }
    }
</style>
