// Clone VanillaTilt effect from gsap-customization.js (original template)
// Using official VanillaTilt library with exact same config as static HTML
import VanillaTilt from 'vanilla-tilt';

export default defineNuxtPlugin((nuxtApp) => {
    if (!import.meta.client) return;

    const initTilt = () => {
        // 05 -> card tilt animation (clone from original)
        const cardtilt = document.querySelectorAll('.card-tilt');
        if (cardtilt && cardtilt.length > 0) {
            VanillaTilt.init(Array.from(cardtilt) as HTMLElement[], {
                max: 5,
                speed: 3000
            });
        }

        const cardtilt2 = document.querySelectorAll('.card-tilt2');
        if (cardtilt2 && cardtilt2.length > 0) {
            VanillaTilt.init(Array.from(cardtilt2) as HTMLElement[], {
                max: 30,
                speed: 300,
                glare: true,
                'max-glare': 0.5,
                'glare-prerender': false,
                axis: 'x',
                scale: 2.1,
                startY: 0
            });
        }
    };

    // OPTIMIZED: Giảm delay
    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            () => setTimeout(initTilt, 100),
            { once: true }
        );
    } else {
        setTimeout(initTilt, 100);
    }

    // Re-init sau route change - OPTIMIZED
    nuxtApp.hook('app:mounted', () => {
        console.log('[Cursor] App mounted, starting initialization...');
        // Small delay to ensure Vue finished rendering
        setTimeout(initTilt, 100);
    });

    // Wait for Nuxt app fully mounted
    nuxtApp.hook('page:finish', () => {
        setTimeout(initTilt, 100);
    });
});
