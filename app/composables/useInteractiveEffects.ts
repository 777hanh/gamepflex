import { onMounted, onBeforeUnmount } from 'vue';
// dynamic optional import compatibility
import type { gsap as GsapType } from 'gsap';
import { storeToRefs } from 'pinia';
import { useEffectsConfig } from '../stores/effectsConfig';

interface CounterEl extends HTMLElement {
    dataset: { target?: string; counted?: string };
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
}

function initGsapCounters() {
    const g = (window as any).gsap as typeof GsapType | undefined;
    if (!g) return;
    const els = Array.from(
        document.querySelectorAll<HTMLElement>('.counter[data-target]')
    );
    if (!els.length) return;
    els.forEach((el) => {
        const target = Number(el.dataset.target || '0');
        const obj = { val: 0 };
        let triggered = false;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !triggered) {
                        triggered = true;
                        g.to(obj, {
                            val: target,
                            duration: 1.4,
                            ease: 'power2.out',
                            onUpdate: () => {
                                el.textContent = Math.floor(obj.val).toString();
                            }
                        });
                        io.unobserve(el);
                    }
                });
            },
            { threshold: 0.3 }
        );
        io.observe(el);
    });
}

function initCounters() {
    const counters = Array.from(
        document.querySelectorAll<CounterEl>('.counter')
    );
    if (!counters.length) return;
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target as CounterEl;
                    if (el.dataset.counted === '1') return;
                    el.dataset.counted = '1';
                    const target = Number(el.dataset.target || '0');
                    const duration = 1200;
                    const start = performance.now();
                    function update(now: number) {
                        const progress = Math.min((now - start) / duration, 1);
                        el.innerText = Math.floor(progress * target).toString();
                        if (progress < 1) requestAnimationFrame(update);
                    }
                    requestAnimationFrame(update);
                    observer.unobserve(el);
                }
            });
        },
        { threshold: 0.3 }
    );
    counters.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
}

function initParallax() {
    const img = document.querySelector<HTMLElement>('.hero-image');
    if (!img) return;
    function onMove(e: MouseEvent) {
        const { innerWidth, innerHeight } = window;
        const rx = (e.clientX / innerWidth - 0.5) * 10;
        const ry = (e.clientY / innerHeight - 0.5) * -10;
        (img as HTMLElement).style.transform =
            `translate3d(0,0,0) rotateX(${ry}deg) rotateY(${rx}deg)`;
    }
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
}

function initTilt() {
    const cards = Array.from(
        document.querySelectorAll<HTMLElement>(
            '.game-card,.tournament-card,.team-card'
        )
    );
    if (!cards.length) return;
    cards.forEach((card) => {
        if (card.classList.contains('magnetic-depth')) return; // skip depth style cards
        let frame = 0;
        function onMove(e: MouseEvent) {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                const rotateY = (x - 0.5) * 14;
                const rotateX = (0.5 - y) * 14;
                card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
            });
        }
        function onLeave() {
            card.style.transform =
                'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        }
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
    });
    return () =>
        cards.forEach((c) => {
            c.style.transform = '';
            c.replaceWith(c);
        });
}

function initMagnetic() {
    // include nuxt/ui button classes and optional data-magnetic attribute
    const selector =
        '.btn, .magnetic, .player-card, .carousel-item, .ui-button, .u-button, [data-magnetic]';
    const mags = Array.from(document.querySelectorAll<HTMLElement>(selector));
    mags.forEach((el) => {
        const targetEl =
            (el.querySelector('.magnetic-inner') as HTMLElement) || el;
        const strengthAttr = Number(el.dataset.magneticStrength || '1');
        let frame = 0;
        function onMove(e: MouseEvent) {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                const rect = el.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = e.clientX - cx;
                const dy = e.clientY - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = Math.min(rect.width, rect.height) * 0.9;
                const norm = Math.max(0, 1 - dist / maxDist);
                const strength = norm * norm;
                const baseMove = 18 * strengthAttr;
                const baseScale = 0.04 * strengthAttr;
                const tx = (dx / rect.width) * baseMove * strength;
                const ty = (dy / rect.height) * baseMove * strength;
                const scale = 1 + baseScale * strength;
                targetEl.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
            });
        }
        function onLeave() {
            targetEl.style.transform = '';
        }
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
    });
    return () =>
        mags.forEach((m) => {
            m.style.transform = '';
            m.replaceWith(m);
        });
}

function initMagneticDepth() {
    const els = Array.from(
        document.querySelectorAll<HTMLElement>('.magnetic-depth')
    );
    if (!els.length) return;
    els.forEach((el) => {
        const targetEl =
            (el.querySelector('.magnetic-inner') as HTMLElement) || el;
        let raf = 0;
        let current = { rx: 0, ry: 0, tx: 0, ty: 0, scale: 1 };
        let target = { rx: 0, ry: 0, tx: 0, ty: 0, scale: 1 };
        let lastX = 0,
            lastY = 0;
        const ease = Number(el.dataset.depthEase || '0.12');
        const maxRot = Number(el.dataset.depthRot || '18');
        const maxTrans = Number(el.dataset.depthTrans || '14');
        const maxScale = Number(el.dataset.depthScale || '0.035');
        function apply() {
            targetEl.style.transform = `perspective(1000px) rotateX(${current.rx}deg) rotateY(${current.ry}deg) translate(${current.tx}px,${current.ty}px) scale(${current.scale})`;
        }
        function animate() {
            const drx = target.rx - current.rx;
            const dry = target.ry - current.ry;
            const dtx = target.tx - current.tx;
            const dty = target.ty - current.ty;
            const ds = target.scale - current.scale;
            if (
                Math.abs(drx) +
                    Math.abs(dry) +
                    Math.abs(dtx) +
                    Math.abs(dty) +
                    Math.abs(ds) <
                0.002
            ) {
                current = { ...target };
                apply();
                raf = 0;
                return;
            }
            current.rx += drx * ease;
            current.ry += dry * ease;
            current.tx += dtx * ease;
            current.ty += dty * ease;
            current.scale += ds * ease;
            apply();
            raf = requestAnimationFrame(animate);
        }
        function onMove(e: MouseEvent) {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            lastX = x;
            lastY = y;
            const ry = (x - 0.5) * -maxRot;
            const rx = (0.5 - y) * maxRot;
            const strengthEdge =
                Math.max(Math.abs(x - 0.5), Math.abs(y - 0.5)) * 2;
            const scale = 1 + maxScale * strengthEdge;
            const tx = (x - 0.5) * maxTrans * strengthEdge;
            const ty = (y - 0.5) * maxTrans * strengthEdge;
            target = { rx, ry, tx, ty, scale };
            if (!raf) raf = requestAnimationFrame(animate);
        }
        function onLeave() {
            // inertia: project a small additional movement based on last hover position
            const inertiaFactor = 0.25;
            const ry = (lastX - 0.5) * -maxRot * inertiaFactor;
            const rx = (0.5 - lastY) * maxRot * inertiaFactor;
            const tx = (lastX - 0.5) * maxTrans * inertiaFactor;
            const ty = (lastY - 0.5) * maxTrans * inertiaFactor;
            target = {
                rx: 0 + rx,
                ry: 0 + ry,
                tx: 0 + tx,
                ty: 0 + ty,
                scale: 1
            };
            if (!raf)
                raf = requestAnimationFrame(() => {
                    animate();
                    // after short delay, settle to neutral
                    setTimeout(() => {
                        target = { rx: 0, ry: 0, tx: 0, ty: 0, scale: 1 };
                        if (!raf) raf = requestAnimationFrame(animate);
                    }, 80);
                });
        }
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
    });
    return () =>
        els.forEach((el) => {
            const inner =
                (el.querySelector('.magnetic-inner') as HTMLElement) || el;
            inner.style.transform = '';
            el.replaceWith(el);
        });
}

function initParticles() {
    const canvas = document.getElementById(
        'particles-canvas'
    ) as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const PARTICLE_COUNT = Math.min(70, Math.floor((width * height) / 25000));
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 2 + 1
        });
    }
    function resize() {
        width = (canvas as HTMLCanvasElement).width = window.innerWidth;
        height = (canvas as HTMLCanvasElement).height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    function step() {
        (ctx as CanvasRenderingContext2D).clearRect(0, 0, width, height);
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = width;
            else if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            else if (p.y > height) p.y = 0;
            (ctx as CanvasRenderingContext2D).beginPath();
            (ctx as CanvasRenderingContext2D).arc(
                p.x,
                p.y,
                p.r,
                0,
                Math.PI * 2
            );
            (ctx as CanvasRenderingContext2D).fillStyle =
                'rgba(0,200,255,0.55)';
            (ctx as CanvasRenderingContext2D).fill();
        }
        // light linking lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i]!;
                const b = particles[j]!;
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = dx * dx + dy * dy;
                if (dist < 130 * 130) {
                    const o = 1 - dist / (130 * 130);
                    (ctx as CanvasRenderingContext2D).strokeStyle =
                        `rgba(0,180,255,${o * 0.25})`;
                    (ctx as CanvasRenderingContext2D).lineWidth = 1;
                    (ctx as CanvasRenderingContext2D).beginPath();
                    (ctx as CanvasRenderingContext2D).moveTo(a.x, a.y);
                    (ctx as CanvasRenderingContext2D).lineTo(b.x, b.y);
                    (ctx as CanvasRenderingContext2D).stroke();
                }
            }
        }
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    return () => window.removeEventListener('resize', resize);
}

function startPerformanceMonitor(store: ReturnType<typeof useEffectsConfig>) {
    if (!store.autoPerformance || store.performanceReduced) return;
    let last = performance.now();
    let frames = 0;
    let accum = 0;
    function loop(now: number) {
        const delta = now - last;
        last = now;
        frames++;
        accum += delta;
        if (accum >= 1000) {
            const fps = (frames * 1000) / accum;
            if (fps < store.minFps) {
                store.markPerformanceReduced();
                return; // stop monitoring once reduced
            }
            frames = 0;
            accum = 0;
        }
        if (!store.performanceReduced) requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}

export function useInteractiveEffects() {
    const effectsStore = useEffectsConfig();
    const {
        magneticStrength,
        magneticEnabled,
        depthEnabled,
        particlesEnabled,
        performanceReduced
    } = storeToRefs(effectsStore);
    const cleanups: Array<() => void> = [];
    onMounted(() => {
        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;
        startPerformanceMonitor(effectsStore);
        const baseStrength = magneticStrength.value;
        // propagate strength to body dataset for optional styling
        document.documentElement.dataset.magneticStrength =
            String(baseStrength);
        if (effectsStore.gsapCounters) {
            // load gsap counters if gsap present
            setTimeout(() => {
                try {
                    initGsapCounters();
                    (window as any).initGsapCounters = initGsapCounters;
                } catch {
                    /* ignore gsap counter init error */
                }
            }, 60);
        }
        const maybe = [
            effectsStore.gsapCounters ? undefined : initCounters(),
            prefersReduced ||
            !particlesEnabled.value ||
            performanceReduced.value
                ? undefined
                : initParticles(),
            prefersReduced ? undefined : initParallax(),
            prefersReduced ? undefined : initTilt(),
            prefersReduced || !magneticEnabled.value
                ? undefined
                : initMagnetic(),
            prefersReduced || !depthEnabled.value || performanceReduced.value
                ? undefined
                : initMagneticDepth()
        ];
        maybe.forEach((c) => {
            if (typeof c === 'function') cleanups.push(c);
        });
    });
    onBeforeUnmount(() =>
        cleanups.forEach((fn) => {
            try {
                fn();
            } catch {
                /* ignore */
            }
        })
    );
}

let glowInitialized = false;
export function initGlowTrail() {
    if (glowInitialized) return;
    glowInitialized = true;
    const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;
    const el = document.createElement('div');
    el.id = 'glow-trail';
    el.style.cssText =
        'position:fixed;top:0;left:0;width:32px;height:32px;pointer-events:none;z-index:999;mix-blend-mode:screen;border-radius:50%;background:radial-gradient(circle,#49d1ff 0%,rgba(0,140,255,0.15) 60%,transparent 70%);opacity:.0;transition:opacity .4s ease';
    document.body.appendChild(el);
    let x = window.innerWidth / 2,
        y = window.innerHeight / 2;
    let tx = x,
        ty = y;
    function move(e: MouseEvent) {
        tx = e.clientX;
        ty = e.clientY;
        el.style.opacity = '1';
    }
    function loop() {
        x += (tx - x) * 0.15;
        y += (ty - y) * 0.15;
        el.style.transform = `translate(${x - 16}px,${y - 16}px)`;
        requestAnimationFrame(loop);
    }
    window.addEventListener('pointermove', move);
    loop();
}
