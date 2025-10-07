// Core Swiper initializations - optimized for Swiper 12.x
import { Swiper } from 'swiper';
import {
    Navigation,
    Autoplay,
    EffectCoverflow,
    Pagination
} from 'swiper/modules';

export default defineNuxtPlugin((nuxtApp) => {
    if (!import.meta.client) return;

    const swipers = new Map<string, Swiper>();

    const initSwiper = (selector: string, options: any, retryCount = 0) => {
        if (swipers.has(selector)) {
            console.log(`[Swiper] Already initialized: ${selector}`);
            return;
        }

        const el = document.querySelector(selector);
        if (!el) {
            if (retryCount < 5) {
                console.warn(
                    `[Swiper] Element not found: ${selector}, retrying... (${retryCount + 1}/5)`
                );
                setTimeout(
                    () => initSwiper(selector, options, retryCount + 1),
                    300
                );
                return null;
            }
            console.error(
                `[Swiper] Element not found after 5 retries: ${selector}`
            );
            return null;
        }

        try {
            const swiper = new Swiper(selector, {
                ...options,
                // Critical for proper loop behavior in Swiper 12.x
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
                watchOverflow: true,
                watchSlidesProgress: true,
                resistanceRatio: 0.85,
                threshold: 5,
                on: {
                    init: function (this: Swiper) {
                        console.log(`[Swiper] Initialized: ${selector}`, {
                            slides: this.slides.length,
                            slidesPerView: this.params.slidesPerView,
                            loop: this.params.loop,
                            realIndex: this.realIndex,
                            loopedSlides: this.loopedSlides
                        });
                    },
                    slideChange: function (this: Swiper) {
                        console.log(`[Swiper] Slide changed: ${selector}`, {
                            realIndex: this.realIndex,
                            activeIndex: this.activeIndex
                        });
                        // Let Swiper handle active class automatically
                        // Manual override was causing conflicts
                    },
                    loopFix: function (this: Swiper) {
                        console.log(`[Swiper] Loop fix triggered: ${selector}`);
                    },
                    ...options.on
                }
            });

            swipers.set(selector, swiper);
            return swiper;
        } catch (e) {
            console.error(`[Swiper] Init failed for ${selector}:`, e);
            return null;
        }
    };

    // Wait for DOM ready
    const initAll = () => {
        console.log('[Swiper] Starting initialization...');

        // Small delay to ensure Vue components are mounted
        setTimeout(() => {
            // 3D swiper
            initSwiper('.swiper-3d-container', {
                modules: [Navigation, Autoplay, EffectCoverflow],
                slidesPerView: 2,
                spaceBetween: 20,
                loop: true,
                loopAdditionalSlides: 2,
                centeredSlides: true,
                speed: 1000,
                effect: 'coverflow',
                grabCursor: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
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
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 2.4,
                        spaceBetween: 24
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 24
                    },
                    1400: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    }
                }
            });

            // Top player slider - simple grid with loop
            const topPlayerSwiper = initSwiper('.swiper-top-player', {
                modules: [Navigation, Autoplay],
                slidesPerView: 1,
                spaceBetween: 24,
                loop: true,
                loopAdditionalSlides: 2,
                speed: 600,
                grabCursor: true,
                slideToClickedSlide: true,
                centeredSlides: false,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                navigation: {
                    prevEl: '.top-player-prev',
                    nextEl: '.top-player-next'
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 16
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 24
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 24
                    },
                    1440: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                },
                on: {
                    resize: function (this: Swiper) {
                        console.log('[Swiper] Top Player Resized:', {
                            width: this.width,
                            slidesPerView: this.params.slidesPerView,
                            slidesSizesGrid: this.slidesSizesGrid
                        });
                    }
                }
            });

            // Debug: Log container width after init
            if (topPlayerSwiper) {
                console.log(
                    '[Swiper] Top Player Container Width:',
                    document.querySelector('.swiper-top-player')?.clientWidth
                );
            }

            // Game swiper 1
            initSwiper('.game-swiper', {
                modules: [Autoplay, Pagination],
                slidesPerView: 1,
                spaceBetween: 24,
                loop: true,
                loopAdditionalSlides: 2,
                speed: 1000,
                grabCursor: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.game-swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    575: { slidesPerView: 2 },
                    992: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 }
                }
            });

            // Game swiper 2 - continuous scroll
            initSwiper('.game-swiper2', {
                modules: [Autoplay, Pagination],
                slidesPerView: 2,
                spaceBetween: 24,
                loop: true,
                loopAdditionalSlides: 3,
                speed: 3000,
                grabCursor: true,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                    reverseDirection: false
                },
                freeMode: true,
                pagination: {
                    el: '.game-swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    575: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1400: { slidesPerView: 6 }
                }
            });

            // Banner vertical swiper
            initSwiper('.banner-swiper', {
                modules: [Autoplay, Pagination],
                direction: 'vertical',
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                loopAdditionalSlides: 1,
                speed: 1000,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.banner-swiper-pagination',
                    clickable: true
                }
            });
        }, 150); // Small delay for Vue mount
    };

    // Init on Nuxt app mounted - ensures Vue components are ready
    nuxtApp.hook('app:mounted', () => {
        console.log('[Swiper] App mounted, starting initialization...');
        initAll();
    });

    // Cleanup on unmount
    return {
        provide: {
            swipers
        }
    };
});
