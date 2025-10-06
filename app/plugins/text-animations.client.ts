// Clone title & content animations from gsap-customization.js (original template)
// Using SplitText plugin with exact same config as static HTML
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - SplitText is GSAP Club plugin
import { SplitText } from 'gsap/SplitText';

export default defineNuxtPlugin(() => {
    if (!import.meta.client) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Track animated elements to prevent double-init
    const animatedElements = new WeakSet<HTMLElement>();

    const animateTitleElement = (element: HTMLElement) => {
        if (animatedElements.has(element)) return;
        animatedElements.add(element);

        console.log('[Text Animations] Animating title:', element);
        element.setAttribute('data-split-init', 'true');

        const split_char = new SplitText(element, {
            type: 'chars, words',
            lineThreshold: 0.5
        });

        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: element,
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
    };

    const initTextAnimations = () => {
        // 03 -> title animation (clone from original)
        const titleElements = document.querySelectorAll('.title-anim');
        if (titleElements && titleElements.length > 0) {
            console.log(
                '[Text Animations] Found',
                titleElements.length,
                'title elements'
            );
            titleElements.forEach((el) =>
                animateTitleElement(el as HTMLElement)
            );
        } else {
            console.log('[Text Animations] No title elements found');
        }

        // 04 -> content animation (clone from original)
        const contentElements = document.querySelectorAll('.content-anim');
        if (contentElements && contentElements.length > 0) {
            console.log(
                '[Text Animations] Found',
                contentElements.length,
                'content elements'
            );
            contentElements.forEach((el) =>
                animateContentElement(el as HTMLElement)
            );
        } else {
            console.log('[Text Animations] No content elements found');
        }
    };

    const animateContentElement = (element: HTMLElement) => {
        if (animatedElements.has(element)) return;
        animatedElements.add(element);

        console.log('[Text Animations] Animating content:', element);
        element.setAttribute('data-split-init', 'true');

        const split_char = new SplitText(element, {
            type: 'chars, words',
            lineThreshold: 0.5
        });

        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: element,
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
    };

    // MutationObserver to detect new elements when components mount
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const element = node as HTMLElement;

                    // Check if the added node itself has the class
                    if (element.classList.contains('title-anim')) {
                        console.log(
                            '[Text Animations] New title element detected via MutationObserver'
                        );
                        setTimeout(() => animateTitleElement(element), 100);
                    }
                    if (element.classList.contains('content-anim')) {
                        console.log(
                            '[Text Animations] New content element detected via MutationObserver'
                        );
                        setTimeout(() => animateContentElement(element), 100);
                    }

                    // Check children
                    const titleChildren =
                        element.querySelectorAll('.title-anim');
                    const contentChildren =
                        element.querySelectorAll('.content-anim');

                    if (titleChildren.length > 0) {
                        console.log(
                            '[Text Animations] Found',
                            titleChildren.length,
                            'new title elements in mounted component'
                        );
                        titleChildren.forEach((el) => {
                            setTimeout(
                                () => animateTitleElement(el as HTMLElement),
                                100
                            );
                        });
                    }

                    if (contentChildren.length > 0) {
                        console.log(
                            '[Text Animations] Found',
                            contentChildren.length,
                            'new content elements in mounted component'
                        );
                        contentChildren.forEach((el) => {
                            setTimeout(
                                () => animateContentElement(el as HTMLElement),
                                100
                            );
                        });
                    }
                }
            });
        });
    });

    // Wait for DOM to be fully ready
    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            () => {
                console.log('[Text Animations] DOM loaded, waiting 300ms');
                setTimeout(() => {
                    initTextAnimations();
                    // Start watching for new elements
                    observer.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                    console.log('[Text Animations] MutationObserver started');
                }, 300);
            },
            { once: true }
        );
    } else {
        console.log('[Text Animations] DOM already loaded, waiting 300ms');
        setTimeout(() => {
            initTextAnimations();
            // Start watching for new elements
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            console.log('[Text Animations] MutationObserver started');
        }, 300);
    }

    // Re-init sau route change
    const nuxtApp = useNuxtApp();
    nuxtApp.hook('page:finish', () => {
        console.log('[Text Animations] Page finished, re-initializing');
        // Clean up old ScrollTriggers for split text
        ScrollTrigger.getAll().forEach((trigger) => {
            const el = trigger.vars.trigger as HTMLElement;
            if (
                el &&
                (el.classList.contains('title-anim') ||
                    el.classList.contains('content-anim'))
            ) {
                trigger.kill();
            }
        });
        // Re-scan after route change
        setTimeout(initTextAnimations, 300);
    });
});
