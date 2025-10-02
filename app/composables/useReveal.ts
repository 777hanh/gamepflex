import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  selector?: string;
  force?: boolean;
}

export function runRevealOnce(opts: RevealOptions = {}) {
  if (import.meta.server) return;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) return;
  const selector = opts.selector || "[data-reveal]";
  const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
  elements.forEach((el) => {
    if (el.dataset.gsapInit && !opts.force) return;
    el.dataset.gsapInit = "1";
    const anim = el.dataset.reveal || "fade-up";
    const duration = Number(el.dataset.revealDuration || "800") / 1000;
    const ease = el.dataset.revealEase || "power3.out";
    let from: gsap.TweenVars = { autoAlpha: 0 };
    switch (anim) {
      case "fade-left":
        from = { autoAlpha: 0, x: -40 };
        break;
      case "fade-right":
        from = { autoAlpha: 0, x: 40 };
        break;
      case "scale-in":
        from = { autoAlpha: 0, scale: 0.85 };
        break;
      case "fade-up":
      default:
        from = { autoAlpha: 0, y: 40 };
        break;
    }
    gsap.fromTo(el, from, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      ease,
      delay: Number(el.dataset.delay || "0") / 1000,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });
}

export function useReveal() {
  onMounted(() => runRevealOnce());
  return { refresh: () => ScrollTrigger.refresh(), run: runRevealOnce };
}
