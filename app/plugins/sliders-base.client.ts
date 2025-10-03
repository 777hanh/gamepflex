// Core Swiper initializations cloned from original static template (phase 1)
import { Swiper } from 'swiper';
import {
    Navigation,
    Autoplay,
    EffectCoverflow,
    FreeMode
} from 'swiper/modules';

export default () => {
    if (typeof window === 'undefined') return;
    Swiper.use([Navigation, Autoplay, EffectCoverflow, FreeMode]);

    const initWhenReady = (selector: string, init: () => void) => {
        if (document.querySelector(selector)) {
            init();
            return;
        }
        const mo = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                try {
                    init();
                } catch {
                    /* silent */
                }
                mo.disconnect();
            }
        });
        mo.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    };

    // 3D swiper
    initWhenReady('.swiper-3d-container', () => {
        new Swiper('.swiper-3d-container', {
            slidesPerView: 'auto',
            loop: true,
            centeredSlides: true,
            speed: 1000,
            freeMode: true,
            effect: 'coverflow',
            autoplay: { delay: 3000 },
            coverflowEffect: {
                rotate: 1,
                stretch: 50,
                depth: 90,
                modifier: 1,
                slideShadows: false
            },
            navigation: {
                prevEl: '.swiper-3d-button-prev',
                nextEl: '.swiper-3d-button-next'
            },
            breakpoints: {
                1400: { slidesPerView: 4 },
                1024: { slidesPerView: 3 },
                768: { slidesPerView: 2.4 },
                640: { slidesPerView: 2 }
            }
        });
    });

    // Top player slider (raw fidelity config: auto all viewports, smoother loop)
    initWhenReady('.swiper-top-player', () => {
        new Swiper('.swiper-top-player', {
            slidesPerView: 'auto',
            loop: true,
            centeredSlides: true,
            spaceBetween: 24,
            freeMode: true,
            speed: 1000,
            autoplay: { delay: 2000 },
            navigation: {
                prevEl: '.top-player-prev',
                nextEl: '.top-player-next'
            }
            // No breakpoints: maintain auto across all screens
        });
    });

    // Game swiper 1
    initWhenReady('.game-swiper', () => {
        new Swiper('.game-swiper', {
            slidesPerView: 1,
            loop: true,
            spaceBetween: 24,
            speed: 1000,
            freeMode: true,
            autoplay: { delay: 2000 },
            pagination: { el: '.game-swiper-pagination', clickable: true },
            breakpoints: {
                1200: { slidesPerView: 4 },
                992: { slidesPerView: 3 },
                575: { slidesPerView: 2 }
            }
        });
    });

    // Game swiper 2
    initWhenReady('.game-swiper2', () => {
        new Swiper('.game-swiper2', {
            slidesPerView: 1,
            loop: true,
            spaceBetween: 24,
            speed: 5000,
            freeMode: true,
            autoplay: { delay: 1 },
            pagination: { el: '.game-swiper-pagination', clickable: true },
            breakpoints: {
                1400: { slidesPerView: 6 },
                1024: { slidesPerView: 4 },
                768: { slidesPerView: 3 },
                575: { slidesPerView: 2 }
            }
        });
    });

    // Banner vertical swiper
    initWhenReady('.banner-swiper', () => {
        new Swiper('.banner-swiper', {
            direction: 'vertical',
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 1000,
            autoplay: { delay: 2000 },
            pagination: { el: '.banner-swiper-pagination', clickable: true }
        });
    });
};
