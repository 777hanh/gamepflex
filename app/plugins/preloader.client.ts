// Preloader hide after delay - OPTIMIZED for faster load
export default defineNuxtPlugin(() => {
    if (typeof window === 'undefined') return;

    const hidePreloader = () => {
        const pre = document.querySelector('.preloader') as HTMLElement | null;
        if (pre) {
            pre.style.transition = 'opacity 0.2s ease-out';
            pre.style.opacity = '0';
            setTimeout(() => (pre.style.display = 'none'), 200);
        }
    };

    // Hide nhanh hơn: 300ms thay vì 1000ms
    if (document.readyState === 'loading') {
        window.addEventListener(
            'DOMContentLoaded',
            () => setTimeout(hidePreloader, 300),
            { once: true }
        );
    } else {
        setTimeout(hidePreloader, 100);
    }
});
