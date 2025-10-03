// Clone ScrollMagic-based scroll animations from gsap-customization.js
// Converted to GSAP ScrollTrigger (no jQuery/ScrollMagic dependency)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineNuxtPlugin((nuxtApp) => {
    if (!import.meta.client) return;

    // Wait for DOM ready
    const initScrollAnimations = () => {
        if (!gsap || !ScrollTrigger) return;

        console.log('[Scroll Animations] Initializing...');

        // 07 -> footer banner animation (clone from original)
        const footerBanner =
            document.querySelector<HTMLElement>('.footer-banner-img');
        if (footerBanner) {
            console.log(
                '[Scroll Animations] Footer banner found:',
                footerBanner
            );
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
        } else {
            console.log('[Scroll Animations] Footer banner NOT found');
        }

        // 08 -> sword animation (clone from original: 2 scenes)
        const swordArea = document.querySelector<HTMLElement>('.sword-area');
        if (swordArea) {
            console.log('[Scroll Animations] Sword found:', swordArea);
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
        } else {
            console.log('[Scroll Animations] Sword NOT found');
        }

        // 09 -> diamond animation
        const diamondArea =
            document.querySelector<HTMLElement>('.diamond-area');
        if (diamondArea) {
            console.log('[Scroll Animations] Diamond found:', diamondArea);
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
        } else {
            console.log('[Scroll Animations] Diamond NOT found');
        }

        // 10 -> game console animation
        const gameConsole =
            document.querySelector<HTMLElement>('.game-console-area');
        if (gameConsole) {
            console.log('[Scroll Animations] Game console found:', gameConsole);
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
        } else {
            console.log('[Scroll Animations] Game console NOT found');
        }
    };

    // Retry logic for elements that might not be rendered yet
    let retryCount = 0;
    const maxRetries = 5;

    const tryInit = () => {
        retryCount++;
        console.log(`[Scroll Animations] Attempt ${retryCount}/${maxRetries}`);

        // Check if critical elements exist
        const swordArea = document.querySelector('.sword-area');
        const diamondArea = document.querySelector('.diamond-area');
        const swiperSection = document.getElementById('swiper-3d');
        const tournamentSection = document.getElementById('tournament-hero');

        console.log('[Scroll Animations] Elements check:', {
            swordArea: !!swordArea,
            diamondArea: !!diamondArea,
            swiperSection: !!swiperSection,
            tournamentSection: !!tournamentSection
        });

        if (!swordArea || !swiperSection) {
            if (retryCount < maxRetries) {
                console.log('[Scroll Animations] Retrying in 500ms...');
                setTimeout(tryInit, 500);
                return;
            } else {
                console.warn(
                    '[Scroll Animations] Max retries reached, initializing anyway'
                );
            }
        }

        initScrollAnimations();
    };

    // Initialize after DOM is ready and other plugins have loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(tryInit, 1000); // Increased delay for Swiper init
        });
    } else {
        setTimeout(tryInit, 1000); // Increased delay for Swiper init
    }

    // Re-initialize on page navigation
    nuxtApp.hook('page:finish', () => {
        retryCount = 0; // Reset retry count
        setTimeout(() => {
            ScrollTrigger.refresh();
            tryInit();
        }, 1000);
    });
});
