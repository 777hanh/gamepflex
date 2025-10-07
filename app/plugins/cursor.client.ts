// Custom cursor effect plugin replicating original static template behavior.
// Adds scaling variants based on hovered element classes: growUp, growDown, growDown2
// Elements must also have cursor-scale class to activate.
export default defineNuxtPlugin((nuxtApp) => {
    if (!import.meta.client) return;

    // Wait for DOM to be ready
    const init = () => {
        const cursor = document.querySelector<HTMLElement>('.cursor');
        if (!cursor) {
            console.warn('[Cursor] Element not found, retrying...');
            // Retry after delay in case loading overlay still active
            setTimeout(init, 200);
            return;
        }

        console.log('[Cursor] Element found, initializing...');

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let paused = false;

        // Simple positioning using left/top (margin handles centering)
        const loop = () => {
            if (!paused) {
                cursor.style.left = `${mouseX}px`;
                cursor.style.top = `${mouseY}px`;
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);

        const moveHandler = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', moveHandler, { passive: true });

        const BIG = 'big-cursor';
        const SMALL = 'small-cursor';
        const SMALL2 = 'small-cursor2';

        const resetClasses = () => {
            cursor.classList.remove(BIG, SMALL, SMALL2);
        };

        const applyFor = (el: Element) => {
            if (!el.classList.contains('cursor-scale')) return;
            resetClasses();
            // CSS classes handle transform: scale() - see gameplex-style.css
            if (el.classList.contains('growUp')) {
                cursor.classList.add(BIG); // scale(7) = 280px
            } else if (el.classList.contains('growDown')) {
                cursor.classList.add(SMALL); // scale(4) = 160px
            } else if (el.classList.contains('growDown2')) {
                cursor.classList.add(SMALL2); // scale(2) = 80px
            }
            // else: no class = no scale = 40px default
        };

        const resetClassesWithScale = () => {
            resetClasses();
        };

        // Delegate events instead of binding to every element (better for dynamic content)
        document.addEventListener('mouseover', (e) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;
            if (target.closest('.cursor-scale')) {
                const el = target.closest('.cursor-scale')!;
                applyFor(el);
            }
        });
        document.addEventListener('mouseout', (e) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;
            if (target.closest('.cursor-scale')) {
                resetClassesWithScale();
            }
        });

        // Hide on touch devices automatically
        const touchHandler = () => {
            cursor.style.display = 'none';
            document.removeEventListener('touchstart', touchHandler);
        };
        document.addEventListener('touchstart', touchHandler, {
            passive: true
        });

        // --------- Visibility / Focus handling ---------
        // Some browsers stop rAF automatically, but we explicitly pause to avoid unnecessary work
        const pause = () => {
            paused = true;
            resetClassesWithScale();
            cursor.style.opacity = '0';
        };
        const resume = () => {
            if (cursor.style.display === 'none') return; // suppressed on touch
            paused = false;
            cursor.style.opacity = '1';
            // Safety: center if somehow coordinates unset
            if (Number.isNaN(mouseX) || Number.isNaN(mouseY)) {
                mouseX = window.innerWidth / 2;
                mouseY = window.innerHeight / 2;
            }
        };

        window.addEventListener('blur', pause);
        window.addEventListener('focus', resume);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') pause();
            else resume();
        });

        // Hide when pointer leaves window, show again when re-enter
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            paused = true; // temporarily stop updating position (not critical)
        });
        document.addEventListener('mouseenter', () => {
            paused = false;
            resume();
        });

        console.log('[Cursor] Initialized successfully');
    };

    // Wait for Nuxt app fully mounted
    nuxtApp.hook('app:mounted', () => {
        console.log('[Cursor] App mounted, starting initialization...');
        // Small delay to ensure Vue finished rendering
        setTimeout(init, 200);
    });
});
