// Box hover effect (box-style) + dynamic year
// Supports two modes:
//  A (center mode): add attribute data-ripple-center
//  B (follow pointer): default behavior
export default defineNuxtPlugin(() => {
    if (typeof window === 'undefined') return;

    const applyRipple = (el: HTMLElement, e?: MouseEvent) => {
        if (el.hasAttribute('data-ripple-center')) {
            // Mode A: always center the ripple
            el.style.setProperty('--x', '50%');
            el.style.setProperty('--y', '50%');
            return;
        }
        if (!e) return;
        const rect = el.getBoundingClientRect();
        // Adjust for potential border to keep pseudo centered visually
        const borderFix = 0.5; // tweak if border width changes
        const x = e.clientX - rect.left - borderFix;
        const y = e.clientY - rect.top - borderFix;
        el.style.setProperty('--x', `${x}px`);
        el.style.setProperty('--y', `${y}px`);
    };

    const boxes = document.querySelectorAll<HTMLElement>('.box-style');
    boxes.forEach((el) => {
        // Initialize position so ::before not parked at 0,0 in center-mode
        applyRipple(el);
        el.addEventListener('mousemove', (e: MouseEvent) => applyRipple(el, e));
        el.addEventListener('mouseleave', () => {
            // On leave, for pointer mode freeze last value; for center mode keep centered
            if (el.hasAttribute('data-ripple-center')) {
                el.style.setProperty('--x', '50%');
                el.style.setProperty('--y', '50%');
            }
        });
    });

    // Current year injection
    document.querySelectorAll('.currentYear').forEach((el) => {
        el.textContent = String(new Date().getFullYear());
    });
});
