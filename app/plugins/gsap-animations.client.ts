// GSAP-based animations replacing AOS library
// Supports: fade-up, fade-down, fade-left, fade-right, zoom-in, zoom-out
// Attributes: data-gsap, data-gsap-duration, data-gsap-delay
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineNuxtPlugin((nuxtApp) => {
    if (!import.meta.client) return;

    const initGSAPAnimations = () => {
        console.log(
            '[GSAP Animations] Initializing scroll-triggered animations...'
        );

        // AUTO MODE: Find elements with data-gsap attribute
        const manualElements = document.querySelectorAll('[data-gsap]');

        // AUTO MODE: Also animate common elements automatically (like AOS)
        // Select elements that should fade in: cards, items, sections with specific classes
        const autoSelectors = [
            '.tournament-card',
            '.team-card',
            '.player-card',
            '.game-card',
            '.member-card',
            '.achievement-item',
            '.stat-item',
            '.profile-header',
            '.featured-team',
            '[class*="-card"]:not(.swiper-slide)', // Any class ending with -card except swiper slides
            '[class*="-item"]:not(.swiper-slide)' // Any class ending with -item except swiper slides
        ].join(', ');

        const autoElements = document.querySelectorAll(autoSelectors);

        // Combine manual and auto elements, remove duplicates
        const allElements = new Set([...manualElements, ...autoElements]);

        if (allElements.size === 0) {
            console.log('[GSAP Animations] No elements found to animate');
            return;
        }

        console.log(
            `[GSAP Animations] Found ${manualElements.length} manual + ${autoElements.length} auto = ${allElements.size} total elements to animate`
        );

        allElements.forEach((el) => {
            const element = el as HTMLElement;

            // Check if already animated (prevent double animation)
            if (element.dataset.gsapAnimated === 'true') {
                return;
            }
            element.dataset.gsapAnimated = 'true';

            // Get animation config from attributes or use defaults
            const animation = element.getAttribute('data-gsap') || 'fade-up';
            const duration = parseFloat(
                element.getAttribute('data-gsap-duration') || '0.8'
            );
            const delay = parseFloat(
                element.getAttribute('data-gsap-delay') || '0'
            );

            // Animation configurations
            const animationConfigs: Record<
                string,
                { from: gsap.TweenVars; to: gsap.TweenVars }
            > = {
                'fade-up': {
                    from: { opacity: 0, y: 30 },
                    to: { opacity: 1, y: 0 }
                },
                'fade-down': {
                    from: { opacity: 0, y: -30 },
                    to: { opacity: 1, y: 0 }
                },
                'fade-left': {
                    from: { opacity: 0, x: 30 },
                    to: { opacity: 1, x: 0 }
                },
                'fade-right': {
                    from: { opacity: 0, x: -30 },
                    to: { opacity: 1, x: 0 }
                },
                'zoom-in': {
                    from: { opacity: 0, scale: 0.8 },
                    to: { opacity: 1, scale: 1 }
                },
                'zoom-out': {
                    from: { opacity: 0, scale: 1.2 },
                    to: { opacity: 1, scale: 1 }
                }
            };

            const config =
                animationConfigs[animation] || animationConfigs['fade-up'];

            // Set initial state
            gsap.set(element, config.from);

            // Create animation with ScrollTrigger
            gsap.to(element, {
                ...config.to,
                duration: duration,
                delay: delay,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 90%', // Start animation when element is 90% from top of viewport
                    end: 'top 20%',
                    toggleActions: 'play none none reverse', // Play on enter, reverse on leave (scroll up)
                    markers: false // Set to true for debugging
                }
            });
        });

        console.log('[GSAP Animations] Animation setup complete');
    };

    // Retry logic for elements that might not be rendered yet
    let retryCount = 0;
    const maxRetries = 5;

    const tryInit = () => {
        retryCount++;
        console.log(`[GSAP Animations] Attempt ${retryCount}/${maxRetries}`);

        // Check for any animatable elements (manual or auto)
        const manualElements = document.querySelectorAll('[data-gsap]');
        const autoElements = document.querySelectorAll(
            '.tournament-card, .team-card, .player-card, .game-card'
        );

        if (
            manualElements.length === 0 &&
            autoElements.length === 0 &&
            retryCount < maxRetries
        ) {
            console.log(
                '[GSAP Animations] No elements found, retrying in 300ms...'
            );
            setTimeout(tryInit, 300);
            return;
        }

        initGSAPAnimations();
    };

    // Initialize after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(tryInit, 500);
        });
    } else {
        setTimeout(tryInit, 500);
    }

    // Re-initialize on page navigation
    nuxtApp.hook('page:finish', () => {
        retryCount = 0;
        setTimeout(() => {
            // Clean up old ScrollTriggers for animated elements
            ScrollTrigger.getAll().forEach((trigger) => {
                const triggerEl = trigger.vars.trigger as HTMLElement;
                if (
                    triggerEl &&
                    (triggerEl.hasAttribute('data-gsap') ||
                        triggerEl.dataset.gsapAnimated === 'true')
                ) {
                    trigger.kill();
                }
            });

            // Reset animated flags
            document.querySelectorAll('[data-gsap-animated]').forEach((el) => {
                delete (el as HTMLElement).dataset.gsapAnimated;
            });

            ScrollTrigger.refresh();
            tryInit();
        }, 500);
    });
});
