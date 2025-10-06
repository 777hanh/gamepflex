// GSAP-based animations replacing AOS library
// Supports: fade-up, fade-down, fade-left, fade-right, zoom-in, zoom-out
// Attributes: data-gsap, data-gsap-duration, data-gsap-delay
import { gsap } from 'gsap';

export default defineNuxtPlugin((nuxtApp) => {
    if (!import.meta.client) return;

    const animateElement = (element: HTMLElement) => {
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
    };

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
            animateElement(el as HTMLElement);
        });

        console.log('[GSAP Animations] Animation setup complete');
    };

    // MutationObserver to watch for new [data-gsap] elements
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const element = node as HTMLElement;

                    // Check if the added node itself has data-gsap
                    if (element.hasAttribute('data-gsap')) {
                        console.log(
                            '[GSAP Animations] New [data-gsap] element detected via MutationObserver'
                        );
                        setTimeout(() => animateElement(element), 100);
                    }

                    // Check children
                    const children = element.querySelectorAll('[data-gsap]');
                    if (children.length > 0) {
                        console.log(
                            '[GSAP Animations] Found',
                            children.length,
                            'new [data-gsap] elements in mounted component'
                        );
                        children.forEach((el) => {
                            setTimeout(
                                () => animateElement(el as HTMLElement),
                                100
                            );
                        });
                    }
                }
            });
        });
    });

    // Init when DOM ready and start watching for new elements
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                initGSAPAnimations();
                // Start watching for new elements
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
                console.log('[GSAP Animations] MutationObserver started');
            }, 100);
        });
    } else {
        setTimeout(() => {
            initGSAPAnimations();
            // Start watching for new elements
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            console.log('[GSAP Animations] MutationObserver started');
        }, 100);
    }

    // Re-init animations sau route change
    nuxtApp.hook('page:finish', () => {
        setTimeout(initGSAPAnimations, 100);
    });
});
