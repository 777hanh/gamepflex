// Navbar/search/profile/wallet/notification/chat list toggle logic cloned from original jQuery version
// Phase 1 keeps jQuery style selectors but re-written vanilla for lighter dependency usage later
export default () => {
    if (typeof window === 'undefined') return;

    const on = (sel: string, evt: string, fn: (e: Event) => void) => {
        document
            .querySelectorAll(sel)
            .forEach((el) => el.addEventListener(evt, fn));
    };

    // Navbar toggle
    on('.navbar-toggle-btn', 'click', () => {
        document.querySelector('.navbar-toggle-item')?.classList.toggle('open');
        document.querySelector('.navbar-toggle-btn')?.classList.toggle('open');
    });

    // Scroll header fixed
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header-section');
        if (!header) return;
        if (window.scrollY < 50) header.classList.remove('fixed-header');
        else header.classList.add('fixed-header');
    });

    // Search toggle
    on('.search-toggle-btn', 'click', () => {
        document.querySelector('.search-bar')?.classList.toggle('open');
    });

    // Wallet toggle
    on('.wallet-btn', 'click', () => {
        document
            .querySelector('.connect-wallet-section')
            ?.classList.toggle('active');
    });
    on('.wallet-close-btn', 'click', () => {
        document
            .querySelector('.connect-wallet-section')
            ?.classList.toggle('active');
    });
    on('.connect-wallet-overlay', 'click', (e) => {
        if (
            e.target instanceof HTMLElement &&
            e.target.classList.contains('connect-wallet-overlay')
        ) {
            document
                .querySelector('.connect-wallet-section')
                ?.classList.toggle('active');
        }
    });

    // Notification toggle
    on('.ntf-btn', 'click', () => {
        document.querySelector('.notification-area')?.classList.toggle('open');
    });

    // Profile popup toggle
    on('.header-profile', 'click', () => {
        document.querySelector('.user-account-popup')?.classList.toggle('open');
    });

    // Chat list toggle
    on('.chat-list-toggle-btn', 'click', () => {
        document.querySelector('.chat-list-area')?.classList.toggle('open');
    });

    // Global click hide logic
    document.addEventListener('click', (event) => {
        const t = event.target as HTMLElement;
        const outside = (sel: string, btn: string) =>
            !t.closest(sel) && !t.closest(btn);
        if (outside('.navbar-toggle-item', '.navbar-toggle-btn')) {
            document
                .querySelector('.navbar-toggle-item')
                ?.classList.remove('open');
            document
                .querySelector('.navbar-toggle-btn')
                ?.classList.remove('open');
        }
        if (outside('.search-bar', '.search-toggle-btn'))
            document.querySelector('.search-bar')?.classList.remove('open');
        if (outside('.notification-area', '.ntf-btn'))
            document
                .querySelector('.notification-area')
                ?.classList.remove('open');
        if (outside('.user-account-popup', '.header-profile'))
            document
                .querySelector('.user-account-popup')
                ?.classList.remove('open');
        if (outside('.chat-list-area', '.chat-list-toggle-btn'))
            document.querySelector('.chat-list-area')?.classList.remove('open');
    });
};
