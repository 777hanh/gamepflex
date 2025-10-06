// Custom cursor effect plugin replicating original static template behavior.
// Adds scaling variants based on hovered element classes: growUp, growDown, growDown2
// Elements must also have cursor-scale class to activate.
export default defineNuxtPlugin(() => {
    if (!import.meta.client) return;
    const cursor = document.querySelector<HTMLElement>('.cursor');
    if (!cursor) return;

    // GPU acceleration for sharp rendering at all scales
    cursor.style.willChange = 'transform';
    cursor.style.backfaceVisibility = 'hidden';
    cursor.style.webkitBackfaceVisibility = 'hidden';
    cursor.style.perspective = '1000px';

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Use transform for better performance and sharpness
    let paused = false;
    let currentScale = 1;

    const loop = () => {
        if (!paused) {
            // Use translate3d with centered offset for sharp rendering
            // Separate translate and scale for better rendering quality
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) translateZ(0) scale(${currentScale})`;
        }
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    const moveHandler = (e: MouseEvent | PointerEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    };
    window.addEventListener('mousemove', moveHandler, { passive: true });
    window.addEventListener('pointermove', moveHandler, { passive: true });

    const BIG = 'big-cursor';
    const SMALL = 'small-cursor';
    const SMALL2 = 'small-cursor2';

    const resetClasses = () => {
        cursor.classList.remove(BIG, SMALL, SMALL2);
    };

    const applyFor = (el: Element) => {
        if (!el.classList.contains('cursor-scale')) return;
        resetClasses();
        // Apply scale classes for sharp rendering
        if (el.classList.contains('growUp')) {
            cursor.classList.add(BIG);
            currentScale = 7;
        } else if (el.classList.contains('growDown')) {
            cursor.classList.add(SMALL);
            currentScale = 4;
        } else if (el.classList.contains('growDown2')) {
            cursor.classList.add(SMALL2);
            currentScale = 2;
        }
    };

    const resetClassesWithScale = () => {
        resetClasses();
        currentScale = 1;
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
    document.addEventListener('touchstart', touchHandler, { passive: true });

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

    // Mild fade transition (only if not already defined in CSS)
    if (!cursor.style.transition) {
        cursor.style.transition = 'opacity .25s ease';
    }
});
