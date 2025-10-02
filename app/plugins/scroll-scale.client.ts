import { defineNuxtPlugin } from "#app";
import type { DirectiveBinding } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin (idempotent guard)
if (typeof window !== "undefined" && !gsap.getById?.("__st_reg__")) {
  gsap.registerPlugin(ScrollTrigger);
  // marker tween just to tag registration (optional minimal)
  gsap.to({}, { id: "__st_reg__", duration: 0 });
}

interface ScrollScaleOptions {
  start?: number;
  end?: number;
  startTrigger?: string;
  endTrigger?: string;
  ease?: string;
  scrub?: boolean | number;
  transformOrigin?: string;
  markers?: boolean;
  blurStart?: number; // px blur at beginning
  blurEnd?: number; // px blur at end
  opacityStart?: number; // only used by reveal directive
  opacityEnd?: number; // only used by reveal directive
}

const setup = (
  el: HTMLElement,
  binding: DirectiveBinding<ScrollScaleOptions | undefined>
) => {
  if (typeof window === "undefined") return;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) return;

  const dataset = el.dataset;
  const opts: ScrollScaleOptions = {
    start:
      binding.value?.start ?? parseFloat(dataset.scrollScaleStart || "1.3"),
    end: binding.value?.end ?? parseFloat(dataset.scrollScaleEnd || "1"),
    startTrigger:
      binding.value?.startTrigger ||
      dataset.scrollScaleStartTrigger ||
      "top 85%",
    endTrigger:
      binding.value?.endTrigger || dataset.scrollScaleEndTrigger || "top 35%",
    ease: binding.value?.ease || dataset.scrollScaleEase || "power2.out",
    scrub:
      binding.value?.scrub ??
      (dataset.scrollScaleScrub
        ? dataset.scrollScaleScrub === "true"
          ? true
          : parseFloat(dataset.scrollScaleScrub)
        : true),
    transformOrigin:
      binding.value?.transformOrigin ||
      dataset.scrollScaleOrigin ||
      "center center",
    markers: binding.value?.markers ?? dataset.scrollScaleMarkers === "true",
    blurStart:
      binding.value?.blurStart ??
      parseFloat(
        dataset.scrollScaleBlurStart || dataset.scrollScaleBlur || "4"
      ),
    blurEnd:
      binding.value?.blurEnd ?? parseFloat(dataset.scrollScaleBlurEnd || "0"),
  };

  // Avoid duplicate trigger
  const existing = (el as any).__scrollScaleTrigger as
    | ScrollTrigger
    | undefined;
  if (existing) {
    existing.kill();
  }

  gsap.set(el, {
    scale: opts.start,
    filter: `blur(${opts.blurStart}px)`,
    transformOrigin: opts.transformOrigin,
  });
  const tween = gsap.to(el, {
    scale: opts.end,
    filter: `blur(${opts.blurEnd}px)`,
    ease: opts.ease,
    scrollTrigger: {
      trigger: el,
      start: opts.startTrigger,
      end: opts.endTrigger,
      scrub: opts.scrub,
      markers: opts.markers,
      invalidateOnRefresh: true,
    },
  });
  (el as any).__scrollScaleTrigger = tween.scrollTrigger;
};

const cleanup = (el: HTMLElement) => {
  const trigger: ScrollTrigger | undefined = (el as any).__scrollScaleTrigger;
  if (trigger) {
    trigger.kill();
    delete (el as any).__scrollScaleTrigger;
  }
};

// reveal scale directive (opacity + scale + optional blur)
const setupReveal = (
  el: HTMLElement,
  binding: DirectiveBinding<ScrollScaleOptions | undefined>
) => {
  if (typeof window === "undefined") return;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) return;
  const ds = el.dataset;
  const opts: ScrollScaleOptions = {
    start: binding.value?.start ?? parseFloat(ds.revealScaleStart || "1.15"),
    end: binding.value?.end ?? parseFloat(ds.revealScaleEnd || "1"),
    startTrigger:
      binding.value?.startTrigger || ds.revealScaleStartTrigger || "top 88%",
    endTrigger:
      binding.value?.endTrigger || ds.revealScaleEndTrigger || "top 55%",
    ease: binding.value?.ease || ds.revealScaleEase || "power2.out",
    scrub:
      binding.value?.scrub ??
      (ds.revealScaleScrub
        ? ds.revealScaleScrub === "true"
          ? true
          : parseFloat(ds.revealScaleScrub)
        : true),
    transformOrigin:
      binding.value?.transformOrigin || ds.revealScaleOrigin || "center center",
    markers: binding.value?.markers ?? ds.revealScaleMarkers === "true",
    blurStart:
      binding.value?.blurStart ??
      parseFloat(ds.revealScaleBlurStart || ds.revealScaleBlur || "6"),
    blurEnd: binding.value?.blurEnd ?? parseFloat(ds.revealScaleBlurEnd || "0"),
    opacityStart:
      binding.value?.opacityStart ??
      parseFloat(ds.revealScaleOpacityStart || "0"),
    opacityEnd:
      binding.value?.opacityEnd ?? parseFloat(ds.revealScaleOpacityEnd || "1"),
  };
  const existing = (el as any).__revealScaleTrigger as
    | ScrollTrigger
    | undefined;
  if (existing) existing.kill();
  gsap.set(el, {
    scale: opts.start,
    opacity: opts.opacityStart,
    filter: `blur(${opts.blurStart}px)`,
    transformOrigin: opts.transformOrigin,
  });
  const tween = gsap.to(el, {
    scale: opts.end,
    opacity: opts.opacityEnd,
    filter: `blur(${opts.blurEnd}px)`,
    ease: opts.ease,
    scrollTrigger: {
      trigger: el,
      start: opts.startTrigger,
      end: opts.endTrigger,
      scrub: opts.scrub,
      markers: opts.markers,
      invalidateOnRefresh: true,
    },
  });
  (el as any).__revealScaleTrigger = tween.scrollTrigger;
};

const cleanupReveal = (el: HTMLElement) => {
  const trigger: ScrollTrigger | undefined = (el as any).__revealScaleTrigger;
  if (trigger) {
    trigger.kill();
    delete (el as any).__revealScaleTrigger;
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("scroll-scale", {
    mounted(el, binding) {
      requestAnimationFrame(() => setup(el, binding));
    },
    updated: setup,
    beforeUnmount: cleanup,
  });
  nuxtApp.vueApp.directive("scroll-reveal-scale", {
    mounted(el, binding) {
      requestAnimationFrame(() => setupReveal(el, binding));
    },
    updated(el, b) {
      setupReveal(el, b);
    },
    beforeUnmount: cleanupReveal,
  });
});
