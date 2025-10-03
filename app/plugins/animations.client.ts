import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';

export default defineNuxtPlugin(() => {
    if (import.meta.client) {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Initialize AOS (replay when scroll back into view)
        AOS.init({
            duration: 800,
            delay: 0,
            easing: 'ease-out-cubic',
            once: false, // allow re-trigger when re-entering viewport
            mirror: true, // animate on scrolling out (so scroll up then down replays nicely)
            anchorPlacement: 'top-bottom',
            offset: 120
        });

        // Observer reset animation để đảm bảo mọi data-aos đều replay trừ khi opt-out.
        // Opt-out attributes: data-aos-mirror-none, data-aos-once, data-aos-single, data-aos-sticky
        // data-aos-mirror-none & data-aos-single sẽ tự gán data-aos-once="true" (chuẩn AOS) lần đầu.
        const setupAOSReplayObserver = () => {
            if (!('IntersectionObserver' in window)) return;
            const SKIP_ATTRS = [
                'data-aos-sticky',
                'data-aos-mirror-none',
                'data-aos-once',
                'data-aos-single'
            ];
            const normalize = () => {
                document
                    .querySelectorAll(
                        '[data-aos][data-aos-mirror-none], [data-aos][data-aos-single]'
                    )
                    .forEach((el) => {
                        if (!el.getAttribute('data-aos-once'))
                            el.setAttribute('data-aos-once', 'true');
                    });
            };
            normalize();
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const el = entry.target as HTMLElement;
                        if (SKIP_ATTRS.some((a) => el.hasAttribute(a))) return;
                        if (
                            entry.isIntersecting &&
                            el.classList.contains('aos-animate')
                        ) {
                            el.dataset.aosRan = '1';
                        } else if (!entry.isIntersecting) {
                            const r = entry.boundingClientRect;
                            const vh =
                                window.innerHeight ||
                                document.documentElement.clientHeight;
                            if (
                                (r.bottom < 0 || r.top > vh) &&
                                el.dataset.aosRan === '1'
                            ) {
                                el.classList.remove('aos-animate');
                            }
                        }
                    });
                },
                { threshold: [0, 0.05, 0.1] }
            );
            const observeAll = () => {
                normalize();
                document
                    .querySelectorAll('[data-aos]')
                    .forEach((el) => observer.observe(el));
            };
            observeAll();
            return { observer, observeAll };
        };
        const aosReplay = setupAOSReplayObserver();

        // Fallback: ensure visible elements animate even if initial scroll skipped them
        const forceAnimateVisible = () => {
            const vh =
                window.innerHeight || document.documentElement.clientHeight;
            const vw =
                window.innerWidth || document.documentElement.clientWidth;
            document.querySelectorAll('[data-aos]').forEach((el) => {
                const node = el as HTMLElement;
                if (node.classList.contains('aos-animate')) return;
                if (
                    [
                        'data-aos-once',
                        'data-aos-mirror-none',
                        'data-aos-single',
                        'data-aos-sticky'
                    ].some((a) => node.hasAttribute(a)) &&
                    node.dataset.aosRan === '1'
                )
                    return;
                const r = node.getBoundingClientRect();
                if (
                    r.bottom >= 0 &&
                    r.top <= vh &&
                    r.right >= 0 &&
                    r.left <= vw
                ) {
                    node.classList.add('aos-animate');
                }
            });
        };
        setTimeout(forceAnimateVisible, 80);
        setTimeout(forceAnimateVisible, 300);
        window.addEventListener('scroll', forceAnimateVisible, {
            passive: true
        });

        // Periodic light refresh to catch transforms from smooth scrolling libs
        let last = 0;
        const tick = () => {
            const now = performance.now();
            if (now - last > 900) {
                // ~0.9s cadence
                AOS.refresh();
                last = now;
            }
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);

        // Refresh AOS after each route change to ensure new DOM nodes get animations
        try {
            const router = useRouter();
            router.afterEach(() => {
                // slight delay so new page content mounted
                setTimeout(() => {
                    AOS.refreshHard();
                    // re-attach new elements
                    if (aosReplay?.observeAll) aosReplay.observeAll();
                }, 60);
            });
        } catch {
            /* router not available */
        }

        // Optional: re-check on window focus (user switches tab then returns)
        window.addEventListener('focus', () => {
            AOS.refresh();
        });

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

        // Card hover animations
        const setupCardAnimations = () => {
            const cards = gsap.utils.toArray(
                '.game-card, .tournament-card, .team-card'
            );

            cards.forEach((card: any) => {
                const cardElement = card as HTMLElement;
                const image = cardElement.querySelector('.card-image');
                const content = cardElement.querySelector('.card-content');

                cardElement.addEventListener('mouseenter', () => {
                    gsap.to(cardElement, {
                        y: -10,
                        scale: 1.02,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    if (image) {
                        gsap.to(image, {
                            scale: 1.1,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                    }

                    if (content) {
                        gsap.to(content, {
                            y: -5,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                });

                cardElement.addEventListener('mouseleave', () => {
                    gsap.to(cardElement, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    if (image) {
                        gsap.to(image, {
                            scale: 1,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                    }

                    if (content) {
                        gsap.to(content, {
                            y: 0,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                });
            });
        };

        // Button hover animations
        const setupButtonAnimations = () => {
            const buttons = gsap.utils.toArray('.btn-animated');

            buttons.forEach((button: any) => {
                const buttonElement = button as HTMLElement;

                buttonElement.addEventListener('mouseenter', () => {
                    gsap.to(buttonElement, {
                        scale: 1.05,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                });

                buttonElement.addEventListener('mouseleave', () => {
                    gsap.to(buttonElement, {
                        scale: 1,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                });
            });
        };

        // Scroll animations
        const setupScrollAnimations = () => {
            // Fade in elements on scroll
            gsap.utils.toArray('.fade-in-up').forEach((element: any) => {
                gsap.fromTo(
                    element,
                    {
                        opacity: 0,
                        y: 50
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

            // Stagger animation for lists
            gsap.utils.toArray('.stagger-item').forEach((container: any) => {
                const items = container.querySelectorAll('.stagger-child');

                gsap.fromTo(
                    items,
                    {
                        opacity: 0,
                        y: 30
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: container,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

            // Parallax effects
            gsap.utils.toArray('.parallax').forEach((element: any) => {
                gsap.to(element, {
                    yPercent: -50,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });
        };

        // Hero section animations
        const setupHeroAnimations = () => {
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroButton = document.querySelector('.hero-button');
            const heroImage = document.querySelector('.hero-image');

            const heroTl = gsap.timeline();

            if (heroTitle) {
                heroTl.fromTo(
                    heroTitle,
                    {
                        opacity: 0,
                        y: 50
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out'
                    }
                );
            }

            if (heroSubtitle) {
                heroTl.fromTo(
                    heroSubtitle,
                    {
                        opacity: 0,
                        y: 30
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out'
                    },
                    '-=0.4'
                );
            }

            if (heroButton) {
                heroTl.fromTo(
                    heroButton,
                    {
                        opacity: 0,
                        scale: 0.8
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: 'back.out(1.7)'
                    },
                    '-=0.3'
                );
            }

            if (heroImage) {
                heroTl.fromTo(
                    heroImage,
                    {
                        opacity: 0,
                        x: 50
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'power2.out'
                    },
                    '-=0.6'
                );
            }
        };

        // Setup all animations after DOM is ready
        const initAnimations = () => {
            setupCardAnimations();
            setupButtonAnimations();
            setupScrollAnimations();
            setupHeroAnimations();
        };

        // Provide animation utilities
        return {
            provide: {
                gsap,
                ScrollTrigger,
                AOS,
                animations: {
                    pageTransitionIn,
                    pageTransitionOut,
                    initAnimations,
                    setupCardAnimations,
                    setupButtonAnimations,
                    setupScrollAnimations,
                    setupHeroAnimations
                }
            }
        };
    }
});
