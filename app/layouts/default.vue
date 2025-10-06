<template>
    <div>
        <LoadingOverlay v-if="isLoading" />
        <div v-else class="site-wrapper" data-app-root>
            <div class="grid-overlay" aria-hidden="true"></div>
            <AppHeader />
            <main class="main-content">
                <slot />
            </main>
            <AppFooter />
            <NotificationPanel
                :is-open="isNotificationOpen"
                @close="closeNotification"
            />
            <!-- custom cursor element -->
            <div class="cursor" aria-hidden="true"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useLoadingStore } from '~/stores/loading';
    import { onMounted, ref } from 'vue';
    import gsap from 'gsap';

    const loadingStore = useLoadingStore();
    const { isLoading } = storeToRefs(loadingStore);

    // Quản lý trạng thái thông báo
    const isNotificationOpen = ref(false);

    const openNotification = () => {
        isNotificationOpen.value = true;
    };

    const closeNotification = () => {
        isNotificationOpen.value = false;
    };

    // Cung cấp các phương thức thông báo cho toàn bộ ứng dụng
    const notificationMethods = {
        openNotification,
        closeNotification
    };

    // Cung cấp các phương thức thông báo cho các component khác
    provide('notification', notificationMethods);

    // REMOVED: Duplicate AOS/GSAP init - đã có trong plugins
    // Plugins sẽ tự động init, không cần init lại ở đây

    onMounted(() => {
        // Chỉ giữ lại minimal setup
        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (!prefersReduced) {
            // Simple fade-in cho page content
            gsap.fromTo(
                '.fade-in',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                }
            );
        }
    });

    onBeforeUnmount(() => {
        // Cleanup không cần thiết - ScrollTrigger tự quản lý
    });
</script>

<style>
    html,
    body {
        background-color: var(--gp-bg, #0f0f0f);
        color: var(--gp-fg, #ffffff);
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        overflow-y: auto;
        scroll-behavior: smooth;
    }

    :root {
        --gp-accent: #00b4ff;
        --gp-accent-soft: #2ecbff;
        --gp-bg-alt: #141a22;
        --gp-border: rgba(255, 255, 255, 0.08);
        --gp-focus: 0 0 0 3px rgba(0, 180, 255, 0.4);
    }

    .site-wrapper {
        /* Changed from position: fixed to position: relative */
        /* This allows normal window scroll for GSAP and AOS */
        position: relative;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        overflow-x: visible; /* Allow footer banner to show outside */
        overflow-y: visible; /* Let body handle vertical scroll */
    }

    .main-content {
        flex: 1;
    }

    /* Grid overlay */
    .grid-overlay {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        opacity: 0.12;
        mix-blend-mode: overlay;
        background-image:
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.05) 1px,
                transparent 1px
            );
        background-size:
            80px 80px,
            80px 80px;
    }

    /* Focus ring */
    :focus-visible {
        outline: none;
        box-shadow: var(--gp-focus);
        border-radius: 4px;
    }

    /* Smooth fade for route changes (optional hook with page transitions) */
    [data-app-root] {
        isolation: isolate;
    }

    /* Animation classes */
    .fade-in {
        opacity: 0;
    }

    .slide-up {
        transform: translateY(50px);
        opacity: 0;
        transition: all 0.6s ease;
    }

    .slide-up.active {
        transform: translateY(0);
        opacity: 1;
    }

    .slide-right {
        transform: translateX(-50px);
        opacity: 0;
        transition: all 0.6s ease;
    }

    .slide-right.active {
        transform: translateX(0);
        opacity: 1;
    }

    .slide-left {
        transform: translateX(50px);
        opacity: 0;
        transition: all 0.6s ease;
    }

    .slide-left.active {
        transform: translateX(0);
        opacity: 1;
    }

    /* Gradient text effect */
    .gradient-text {
        background: linear-gradient(to right, #ff5ea2, #f072b6);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    /* Button styles */
    .btn {
        display: inline-block;
        padding: 12px 30px;
        background: linear-gradient(to right, #ff5ea2, #f072b6);
        border-radius: 30px;
        color: #fff;
        font-weight: 600;
        text-align: center;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
    }

    .btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(255, 94, 162, 0.3);
    }

    .btn-outline {
        background: transparent;
        border: 2px solid #ff5ea2;
        color: #ff5ea2;
    }

    .btn-outline:hover {
        background: linear-gradient(to right, #ff5ea2, #f072b6);
        color: #fff;
    }

    /* Container */
    .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 15px;
    }

    /* Grid system */
    .row {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -15px;
    }

    [class*='col-'] {
        padding: 0 15px;
    }

    .col-xl-3 {
        width: 25%;
    }

    .col-lg-4 {
        width: 33.333333%;
    }

    .col-md-6 {
        width: 50%;
    }

    /* Responsive */
    @media (max-width: 1199px) {
        .col-xl-3 {
            width: 33.333333%;
        }
    }

    @media (max-width: 991px) {
        .col-xl-3,
        .col-lg-4 {
            width: 50%;
        }
    }

    @media (max-width: 767px) {
        .col-xl-3,
        .col-lg-4,
        .col-md-6 {
            width: 100%;
        }
    }
</style>
