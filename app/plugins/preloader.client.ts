// Preloader hide after delay matching original template
export default () => {
    if (typeof window === 'undefined') return;
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            const pre = document.querySelector(
                '.preloader'
            ) as HTMLElement | null;
            if (pre) pre.style.display = 'none';
        }, 1000);
    });
};
