import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Optional SplitText plugin (Club) – ignore if not present
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SplitText from 'gsap/SplitText';

export default defineNuxtPlugin(() => {
    if (!import.meta.client) return;

    // Register core plugins asap (file name ensures early load)
    gsap.registerPlugin(ScrollTrigger);
    if (SplitText) {
        try {
            gsap.registerPlugin(SplitText as any);
        } catch {
            /* ignore */
        }
    }

    // ScrollTrigger config - OPTIMIZED for performance
    ScrollTrigger.config({
        autoRefreshEvents: 'visibilitychange', // Chỉ refresh khi tab visible
        limitCallbacks: true // Giới hạn callbacks để tăng performance
    });

    // GSAP performance settings
    gsap.config({
        nullTargetWarn: false,
        force3D: true // Sử dụng GPU acceleration
    });

    console.log('[GSAP Init] Optimized configuration loaded');
});
