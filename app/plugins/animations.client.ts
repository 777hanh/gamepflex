import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';

export default defineNuxtPlugin(() => {
    if (import.meta.client) {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // AOS with mirror enabled - animations replay on scroll
        const GSAP_SECTIONS = [
            '#swiper-3d',
            '#top-player',
            '#tournament-hero',
            '#cta'
        ];

        const removeAOSFromGsapSections = () => {
            GSAP_SECTIONS.forEach((selector) => {
                const section = document.querySelector(selector);
                if (section) {
                    section.removeAttribute('data-aos');
                    section.removeAttribute('data-aos-duration');
                    section.removeAttribute('data-aos-delay');
                    section.removeAttribute('data-aos-easing');

                    const gsapElements = section.querySelectorAll(
                        '.sword-area, .diamond-area, .game-console-area, .footer-banner-img'
                    );
                    gsapElements.forEach((el) => {
                        el.removeAttribute('data-aos');
                        el.removeAttribute('data-aos-duration');
                        el.removeAttribute('data-aos-delay');
                        el.removeAttribute('data-aos-easing');
                    });
                }
            });
        };

        // OPTIMIZED AOS init
        const initAOS = () => {
            removeAOSFromGsapSections();

            // AOS with mirror enabled - animations replay on scroll
            AOS.init({
                duration: 600,
                delay: 0,
                easing: 'ease-out-cubic',
                once: false, // Allow re-trigger for mirror effect
                mirror: true, // ENABLED: animations replay khi scroll lên/xuống
                anchorPlacement: 'top-bottom',
                offset: 100,
                disable: false,
                startEvent: 'DOMContentLoaded',
                disableMutationObserver: false // Enable để detect scroll changes
            });
        };

        if (document.readyState === 'loading') {
            document.addEventListener(
                'DOMContentLoaded',
                () => setTimeout(initAOS, 100),
                { once: true }
            );
        } else {
            setTimeout(initAOS, 100);
        }

        // Mirror enabled - AOS tự động handle replay
        // MutationObserver enabled để detect DOM changes

        // Refresh khi tab visible (cần thiết)
        document.addEventListener(
            'visibilitychange',
            () => {
                if (document.visibilityState === 'visible') {
                    AOS.refresh();
                }
            },
            { passive: true }
        );

        // Refresh on route change để animations hoạt động với dynamic content
        try {
            const router = useRouter();
            router.afterEach(() => {
                setTimeout(() => {
                    AOS.refresh();
                }, 100);
            });
        } catch {
            /* router not available */
        }

        // (Removed unused global timeline variable)

        // Page transition animations
        const pageTransitionIn = () => {
            return gsap.fromTo(
                '.page-transition',
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out'
                }
            );
        };

        const pageTransitionOut = () => {
            return gsap.to('.page-transition', {
                opacity: 0,
                y: -30,
                duration: 0.4,
                ease: 'power2.in'
            });
        };

        // REMOVED: Card & Button animations - gây lag
        // Sử dụng CSS transitions thì smooth và nhanh hơn

        // REMOVED: Scroll animations - AOS xử lý tốt hơn và nhẹ hơn

        // REMOVED: Hero animations - AOS đã xử lý

        // Provide minimal animation utilities
        return {
            provide: {
                gsap,
                ScrollTrigger,
                AOS,
                animations: {
                    pageTransitionIn,
                    pageTransitionOut
                }
            }
        };
    }
});
