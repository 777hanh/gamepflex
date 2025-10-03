// Custom cursor effect plugin replicating original static template behavior.
// Adds scaling variants based on hovered element classes: growUp, growDown, growDown2
// Elements must also have cursor-scale class to activate.
export default defineNuxtPlugin(() => {
    if (!import.meta.client) return;
    const cursor = document.querySelector<HTMLElement>('.cursor');
    if (!cursor) return;

    // Ensure base positioning uses left/top so transform is free for scale classes
    cursor.style.willChange = 'left, top, transform';

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Real-time (no smoothing) update loop using rAF
    const loop = () => {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    window.addEventListener(
        'mousemove',
        (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        },
        { passive: true }
    );

    const BIG = 'big-cursor';
    const SMALL = 'small-cursor';
    const SMALL2 = 'small-cursor2';

    const resetClasses = () => {
        cursor.classList.remove(BIG, SMALL, SMALL2);
    };

    const applyFor = (el: Element) => {
        if (!el.classList.contains('cursor-scale')) return;
        resetClasses();
        if (el.classList.contains('growUp')) cursor.classList.add(BIG);
        else if (el.classList.contains('growDown')) cursor.classList.add(SMALL);
        else if (el.classList.contains('growDown2'))
            cursor.classList.add(SMALL2);
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
            resetClasses();
        }
    });

    // Hide on touch devices automatically
    const touchHandler = () => {
        cursor.style.display = 'none';
        document.removeEventListener('touchstart', touchHandler);
    };
    document.addEventListener('touchstart', touchHandler, { passive: true });
});
