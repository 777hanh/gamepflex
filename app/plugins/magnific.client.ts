// Video popup using magnific-popup (assumes CSS already imported via theme)
export default async () => {
    if (typeof window === 'undefined') return;
    const targets = document.querySelectorAll('.popupvideo');
    if (!targets.length) return;
    const $ = (window as any).$;
    if (!$ || !$.fn) return;
    try {
        $('.popupvideo').magnificPopup({
            disableOn: 300,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    } catch {
        /* silent */
    }
};
