// Clone ScrollMagic-based scroll animations from gsap-customization.js
// Converted to GSAP ScrollTrigger (no jQuery/ScrollMagic dependency)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineNuxtPlugin(() => {
    if (!import.meta.client) return;

    // Wait for DOM ready
    const initScrollAnimations = () => {
        if (!gsap || !ScrollTrigger) return;

        // 07 -> footer banner animation (clone from original)
        const footerBanner =
            document.querySelector<HTMLElement>('.footer-banner-img');
        if (footerBanner) {
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
                    scrub: true,
                    markers: false
                }
            });
        }

        // 08 -> sword animation (clone from original: 2 scenes)
        const swordArea = document.querySelector<HTMLElement>('.sword-area');
        if (swordArea) {
            // Scene 1: sword moves in when #swiper-3d appears
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
                    scrub: true,
                    markers: false
                }
            });

            // Scene 2: sword rotates 180deg when #top-player appears
            gsap.to(swordArea, {
                rotate: '180deg',
                scrollTrigger: {
                    trigger: '#top-player',
                    start: 'top center',
                    end: '+=100',
                    scrub: true,
                    markers: false
                }
            });
        }

        // 09 -> diamond animation
        const diamondArea =
            document.querySelector<HTMLElement>('.diamond-area');
        if (diamondArea) {
            gsap.to(diamondArea, {
                top: '80%',
                opacity: 1,
                scrollTrigger: {
                    trigger: '#tournament-hero',
                    start: 'top center',
                    end: '+=1000',
                    scrub: true,
                    markers: false
                }
            });
        }

        // 10 -> game console animation
        const gameConsole =
            document.querySelector<HTMLElement>('.game-console-area');
        if (gameConsole) {
            gsap.to(gameConsole, {
                top: '80%',
                left: 'unset',
                right: '0%',
                opacity: 1,
                scrollTrigger: {
                    trigger: '#tournament-hero',
                    start: 'top center',
                    end: '+=1000',
                    scrub: true,
                    markers: false
                }
            });
        }
    };

    // Initialize after DOM is ready and other plugins have loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initScrollAnimations, 100);
        });
    } else {
        setTimeout(initScrollAnimations, 100);
    }
});
