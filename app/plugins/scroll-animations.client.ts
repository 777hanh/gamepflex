// Clone ScrollMagic-based scroll animations from gsap-customization.js
// Converted to GSAP ScrollTrigger (no jQuery/ScrollMagic dependency)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineNuxtPlugin((nuxtApp) => {
    if (!import.meta.client) return;

    // Track initialized animations
    let isInitialized = false;
    const animatedElements = new Set<string>();

    // Wait for DOM ready
    const initScrollAnimations = () => {
        if (!gsap || !ScrollTrigger) return;
        if (isInitialized) return; // Prevent double init
        isInitialized = true;

        console.log('[Scroll Animations] Initializing...');

        // 07 -> footer banner animation - OPTIMIZED
        const footerBanner =
            document.querySelector<HTMLElement>('.footer-banner-img');
        if (footerBanner && !animatedElements.has('footer-banner')) {
            animatedElements.add('footer-banner');
            gsap.to(footerBanner, {
                right: '0%',
                left: 'unset',
                bottom: '0%',
                opacity: 1,
                scale: 1,
                scrollTrigger: {
                    trigger: '#cta',
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 1,
                    markers: false,
                    invalidateOnRefresh: true
                }
            });
        }

        // 08 -> sword animation - OPTIMIZED
        const swordArea = document.querySelector<HTMLElement>('.sword-area');
        if (swordArea && !animatedElements.has('sword')) {
            animatedElements.add('sword');
            // Scene 1: sword moves in
            gsap.to(swordArea, {
                right: 'unset',
                left: '0%',
                bottom: '0%',
                opacity: 1,
                scale: 1,
                scrollTrigger: {
                    trigger: '#swiper-3d',
                    start: 'top center',
                    end: '+=1000',
                    scrub: 1,
                    markers: false,
                    invalidateOnRefresh: true
                }
            });

            // Scene 2: sword rotates
            gsap.to(swordArea, {
                rotate: '180deg',
                scrollTrigger: {
                    trigger: '#top-player',
                    start: 'top center',
                    end: '+=100',
                    scrub: 1,
                    markers: false,
                    invalidateOnRefresh: true
                }
            });
        }

        // 09 -> diamond animation - OPTIMIZED
        const diamondArea =
            document.querySelector<HTMLElement>('.diamond-area');
        if (diamondArea && !animatedElements.has('diamond')) {
            animatedElements.add('diamond');
            gsap.to(diamondArea, {
                top: '80%',
                opacity: 1,
                scrollTrigger: {
                    trigger: '#tournament-hero',
                    start: 'top center',
                    end: '+=1000',
                    scrub: 1,
                    markers: false,
                    invalidateOnRefresh: true
                }
            });
        }

        // 10 -> game console animation - OPTIMIZED
        const gameConsole =
            document.querySelector<HTMLElement>('.game-console-area');
        if (gameConsole && !animatedElements.has('game-console')) {
            animatedElements.add('game-console');
            gsap.to(gameConsole, {
                top: '80%',
                left: 'unset',
                right: '0%',
                opacity: 1,
                scrollTrigger: {
                    trigger: '#tournament-hero',
                    start: 'top center',
                    end: '+=1000',
                    scrub: 1,
                    markers: false,
                    invalidateOnRefresh: true
                }
            });
        }

        console.log(
            '[Scroll Animations] Initialized',
            animatedElements.size,
            'animations'
        );
    };

    // Initialize faster
    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            () => setTimeout(initScrollAnimations, 200),
            { once: true }
        );
    } else {
        setTimeout(initScrollAnimations, 200);
    }

    // Re-initialize on page navigation - OPTIMIZED
    nuxtApp.hook('page:finish', () => {
        isInitialized = false; // Allow re-init
        setTimeout(initScrollAnimations, 200);
    });
});
