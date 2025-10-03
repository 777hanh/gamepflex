// Clone title & content animations from gsap-customization.js (original template)
// Using SplitText plugin with exact same config as static HTML
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// @ts-expect-error - SplitText is GSAP Club plugin
import { SplitText } from 'gsap/SplitText';

export default defineNuxtPlugin(() => {
    if (!import.meta.client) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const initTextAnimations = () => {
        // 03 -> title animation (clone from original)
        const titleElements = document.querySelectorAll('.title-anim');
        if (titleElements && titleElements.length > 0) {
            const char_come = gsap.utils.toArray('.title-anim');
            char_come.forEach((element: any) => {
                const char_come_el = element as HTMLElement;
                const split_char = new SplitText(char_come_el, {
                    type: 'chars, words',
                    lineThreshold: 0.5
                });
                const tl2 = gsap.timeline({
                    scrollTrigger: {
                        trigger: char_come_el,
                        start: 'top 90%',
                        end: 'bottom 60%',
                        scrub: false,
                        markers: false,
                        toggleActions: 'play none none none'
                    }
                });
                tl2.from(split_char.chars, {
                    duration: 0.8,
                    x: 70,
                    autoAlpha: 0,
                    stagger: 0.03
                });
            });
        }

        // 04 -> content animation (clone from original)
        const contentElements = document.querySelectorAll('.content-anim');
        if (contentElements && contentElements.length > 0) {
            const char_come = gsap.utils.toArray('.content-anim');
            char_come.forEach((element: any) => {
                const char_come_el = element as HTMLElement;
                const split_char = new SplitText(char_come_el, {
                    type: 'chars, words',
                    lineThreshold: 0.5
                });
                const tl2 = gsap.timeline({
                    scrollTrigger: {
                        trigger: char_come_el,
                        start: 'top 90%',
                        end: 'bottom 60%',
                        scrub: false,
                        markers: false,
                        toggleActions: 'play none none none'
                    }
                });
                tl2.from(split_char.chars, {
                    duration: 0.4,
                    x: 70,
                    autoAlpha: 0,
                    stagger: 0.03
                });
            });
        }
    };

    // Delay init để đảm bảo DOM đã render xong
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initTextAnimations, 200);
        });
    } else {
        setTimeout(initTextAnimations, 200);
    }

    // Re-init sau mỗi route change (cho dynamic content)
    const nuxtApp = useNuxtApp();
    nuxtApp.hook('page:finish', () => {
        setTimeout(() => {
            ScrollTrigger.refresh();
            initTextAnimations();
        }, 300);
    });
});
