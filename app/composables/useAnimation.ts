import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// SplitText may or may not be available – registered early in 00-gsap-init plugin
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SplitText from 'gsap/SplitText';
import AOS from 'aos';

export const useAnimation = () => {
    // Mutable runtime trigger configuration
    const config = {
        aosOffset: 20,
        aosAnchorPlacement: 'top-bottom' as AOS.AosOptions['anchorPlacement'],
        scrollFadeStart: 'top 80%'
    };
    // Registry for SplitText instances
    const splitRegistry: any[] = [];

    // AOS init (mirroring earlier behavior)
    const initAOS = (opts: Partial<AOS.AosOptions> = {}) => {
        if (!import.meta.client) return;
        const w = window as any;
        const base: AOS.AosOptions = {
            duration: 500,
            easing: 'ease-out',
            once: false,
            mirror: true,
            offset: config.aosOffset,
            anchorPlacement: config.aosAnchorPlacement,
            delay: 0.4,
            ...opts
        } as AOS.AosOptions;
        if (!w.__aos_inited) {
            AOS.init(base);
            w.__aos_inited = true;
        } else {
            AOS.refresh();
        }
    };

    // Force replay helper for AOS elements
    const replayAOS = (el?: Element | string) => {
        if (!import.meta.client) return;
        const targets: Element[] = !el
            ? Array.from(document.querySelectorAll('[data-aos]'))
            : typeof el === 'string'
              ? Array.from(document.querySelectorAll(el))
              : [el];
        targets.forEach((t) => t.classList.remove('aos-animate'));
        void document.body.offsetHeight; // reflow
        AOS.refresh();
    };

    // Core splitter (initial + rebuild)
    const setupSplitTitles = () => {
        const elements = Array.from(
            document.querySelectorAll<HTMLElement>(
                '.title-anim:not([data-split-init]), [data-split-type]:not([data-split-init])'
            )
        );
        if (!elements.length) return;
        const hasPlugin = !!(SplitText as any);
        elements.forEach((el) => {
            el.setAttribute('data-split-init', 'true');
            if (!el.getAttribute('data-original-text')) {
                el.setAttribute('data-original-text', el.textContent || '');
            }
            const type = (
                el.getAttribute('data-split-type') || 'words, chars'
            ).toLowerCase();
            const duration = parseFloat(
                el.getAttribute('data-split-duration') || '1'
            );
            const stagger = parseFloat(
                el.getAttribute('data-split-stagger') || '0.05'
            );
            const rawOnce = el.getAttribute('data-split-once');
            const once =
                el.hasAttribute('data-split-once') &&
                rawOnce !== 'false' &&
                rawOnce !== '0';
            const effect = (
                el.getAttribute('data-split-effect') || 'up'
            ).toLowerCase();
            const maskAttr = el.getAttribute('data-split-mask'); // 'lines'

            const effectFrom: any = { autoAlpha: 0 };
            switch (effect) {
                case 'down':
                    effectFrom.y = -100;
                    break;
                case 'fade':
                    effectFrom.y = 0;
                    break;
                case 'scale':
                    effectFrom.y = 0;
                    effectFrom.scale = 0.85;
                    break;
                default:
                    effectFrom.y = 100; // up
            }
            const startAttr = el.getAttribute('data-split-start') || 'top 90%';
            const targetPref = (
                el.getAttribute('data-split-target') || ''
            ).toLowerCase(); // words|chars|lines

            // Helper: if an ancestor is still under AOS control (has data-aos but not yet .aos-animate)
            // we delay the creation of ScrollTrigger to avoid double transforms keeping text off-screen.
            const getAOSAncestor = () =>
                el.closest('[data-aos]') as HTMLElement | null;
            const scheduleAfterAOS = (run: () => void) => {
                const ancestor = getAOSAncestor();
                if (!ancestor) {
                    run();
                    return;
                }
                if (ancestor.classList.contains('aos-animate')) {
                    run();
                    return;
                }
                // Observe class changes
                const obs = new MutationObserver(() => {
                    if (ancestor.classList.contains('aos-animate')) {
                        obs.disconnect();
                        // small next frame to let layout settle
                        requestAnimationFrame(run);
                    }
                });
                obs.observe(ancestor, {
                    attributes: true,
                    attributeFilter: ['class']
                });
                // Safety timeout (fallback)
                setTimeout(() => {
                    if (!ancestor.classList.contains('aos-animate')) {
                        run();
                    }
                }, 900); // typical AOS duration window
            };

            const animateTargets = (targets: Element[]) => {
                // NOTE: Previous version used gsap.set(targets, effectFrom) then gsap.from(...effectFrom)
                // This made the start & end states identical, leaving elements stuck invisible (autoAlpha:0)
                // We now use fromTo with a clear visible end state.
                const toggleActions = once
                    ? 'play none none none'
                    : 'play none play reset'; // replay on re-enter
                const toProps: any = {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration,
                    stagger,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: startAttr,
                        lazy: false, // ensure immediate creation, we already delay manually if needed
                        toggleActions,
                        // Prevent initial render jumping when nested in AOS transformed container
                        immediateRender: false,
                        markers: el.hasAttribute('data-split-debug'),
                        invalidateOnRefresh: true,
                        onEnterBack: (self: any) => {
                            if (!once) self.animation?.restart();
                        },
                        onRefresh: (self: any) => {
                            const r = (
                                el as HTMLElement
                            ).getBoundingClientRect();
                            const vh =
                                window.innerHeight ||
                                document.documentElement.clientHeight;
                            if (
                                r.top < vh &&
                                r.bottom > 0 &&
                                self.progress === 0
                            ) {
                                if (once) {
                                    self.animation?.play(0);
                                } else if (!self.animation?.isActive()) {
                                    self.animation?.restart(true, true);
                                }
                            }
                        }
                    }
                };
                // Apply will-change for better perf (characters already tiny; safe)
                gsap.set(targets, { willChange: 'transform, opacity' });
                const tween = gsap.fromTo(targets, effectFrom, toProps);
                // Nếu đã ở trong viewport tại thời điểm tạo → chạy luôn tránh bị "kẹt" dưới
                const rect = (el as HTMLElement).getBoundingClientRect();
                const vh =
                    window.innerHeight || document.documentElement.clientHeight;
                if (rect.top < vh * 0.9 && rect.bottom > 0) {
                    if (once) tween.play(0);
                    else tween.restart(true, true);
                }
                return tween;
            };

            if (hasPlugin) {
                try {
                    const instance = (SplitText as any).create(el, {
                        type,
                        linesClass: 'gp-line',
                        wordsClass: 'gp-word',
                        charsClass: 'gp-char',
                        ...(maskAttr === 'lines' ? { mask: 'lines' } : {}),
                        onSplit(self: any) {
                            const charsArr = self.chars || [];
                            const wordsArr = self.words || [];
                            const linesArr = self.lines || [];
                            let targets: any[] = [];
                            if (targetPref === 'lines' && linesArr.length) {
                                targets = linesArr;
                            } else if (
                                targetPref === 'words' &&
                                wordsArr.length
                            ) {
                                targets = wordsArr;
                            } else if (
                                targetPref === 'chars' &&
                                charsArr.length
                            ) {
                                targets = charsArr;
                            } else {
                                targets = charsArr.length
                                    ? charsArr
                                    : wordsArr.length
                                      ? wordsArr
                                      : linesArr;
                            }
                            if (!targets.length) return;
                            scheduleAfterAOS(() => animateTargets(targets));
                        }
                    });
                    splitRegistry.push(instance);
                    return; // plugin success
                } catch (e) {
                    console.warn(
                        '[SplitText] plugin failed, fallback manual',
                        e
                    );
                }
            }

            // Manual fallback words+chars
            const original = el.getAttribute('data-original-text') || '';
            el.textContent = '';
            const frag = document.createDocumentFragment();
            const wantWords = type.includes('words');
            const wantChars = type.includes('chars');
            if (wantWords) {
                const parts = original.split(/(\s+)/);
                parts.forEach((token) => {
                    if (token.trim().length === 0) {
                        frag.appendChild(document.createTextNode(token));
                        return;
                    }
                    const wSpan = document.createElement('span');
                    wSpan.className = 'gp-word';
                    wSpan.style.display = 'inline-block';
                    if (wantChars) {
                        [...token].forEach((ch) => {
                            const cSpan = document.createElement('span');
                            cSpan.className = 'gp-char';
                            cSpan.textContent = ch;
                            cSpan.style.display = 'inline-block';
                            cSpan.style.willChange = 'transform, opacity';
                            wSpan.appendChild(cSpan);
                        });
                    } else {
                        wSpan.textContent = token;
                    }
                    frag.appendChild(wSpan);
                });
            } else if (wantChars) {
                [...original].forEach((ch) => {
                    const cSpan = document.createElement('span');
                    cSpan.className = 'gp-char';
                    cSpan.textContent = ch;
                    cSpan.style.display = 'inline-block';
                    cSpan.style.willChange = 'transform, opacity';
                    frag.appendChild(cSpan);
                });
            } else {
                el.textContent = original; // no split type
            }
            el.appendChild(frag);
            let targets = wantChars
                ? Array.from(el.querySelectorAll('.gp-char'))
                : wantWords
                  ? Array.from(el.querySelectorAll('.gp-word'))
                  : [];
            if (targetPref === 'words') {
                targets = Array.from(el.querySelectorAll('.gp-word'));
            } else if (targetPref === 'chars') {
                targets = Array.from(el.querySelectorAll('.gp-char'));
            }
            if (targets.length) scheduleAfterAOS(() => animateTargets(targets));
        });
        ScrollTrigger.refresh();
        requestAnimationFrame(() => ScrollTrigger.refresh());
        // One light rescan for late ClientOnly mount
        setTimeout(() => setupSplitTitles(), 60);
    };

    // Baseline GSAP animations + hovers
    const baselineAnimations = () => {
        // Tránh animate đè lên các heading đã split (có span.gp-char / gp-word)
        const fadeEls = Array.from(
            document.querySelectorAll<HTMLElement>('.fade-in')
        ).filter((el) => !el.querySelector('.gp-char, .gp-word'));
        if (fadeEls.length) {
            gsap.fromTo(
                fadeEls,
                { opacity: 0, y: 16 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: 'power2.out'
                }
            );
        }
        gsap.fromTo(
            '.hero-title',
            { opacity: 0, y: 42 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out'
            }
        );
        gsap.fromTo(
            '.hero-text',
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.6,
                delay: 0.125,
                ease: 'power2.out'
            }
        );
        gsap.fromTo(
            '.hero-btn',
            { opacity: 0, y: 16 },
            {
                opacity: 1,
                y: 0,
                duration: 0.25,
                delay: 0.125,
                ease: 'back.out'
            }
        );
        ScrollTrigger.batch('.scroll-fade-up', {
            onEnter: (elements) => {
                gsap.to(elements, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.25,
                    ease: 'power2.out'
                });
            },
            start: config.scrollFadeStart
        });
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

    // GSAP init orchestrator
    const initGSAP = () => {
        gsap.config({ nullTargetWarn: false });
        setupSplitTitles();
        baselineAnimations();
    };

    // Rebuild (public)
    const rebuildSplits = () => {
        splitRegistry.forEach((inst: any) => {
            try {
                if (inst.revert) inst.revert();
            } catch {
                /* ignore */
            }
        });
        splitRegistry.length = 0;
        document
            .querySelectorAll<HTMLElement>('.title-anim[data-split-init]')
            .forEach((el) => {
                const original = el.getAttribute('data-original-text');
                if (original !== null) el.textContent = original;
                el.removeAttribute('data-split-init');
            });
        setupSplitTitles();
    };

    // Hook router changes (one time) to rebuild splits for new page content
    if (import.meta.client && !(window as any).__split_route_hook) {
        try {
            const router = useRouter();
            router.afterEach(() => {
                setTimeout(() => rebuildSplits(), 80);
            });
            (window as any).__split_route_hook = true;
        } catch {
            /* router may be unavailable in some contexts */
        }
    }

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
            initAOS();
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
        configureAnimationTriggers,
        rebuildSplits
    };
};
