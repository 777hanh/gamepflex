<template>
    <footer
        class="footer bgn-4 bt relative mt-10! py-10 md:mt-20! md:py-15"
        id="footer"
    >
        <div class="container">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                <!-- Logo & Social Links -->
                <div
                    class="br footer-card-area pt-10 sm:pt-15 lg:col-span-1 lg:py-20"
                    data-footer-col
                >
                    <div class="flex h-full flex-col justify-center lg:py-10">
                        <div class="mb-4 flex flex-col justify-center md:mb-8">
                            <NuxtLink
                                :to="routes.home"
                                class="flex items-center gap-6"
                            >
                                <div class="flogo-1">
                                    <NuxtImg
                                        src="/assets/img/logo2.png"
                                        alt="favicon"
                                        class="flex h-full w-full items-center justify-center object-contain"
                                    />
                                </div>
                                <h3 class="text-lg font-bold">
                                    {{ NAME_APP }}
                                </h3>
                            </NuxtLink>
                        </div>
                        <div class="social-links">
                            <ul class="flex flex-wrap items-center gap-3">
                                <li
                                    v-for="social in listSocial"
                                    :key="social.title"
                                >
                                    <a
                                        :href="social.link"
                                        :aria-label="social.title"
                                    >
                                        <component
                                            :is="social.icon"
                                            class="hover:tcp-1 h-5 w-5 text-white"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- Footer Columns (Quick Links, Explore, Follow Us) -->
                <div
                    v-for="(column, index) in listMenuFooter"
                    :key="column.title"
                    :class="[
                        'footer-card-area pt-10 sm:col-span-1 sm:pt-15 lg:col-span-1 lg:py-20',
                        { 'br br-res': index === 0, br: index === 1 }
                    ]"
                    data-footer-col
                >
                    <div class="lg:py-10">
                        <h4
                            class="footer-title title-anim drag-none mb-8 select-none"
                        >
                            {{ column.title }}
                        </h4>
                        <ul class="footer-list grid gap-4">
                            <li v-for="link in column.links" :key="link.text">
                                <NuxtLink
                                    v-if="link.to"
                                    :to="link?.to"
                                    class="footer-link tcn-6 drag-none flex w-full cursor-pointer items-center select-none"
                                >
                                    <ChevronRight class="h-4 w-4" />
                                    {{ link.text }}
                                </NuxtLink>
                                <a
                                    v-else
                                    :href="link?.href"
                                    class="footer-link tcn-6 drag-none flex cursor-pointer items-center select-none"
                                >
                                    <ChevronRight class="h-4 w-4" />
                                    {{ link.text }}
                                </a>
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
                        <a :href="socialsLinks.facebook" class="tcp-1"
                            >GamePlex</a
                        ></span
                    >
                </div>
                <div class="lg:col-span-1">
                    <ul class="flex items-center gap-4 sm:gap-6 lg:gap-10">
                        <li v-for="legal in legalLinks" :key="legal.to">
                            <NuxtLink :to="legal.to" class="text-underline">{{
                                legal.title
                            }}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- footer banner img  -->
        <div class="footer-banner-img z-[-1] flex items-end" id="faa">
            <NuxtImg src="/assets/img/fbanner.png" alt="banner" class="w-100" />
        </div>
    </footer>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    import { ChevronRight } from 'lucide-vue-next';

    import {
        legalLinks,
        listMenuFooter,
        listSocial,
        routes,
        NAME_APP,
        socialsLinks
    } from '~/constants';

    if (import.meta.client) gsap.registerPlugin(ScrollTrigger);

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
                    bottom: '0',
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

<style scoped lang="css">
    .text-underline {
        position: relative;
        display: inline-block;
        width: fit-content;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: -4px;
            display: flex;
            margin-right: 0.5rem;
            transition: transform 0.3s ease;
            width: 100%;
            height: 1.5px;
            background-color: var(--color-primary);
            transform: scaleX(0);
            transform-origin: left center;
        }

        &:hover::before {
            transform: scaleX(1);
        }
    }
</style>
