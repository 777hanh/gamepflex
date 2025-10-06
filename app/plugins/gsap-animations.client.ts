// GSAP-based animations replacing AOS library
// Supports: fade-up, fade-down, fade-left, fade-right, zoom-in, zoom-out
// Attributes: data-gsap, data-gsap-duration, data-gsap-delay
import { gsap } from 'gsap';

export default defineNuxtPlugin((nuxtApp) => {
    if (!import.meta.client) return;

    const initGSAPAnimations = () => {
        // OPTIMIZED: Chỉ animate manual elements để giảm lag
        const manualElements = document.querySelectorAll('[data-gsap]');

        // REMOVED: Auto selectors - gây lag khi quét toàn bộ DOM
        // AOS sẽ xử lý phần này tốt hơn với once:true

        const allElements = new Set([...manualElements]);

        if (allElements.size === 0) {
            return;
        }

        console.log(`[GSAP Animations] Animating ${allElements.size} elements`);

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

            if (!config) return;

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
                    start: 'top 90%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse',
                    markers: false,
                    once: false
                }
            });
        });

        console.log('[GSAP Animations] Animation setup complete');
    };

    // OPTIMIZED: Simple init without retry
    const tryInit = () => {
        const hasElements = document.querySelector('[data-gsap]');
        if (hasElements) {
            initGSAPAnimations();
        }
    };

    // Initialize after minimal delay
    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            () => setTimeout(tryInit, 100),
            { once: true }
        );
    } else {
        setTimeout(tryInit, 100);
    }

    // Re-initialize on page navigation - OPTIMIZED
    nuxtApp.hook('page:finish', () => {
        setTimeout(() => {
            // Reset animated flags
            document.querySelectorAll('[data-gsap-animated]').forEach((el) => {
                delete (el as HTMLElement).dataset.gsapAnimated;
            });

            tryInit();
        }, 100);
    });
});
