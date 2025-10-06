<template>
    <footer class="footer bgn-4 bt" id="footer">
        <div class="container">
            <div class="grid grid-cols-3 md:grid-cols-4">
                <!-- Logo & Social Links -->
                <div
                    class="br footer-card-area pt-10 sm:pt-15 lg:col-span-1 lg:py-20"
                    data-footer-col
                >
                    <div class="lg:py-10">
                        <div class="footer-logo mb-8">
                            <NuxtLink to="/" class="grid gap-6">
                                <div class="flogo-1">
                                    <NuxtImg
                                        src="/assets/img/logo2.png"
                                        alt="favicon"
                                        class="w-100"
                                    />
                                </div>
                                <div class="flogo-2">
                                    <NuxtImg
                                        src="/assets/img/logo.png"
                                        alt="logo"
                                        class="w-100"
                                    />
                                </div>
                            </NuxtLink>
                        </div>
                        <div class="social-links">
                            <ul class="flex flex-wrap items-center gap-3">
                                <li
                                    v-for="social in socialLinks"
                                    :key="social.label"
                                >
                                    <a
                                        :href="social.href"
                                        :aria-label="social.label"
                                    >
                                        <i
                                            :class="`ti ti-brand-${social.icon} fs-2xl`"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- Footer Columns (Quick Links, Explore, Follow Us) -->
                <div
                    v-for="(column, index) in footerColumns"
                    :key="column.title"
                    :class="[
                        'py-lg-20 pt-sm-15 footer-card-area pt-10 sm:col-span-1 lg:col-span-1',
                        { 'br br-res': index === 0, br: index === 1 }
                    ]"
                    data-footer-col
                >
                    <div class="py-lg-10">
                        <h4 class="footer-title title-anim mb-8">
                            {{ column.title }}
                        </h4>
                        <ul class="footer-list grid gap-4">
                            <li v-for="link in column.links" :key="link.text">
                                <component
                                    :is="link?.to ? 'NuxtLink' : 'a'"
                                    :to="link?.to"
                                    :href="link?.href"
                                    class="footer-link tcn-6 flex items-center"
                                >
                                    <i class="ti ti-chevron-right" />
                                    {{ link.text }}
                                </component>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- Footer Bottom -->
            <div
                class="pt-lg-4 grid grid-cols-1 justify-between gap-2 pt-8 pb-4 lg:grid-cols-2"
            >
                <div class="order-last lg:order-first">
                    <span
                        >Copyright &copy;
                        {{ new Date().getFullYear() }} GamePlex | Designed by
                        <a
                            href="https://themeforest.net/user/pixelaxis"
                            class="tcp-1"
                            >Pixelaxis</a
                        ></span
                    >
                </div>
                <div class="lg:col-span-1">
                    <ul class="flex items-center gap-4 sm:gap-6 lg:gap-10">
                        <li v-for="legal in legalLinks" :key="legal.to">
                            <NuxtLink :to="legal.to">{{ legal.text }}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- footer banner img  -->
        <div class="footer-banner-img z-[-1]" id="faa">
            <NuxtImg src="/assets/img/fbanner.png" alt="banner" class="w-100" />
        </div>
    </footer>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    if (import.meta.client) gsap.registerPlugin(ScrollTrigger);

    // Social Links Data
    const socialLinks = [
        { icon: 'facebook', label: 'Facebook', href: '#' },
        { icon: 'twitter', label: 'Twitter', href: '#' },
        { icon: 'youtube', label: 'YouTube', href: '#' },
        { icon: 'linkedin', label: 'LinkedIn', href: '#' },
        { icon: 'instagram', label: 'Instagram', href: '#' }
    ];

    // Footer Columns Data
    const footerColumns: any[] = [
        {
            title: 'Quick Links',
            links: [
                { text: 'Tournaments', to: '/tournaments' },
                { text: 'Games', to: '/games' },
                { text: 'Teams', to: '/teams' },
                { text: 'FAQ', to: '/faq' }
            ]
        },
        {
            title: 'Explore',
            links: [
                { text: 'Top Players', to: '/top-players' },
                { text: 'messages', to: '/chat' },
                { text: 'Profile', to: '/profile' }
            ]
        },
        {
            title: 'Follow Us',
            links: [
                { text: 'Facebook', href: '#' },
                { text: 'Instagram', href: '#' },
                { text: 'Twitter', href: '#' },
                { text: 'Linkedln', href: '#' }
            ]
        }
    ];

    // Legal Links Data
    const legalLinks = [
        { text: 'Terms & Conditions', to: '/terms' },
        { text: 'Privacy Policy', to: '/privacy' }
    ];

    onMounted(() => {
        if (!import.meta.client) return;

        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;
        if (prefersReduced) return;

        // Wait for GSAP ScrollTrigger to be initialized
        setTimeout(() => {
            const footer = document.getElementById('footer');
            if (!footer) return;

            const cols = gsap.utils.toArray('[data-footer-col]');

            // Footer columns fade-in animation (from raw HTML/JS)
            gsap.from(cols, {
                opacity: 0,
                y: 28,
                stagger: 0.15,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 85%',
                    markers: false
                }
            });

            // Footer banner animation
            const banner = document.getElementById('faa');
            if (banner) {
                console.log('Footer banner element found:', banner);
                gsap.to(banner, {
                    right: '0%',
                    left: 'unset',
                    bottom: '0%',
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: footer,
                        start: 'top 60%',
                        markers: true,
                        onEnter: () =>
                            console.log('Footer banner animation triggered!')
                    }
                });
            } else {
                console.error('Footer banner element (#faa) not found!');
            }
        }, 300);
    });
</script>

<style>
    /* Override global footer overflow:hidden to allow banner to show */
    .footer {
        overflow: visible !important;
    }

    /* Ensure footer banner is not clipped */
    .footer-banner-img {
        overflow: visible !important;
    }
</style>
