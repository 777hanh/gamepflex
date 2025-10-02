<template>
    <header
        class="app-header relative w-full"
        :class="{ 'is-scrolled': isScrolled }"
        data-header
    >
        <div class="px-4 py-3 md:px-6 lg:px-8">
            <div class="flex w-full items-center justify-between">
                <!-- Left: Logo + Mobile Toggle -->
                <div
                    class="header-left flex items-center gap-4"
                    data-header-left
                >
                    <UButton
                        variant="ghost"
                        icon="i-tabler-menu-2"
                        class="lg:hidden"
                        @click="isMenuOpen = !isMenuOpen"
                    />
                    <NuxtLink to="/" class="flex items-center gap-2">
                        <UIcon
                            name="i-tabler-brand-game"
                            class="text-primary text-2xl"
                        />
                        <span class="text-xl font-bold">GamePlex</span>
                    </NuxtLink>
                </div>
                <!-- Center: Navigation -->
                <nav
                    :class="[
                        'main-nav ml-10 items-center gap-6 lg:flex',
                        isMenuOpen
                            ? 'absolute top-16 right-0 left-0 z-50 bg-gray-900 p-4'
                            : 'hidden'
                    ]"
                    data-main-nav
                >
                    <ul class="flex flex-col gap-4 lg:flex-row lg:gap-6">
                        <li>
                            <NuxtLink
                                to="/"
                                :class="linkClass('hero')"
                                @click.prevent="scrollToSection('hero')"
                                >Home</NuxtLink
                            >
                        </li>
                        <li>
                            <UDropdownMenu
                                :items="tournamentItems"
                                :content="{
                                    align: 'start',
                                    side: 'bottom'
                                }"
                                :ui="{
                                    content: 'w-58'
                                }"
                            >
                                <button
                                    class="flex items-center gap-1"
                                    :class="linkClass('tournaments')"
                                >
                                    Tournament
                                    <UIcon
                                        name="i-tabler-chevron-down"
                                        class="text-sm"
                                    />
                                </button>
                            </UDropdownMenu>
                        </li>
                        <li>
                            <a
                                href="#featured-games"
                                :class="linkClass('featured-games')"
                                @click.prevent="
                                    scrollToSection('featured-games')
                                "
                                >Games</a
                            >
                        </li>
                        <li>
                            <a
                                href="#top-teams"
                                :class="linkClass('top-teams')"
                                @click.prevent="scrollToSection('top-teams')"
                                >Teams</a
                            >
                        </li>
                        <li>
                            <a
                                href="#tournaments"
                                :class="linkClass('tournaments')"
                                @click.prevent="scrollToSection('tournaments')"
                                >Tournaments</a
                            >
                        </li>
                        <li>
                            <a
                                href="#top-players"
                                :class="linkClass('top-players')"
                                @click.prevent="scrollToSection('top-players')"
                                >Players</a
                            >
                        </li>
                        <li>
                            <UDropdownMenu
                                :items="pageItems"
                                :content="{
                                    align: 'start',
                                    side: 'bottom'
                                }"
                                :ui="{
                                    content: 'w-[200px]'
                                }"
                            >
                                <button
                                    class="flex items-center gap-1"
                                    :class="linkClass('pages')"
                                >
                                    Pages
                                    <UIcon
                                        name="i-tabler-chevron-down"
                                        class="text-sm"
                                    />
                                </button>
                            </UDropdownMenu>
                        </li>
                    </ul>
                </nav>
                <!-- Right: Actions -->
                <div
                    class="header-actions flex items-center gap-3"
                    data-header-actions
                >
                    <UButton
                        variant="ghost"
                        icon="i-tabler-bell"
                        class="rounded-full"
                        @click="isNotificationOpen = !isNotificationOpen"
                    />
                    <div class="relative">
                        <UButton
                            variant="ghost"
                            class="rounded-full"
                            @click="isProfileOpen = !isProfileOpen"
                        >
                            <div class="flex items-center gap-2">
                                <img
                                    class="rounded-full"
                                    src="/assets/img/avatar1.png"
                                    alt="Profile"
                                    width="40"
                                    height="40"
                                />
                                <span class="hidden lg:inline"
                                    >David Malan</span
                                >
                                <UIcon
                                    name="i-tabler-chevron-down"
                                    class="hidden lg:block"
                                />
                            </div>
                        </UButton>

                        <Transition
                            name="slide-right"
                            @after-enter="onAfterEnter"
                            @after-leave="onAfterLeave"
                        >
                            <div
                                v-if="isProfileOpen"
                                ref="profileMenu"
                                class="top-full right-0 z-10 mt-2 min-w-40 rounded bg-gray-900 p-2"
                            >
                                <NuxtLink
                                    to="/profile"
                                    class="block rounded px-3 py-2 hover:bg-gray-800"
                                >
                                    Profile
                                </NuxtLink>
                                <button
                                    class="block w-full rounded px-3 py-2 text-left hover:bg-gray-800"
                                >
                                    Logout
                                </button>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>
        <!-- Notification Panel -->
        <div
            v-if="isNotificationOpen"
            class="absolute top-16 right-4 z-50 w-80 rounded bg-gray-900 p-4 shadow-lg"
        >
            <div class="space-y-4">
                <div
                    v-for="notification in notifications"
                    :key="notification.id"
                    class="flex items-center gap-3 rounded p-2 hover:bg-gray-800"
                >
                    <UAvatar
                        v-if="notification.avatar"
                        :src="notification.avatar"
                        size="sm"
                    />
                    <div>
                        <p class="font-medium">{{ notification.title }}</p>
                        <p class="text-sm text-gray-400">
                            {{ notification.message }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);
    const isMenuOpen = ref(false);
    const isNotificationOpen = ref(false);
    const isProfileOpen = ref(false);
    const isScrolled = ref(false);
    interface Notification {
        id: number;
        title: string;
        message: string;
        avatar?: string;
    }

    const profileMenu = ref<HTMLElement | null>(null);
    function onAfterEnter(el: Element) {
        (el as HTMLElement).style.position = 'absolute'; // hoặc 'static' nếu bạn muốn nó flow theo cha
    }
    function onAfterLeave(el: Element) {
        (el as HTMLElement).style.position = '';
    }

    const notifications = ref<Notification[]>([
        {
            id: 1,
            title: 'Cristofer Dorwart',
            message: 'Winners The Last Game',
            avatar: '/assets/img/avatar1.png'
        },
        {
            id: 2,
            title: 'Piter Maio',
            message: 'Accept your challenge',
            avatar: '/assets/img/avatar2.png'
        },
        { id: 3, title: 'Copa Punto Gamer', message: 'Tournament start' },
        { id: 4, title: 'Daily Bonus', message: 'Tournament start' }
    ]);
    // Dropdown data for Nuxt UI UDropdown
    const tournamentItems = [
        [
            {
                label: 'Browse Tournaments',
                icon: 'i-tabler-trophy',
                click: () => navigateTo('/tournaments')
            },
            {
                label: 'Create Tournament',
                icon: 'i-tabler-plus',
                click: () => navigateTo('/tournaments?new=1')
            }
        ]
    ];
    const pageItems = [
        [
            {
                label: 'FAQ',
                icon: 'i-tabler-help',
                click: () => navigateTo('/faq')
            },
            {
                label: 'Terms',
                icon: 'i-tabler-file-description',
                click: () => navigateTo('/terms')
            },
            {
                label: 'Error Page',
                icon: 'i-tabler-alert-triangle',
                click: () => navigateTo('/error')
            },
            {
                label: 'Profile',
                icon: 'i-tabler-user',
                click: () => navigateTo('/profile')
            }
        ]
    ];

    const activeSection = ref<string>('hero');
    function linkClass(id: string) {
        return [
            'relative transition-colors',
            activeSection.value === id
                ? 'text-primary font-semibold after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary after:rounded'
                : 'hover:text-primary'
        ];
    }
    function scrollToSection(id: string) {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 70; // header offset
        window.scrollTo({ top, behavior: 'smooth' });
        isMenuOpen.value = false;
    }

    function updateActive() {
        const ids = [
            'hero',
            'featured-games',
            'tournaments',
            'games-carousel',
            'top-teams',
            'top-players',
            'cta'
        ];
        let current = 'hero';
        const scrollPos = window.scrollY + window.innerHeight * 0.3;
        for (const id of ids) {
            const el = document.getElementById(id);
            if (!el) continue;
            if (el.offsetTop <= scrollPos) current = id;
        }
        activeSection.value = current;
    }
    onMounted(() => {
        updateActive();
        window.addEventListener('scroll', updateActive, { passive: true });
        window.addEventListener(
            'scroll',
            () => {
                isScrolled.value = window.scrollY > 10;
            },
            { passive: true }
        );

        // Header entrance animation
        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;
        if (!prefersReduced) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from('[data-header]', { y: -60, opacity: 0, duration: 0.6 }, 0)
                .from(
                    '[data-header-left]',
                    { x: -30, opacity: 0, duration: 0.5 },
                    0.1
                )
                .from(
                    '[data-main-nav] li',
                    { y: 20, opacity: 0, stagger: 0.05, duration: 0.45 },
                    0.15
                )
                .from(
                    '[data-header-actions] > *',
                    { y: -15, opacity: 0, stagger: 0.07, duration: 0.4 },
                    0.2
                );
        }
    });
    onBeforeUnmount(() => {
        window.removeEventListener('scroll', updateActive);
    });
</script>

<style scoped>
    .app-header {
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        backdrop-filter: blur(14px);
        background: linear-gradient(
            135deg,
            rgba(12, 16, 22, 0.82),
            rgba(14, 18, 26, 0.65)
        );
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        transition:
            background 0.4s ease,
            box-shadow 0.4s ease,
            border-color 0.4s ease;
    }
    .app-header.is-scrolled {
        background: rgba(10, 14, 20, 0.92);
        box-shadow:
            0 6px 24px -8px rgba(0, 0, 0, 0.55),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.08);
    }
    .main-nav a,
    .main-nav button {
        position: relative;
        font-weight: 500;
    }
    .main-nav a::after,
    .main-nav button::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -6px;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, #00c6ff, #0072ff);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s cubic-bezier(0.65, 0.05, 0.36, 1);
        border-radius: 2px;
    }
    .main-nav a:hover::after,
    .main-nav a.router-link-active::after,
    .main-nav button:hover::after {
        transform: scaleX(1);
    }
    .main-nav .group:hover > button::after {
        transform: scaleX(1);
    }
    .main-nav ul li {
        list-style: none;
    }

    /* Dropdown */
    .main-nav .group ul {
        animation: fadeSlide 0.35s ease forwards;
        transform-origin: top center;
    }
    @keyframes fadeSlide {
        from {
            opacity: 0;
            transform: translateY(-6px) scale(0.96);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    /* Notification panel */
    [data-header] .absolute.bg-gray-900 {
        animation: panelIn 0.4s ease;
    }
    @keyframes panelIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Buttons refinement */
    .header-actions .rounded-full {
        transition:
            background 0.3s ease,
            color 0.3s ease;
    }
    .header-actions .rounded-full:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    /* Avatar */
    .header-actions img {
        border: 2px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 4px 10px -3px rgba(0, 0, 0, 0.5);
    }

    /* Mobile nav overlay style improvement */
    @media (max-width: 991.98px) {
        .main-nav {
            backdrop-filter: blur(18px);
            background: rgba(14, 18, 26, 0.95) !important;
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 14px;
        }
        .main-nav ul {
            flex-wrap: wrap;
        }
    }

    /* transition classes */
    .slide-right-enter-active,
    .slide-right-leave-active {
        transition: all 0.25s ease;
        will-change: transform, opacity;
        position: absolute;
    }

    .slide-right-enter-from,
    .slide-right-leave-to {
        opacity: 0 !important;
        transform: translateX(100%) !important;
        position: absolute;
    }
    .slide-right-enter-to,
    .slide-right-leave-from {
        opacity: 1 !important;
        position: absolute;
        transform: translateX(0) !important;
    }
</style>
