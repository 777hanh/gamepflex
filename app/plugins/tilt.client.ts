// Clone VanillaTilt effect from gsap-customization.js (original template)
// Using official VanillaTilt library with exact same config as static HTML
import VanillaTilt from 'vanilla-tilt';

export default defineNuxtPlugin(() => {
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

    // Delay init để đảm bảo Swiper & dynamic components đã render xong
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initTilt, 300);
        });
    } else {
        setTimeout(initTilt, 300);
    }

    // Re-init sau mỗi route change (cho dynamic content)
    const nuxtApp = useNuxtApp();
    nuxtApp.hook('page:finish', () => {
        setTimeout(initTilt, 200);
    });
});
