import { onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';

// Đăng ký plugin ScrollTrigger cho GSAP
if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger);
}

export const useAnimation = () => {
    // Mutable runtime trigger configuration
    const config = {
        aosOffset: 20, // earlier (was 80)
        aosAnchorPlacement: 'top-bottom' as AOS.AosOptions['anchorPlacement'],
        scrollFadeStart: 'top 80%' // earlier (was top 85%)
    };
    // Khởi tạo / refresh AOS (không override cấu hình mirror từ plugin)
    const initAOS = (opts: Partial<AOS.AosOptions> = {}) => {
        if (!import.meta.client) return;
        const w = window as any;
        const base: AOS.AosOptions = {
            // Faster defaults (was duration:800, delay:100)
            duration: 500, // shorten for snappier feel
            easing: 'ease-out', // a bit punchier start
            once: false,
            mirror: true,
            offset: config.aosOffset,
            anchorPlacement: config.aosAnchorPlacement,
            delay: 40, // minimal base delay
            ...opts
        } as AOS.AosOptions;
        if (!w.__aos_inited) {
            AOS.init(base);
            w.__aos_inited = true;
        } else {
            // Nếu muốn áp dụng options mới mạnh tay: refreshHard, còn không chỉ refresh
            AOS.refresh();
        }
    };

    // Force replay 1 element hoặc selector: remove class để AOS áp dụng lại
    const replayAOS = (el?: Element | string) => {
        if (!import.meta.client) return;
        const targets: Element[] = !el
            ? Array.from(document.querySelectorAll('[data-aos]'))
            : typeof el === 'string'
              ? Array.from(document.querySelectorAll(el))
              : [el];
        targets.forEach((t) => t.classList.remove('aos-animate'));
        // reflow nhỏ
        void document.body.offsetHeight;
        AOS.refresh();
    };

    // Khởi tạo GSAP animations
    const initGSAP = () => {
        // Cấu hình GSAP
        gsap.config({
            nullTargetWarn: false
        });

        // Animation mặc định cho các phần tử khi trang được tải
        gsap.fromTo(
            '.fade-in',
            { opacity: 0, y: 16 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5, // faster (was 0.8)
                stagger: 0.08,
                ease: 'power2.out'
            }
        );

        // Hero section animation
        gsap.fromTo(
            '.hero-title',
            { opacity: 0, y: 42 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7, // faster (was 1)
                ease: 'power3.out'
            }
        );

        gsap.fromTo(
            '.hero-text',
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.6, // was 1
                delay: 0.2, // was 0.3
                ease: 'power2.out'
            }
        );

        gsap.fromTo(
            '.hero-btn',
            { opacity: 0, y: 16 },
            {
                opacity: 1,
                y: 0,
                duration: 0.25, // was 0.3
                delay: 0.2, // was 0.3
                ease: 'back.out'
            }
        );

        // Scroll animations
        ScrollTrigger.batch('.scroll-fade-up', {
            onEnter: (elements) => {
                gsap.to(elements, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.25, // faster
                    ease: 'power2.out'
                });
            },
            start: config.scrollFadeStart
        });

        // Card hover effects
        const cards = document.querySelectorAll('.game-card, .tournament-card');
        cards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.03,
                    boxShadow: '0 15px 30px rgba(0,0,0,0.22)',
                    duration: 0.22
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    boxShadow: '0 5px 15px rgba(0,0,0,0.12)',
                    duration: 0.22
                });
            });
        });
    };

    // Refresh animations khi component được mount
    const refreshAnimations = () => {
        if (import.meta.client) {
            AOS.refresh();
            ScrollTrigger.refresh();
        }
    };

    // Cleanup khi component unmount
    const cleanupAnimations = () => {
        if (import.meta.client) {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        }
    };

    // Các animation tùy chỉnh
    const animateCounter = (
        element: string,
        end: number,
        duration: number = 2
    ) => {
        const el = document.querySelector(element);
        if (!el) return;

        let startValue = 0;
        const increment = end / (duration * 60); // 60fps

        const updateCounter = () => {
            startValue += increment;
            if (startValue < end) {
                el.textContent = Math.ceil(startValue).toString();
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = end.toString();
            }
        };

        updateCounter();
    };

    // Hiệu ứng parallax
    const initParallax = () => {
        const parallaxElements = document.querySelectorAll('.parallax');

        parallaxElements.forEach((element) => {
            const speed = parseFloat(
                element.getAttribute('data-speed') || '0.5'
            );

            gsap.to(element, {
                y: () => window.innerHeight * speed * -1,
                ease: 'none',
                scrollTrigger: {
                    trigger: element.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    };

    // Khởi tạo tất cả animations khi component được mount
    onMounted(() => {
        if (import.meta.client) {
            initAOS(); // sẽ chỉ init lần đầu, còn lại refresh
            initGSAP();
            initParallax();
        }
    });

    // Cleanup khi component unmount
    onUnmounted(() => {
        if (import.meta.client) {
            cleanupAnimations();
        }
    });

    // Public helper to adjust trigger behavior at runtime
    const configureAnimationTriggers = (opts: {
        aosOffset?: number;
        fadeStartPercent?: number; // 0-100 viewport percent
        anchorPlacement?: AOS.AosOptions['anchorPlacement'];
    }) => {
        if (typeof opts.aosOffset === 'number')
            config.aosOffset = opts.aosOffset;
        if (typeof opts.fadeStartPercent === 'number') {
            const p = Math.min(100, Math.max(0, opts.fadeStartPercent));
            config.scrollFadeStart = `top ${p}%`;
        }
        if (opts.anchorPlacement)
            config.aosAnchorPlacement = opts.anchorPlacement;
        // Re-init (will just refresh after first time)
        initAOS();
        ScrollTrigger.refresh();
    };

    return {
        initAOS,
        initGSAP,
        refreshAnimations,
        cleanupAnimations,
        animateCounter,
        initParallax,
        replayAOS,
        configureAnimationTriggers
    };
};
