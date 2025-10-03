// Lightweight tilt effect for elements with [data-tilt]
// Intentionally minimal to approximate original template behavior
export default () => {
    if (typeof window === 'undefined') return;
    const maxRotate = 8; // degrees
    const scale = 1.0;
    const dampen = 0.12; // smoothing factor

    const items = Array.from(
        document.querySelectorAll<HTMLElement>('[data-tilt]')
    );

    items.forEach((el) => {
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        let raf: number | null = null;

        const rect = () => el.getBoundingClientRect();

        const animate = () => {
            const dx = targetX - currentX;
            const dy = targetY - currentY;
            currentX += dx * dampen;
            currentY += dy * dampen;
            el.style.transform = `perspective(600px) rotateX(${currentY.toFixed(2)}deg) rotateY(${currentX.toFixed(2)}deg) scale(${scale})`;
            raf = requestAnimationFrame(animate);
        };

        const onEnter = () => {
            if (raf == null) raf = requestAnimationFrame(animate);
            el.style.willChange = 'transform';
            el.style.transition = 'transform 0.25s ease';
        };

        const onMove = (e: MouseEvent) => {
            const r = rect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const percentX = (e.clientX - cx) / (r.width / 2);
            const percentY = (e.clientY - cy) / (r.height / 2);
            targetX = Math.max(-1, Math.min(1, percentX)) * maxRotate;
            targetY = Math.max(-1, Math.min(1, -percentY)) * maxRotate; // invert Y for natural tilt
            el.style.transition = 'transform 0.05s linear';
        };

        const onLeave = () => {
            targetX = 0;
            targetY = 0;
            setTimeout(() => {
                el.style.transition = 'transform 0.6s ease';
            }, 16);
        };

        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
    });
};
