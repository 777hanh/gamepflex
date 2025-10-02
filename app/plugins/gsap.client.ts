import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { defineNuxtPlugin } from "#app";
import { runRevealOnce } from "../composables/useReveal";

gsap.registerPlugin(ScrollTrigger);

export default defineNuxtPlugin(() => {
  if (import.meta.server) return;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (!prefersReduced) {
    requestAnimationFrame(() => runRevealOnce());
    window.addEventListener("resize", () => ScrollTrigger.refresh());
  }
});
