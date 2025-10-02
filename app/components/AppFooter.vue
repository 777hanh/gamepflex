<template>
  <footer class="footer bgn-4 bt position-relative" id="footer">
    <div class="footer-character-layer" aria-hidden="true">
      <NuxtImg
        src="/assets/img/hero-character.png"
        alt="character"
        width="900"
        height="900"
        class="footer-character"
      />
    </div>
    <div class="container">
      <div class="grid grid-cols-4">
        <div class="footer-card-area" data-footer-col>
          <div
            class="footer-block accordion-block"
            :class="{ 'is-open': openIndex === 0 }"
          >
            <div class="footer-logo mb-4 d-grid gap-3">
              <NuxtLink to="/" class="d-grid gap-3 text-decoration-none">
                <div class="flogo-1">
                  <NuxtImg
                    src="/assets/img/logo2.png"
                    alt="logo alt"
                    width="160"
                    height="60"
                  />
                </div>
                <div class="flogo-2">
                  <NuxtImg
                    src="/assets/img/logo.png"
                    alt="logo"
                    width="160"
                    height="60"
                  />
                </div>
              </NuxtLink>
            </div>
            <div class="social-links">
              <ul
                class="d-flex align-items-center gap-3 flex-wrap list-unstyled mb-0"
              >
                <li>
                  <a href="#" aria-label="Facebook"
                    ><i class="i-tabler-brand-facebook fs-4"
                  /></a>
                </li>
                <li>
                  <a href="#" aria-label="Twitter"
                    ><i class="i-tabler-brand-twitter fs-4"
                  /></a>
                </li>
                <li>
                  <a href="#" aria-label="YouTube"
                    ><i class="i-tabler-brand-youtube fs-4"
                  /></a>
                </li>
                <li>
                  <a href="#" aria-label="LinkedIn"
                    ><i class="i-tabler-brand-linkedin fs-4"
                  /></a>
                </li>
                <li>
                  <a href="#" aria-label="Instagram"
                    ><i class="i-tabler-brand-instagram fs-4"
                  /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 footer-card-area" data-footer-col>
          <div
            class="footer-block accordion-block"
            :class="{ 'is-open': openIndex === 1 }"
          >
            <button
              class="footer-title btn-reset mb-4 d-flex justify-content-between align-items-center w-100"
              @click="toggle(1)"
            >
              <span>Quick Links</span
              ><i class="i-tabler-chevron-down ms-2 toggle-icon" />
            </button>
            <ul class="footer-list d-grid gap-2 list-unstyled">
              <li>
                <NuxtLink
                  to="/tournaments"
                  class="footer-link d-flex align-items-center"
                  ><i
                    class="i-tabler-chevron-right me-2"
                  />Tournaments</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/games"
                  class="footer-link d-flex align-items-center"
                  ><i class="i-tabler-chevron-right me-2" />Games</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/teams"
                  class="footer-link d-flex align-items-center"
                  ><i class="i-tabler-chevron-right me-2" />Teams</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/faq"
                  class="footer-link d-flex align-items-center"
                  ><i class="i-tabler-chevron-right me-2" />FAQ</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 footer-card-area" data-footer-col>
          <div
            class="footer-block accordion-block"
            :class="{ 'is-open': openIndex === 2 }"
          >
            <button
              class="footer-title btn-reset mb-4 d-flex justify-content-between align-items-center w-100"
              @click="toggle(2)"
            >
              <span>Explore</span
              ><i class="i-tabler-chevron-down ms-2 toggle-icon" />
            </button>
            <ul class="footer-list d-grid gap-2 list-unstyled">
              <li>
                <NuxtLink
                  to="/top-players"
                  class="footer-link d-flex align-items-center"
                  ><i class="i-tabler-chevron-right me-2" />Top
                  Players</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/chat"
                  class="footer-link d-flex align-items-center"
                  ><i class="i-tabler-chevron-right me-2" />Messages</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/profile"
                  class="footer-link d-flex align-items-center"
                  ><i class="i-tabler-chevron-right me-2" />Profile</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 footer-card-area" data-footer-col>
          <div
            class="footer-block accordion-block"
            :class="{ 'is-open': openIndex === 3 }"
          >
            <button
              class="footer-title btn-reset mb-4 d-flex justify-content-between align-items-center w-100"
              @click="toggle(3)"
            >
              <span>Follow Us</span
              ><i class="i-tabler-chevron-down ms-2 toggle-icon" />
            </button>
            <ul class="footer-list d-grid gap-2 list-unstyled">
              <li>
                <a href="#" class="footer-link d-flex align-items-center"
                  ><i class="i-tabler-chevron-right me-2" />Facebook</a
                >
              </li>
              <li>
                <a href="#" class="footer-link d-flex align-items-center"
                  ><i class="i-tabler-chevron-right me-2" />Instagram</a
                >
              </li>
              <li>
                <a href="#" class="footer-link d-flex align-items-center"
                  ><i class="i-tabler-chevron-right me-2" />Twitter</a
                >
              </li>
              <li>
                <a href="#" class="footer-link d-flex align-items-center"
                  ><i class="i-tabler-chevron-right me-2" />LinkedIn</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row pb-3 pt-4 justify-content-between g-2 footer-bottom-line">
        <div
          class="col-xl-4 col-lg-6 order-last order-lg-first small text-muted"
        >
          <span
            >&copy; {{ new Date().getFullYear() }} GamePlex | Designed concept
            inspired by Pixelaxis</span
          >
        </div>
        <div class="col-xl-3 col-lg-5">
          <ul
            class="d-flex align-items-center gap-lg-4 gap-3 list-unstyled m-0 flex-wrap footer-legal"
          >
            <li><NuxtLink to="/terms">Terms & Conditions</NuxtLink></li>
            <li><NuxtLink to="/privacy">Privacy Policy</NuxtLink></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-banner-img" id="footer-banner">
      <NuxtImg
        src="/assets/img/fbanner.png"
        alt="footer banner"
        width="1200"
        height="360"
      />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (import.meta.client) gsap.registerPlugin(ScrollTrigger);
const openIndex = ref<number | null>(null);
function toggle(i: number) {
  if (window.innerWidth >= 992) return; // only accordion on mobile/tablet
  openIndex.value = openIndex.value === i ? null : i;
}
onMounted(() => {
  if (!import.meta.client) return;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) return;
  const footer = document.getElementById("footer");
  if (!footer) return;
  const character = footer.querySelector(
    ".footer-character"
  ) as HTMLElement | null;
  const cols = gsap.utils.toArray("[data-footer-col]");
  if (character) {
    gsap.fromTo(
      character,
      { scale: 1.25, yPercent: 8, opacity: 0.28, filter: "blur(2px)" },
      {
        scale: 0.6,
        yPercent: -4,
        opacity: 0.1,
        filter: "blur(0px)",
        ease: "power2.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 100%",
          end: "top 35%",
          scrub: true,
        },
      }
    );
  }
  gsap.from(cols, {
    opacity: 0,
    y: 28,
    stagger: 0.15,
    duration: 0.7,
    ease: "power3.out",
    scrollTrigger: { trigger: footer, start: "top 85%" },
  });
});
</script>

<style scoped>
.footer {
  padding: 80px 0 50px;
  background: radial-gradient(circle at 30% 20%, #151b25, #0d0f14 60%);
  color: #d1d7e0;
}
.footer-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.5px;
}
.footer-link {
  color: #96a2b3;
  font-size: 0.9rem;
  transition: color 0.3s, transform 0.3s;
  text-decoration: none;
}
.footer-link:hover {
  color: #00b4ff;
  transform: translateX(4px);
}
.social-links a {
  color: #fff;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: background 0.35s, color 0.35s;
}
.social-links a:hover {
  background: #00b4ff;
  color: #081018;
}
.footer-block {
  padding: 32px 0 10px;
}
.footer-card-area {
  position: relative;
}
.footer-bottom-line {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.footer-legal a {
  color: #96a2b3;
  font-size: 0.8rem;
}
.footer-legal a:hover {
  color: #00b4ff;
}
.flogo-1,
.flogo-2 img {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
}
.footer-banner-img {
  position: absolute;
  inset: auto 0 0 0;
  opacity: 0.18;
  pointer-events: none;
  display: flex;
  justify-content: center;
}
.footer-banner-img img {
  max-width: 1000px;
  width: 100%;
  object-fit: contain;
}
.footer-character-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.footer-character {
  max-width: 880px;
  opacity: 0.25;
  mix-blend-mode: screen;
  transform-origin: center center;
}
.btn-reset {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-align: left;
  color: #fff;
}
.accordion-block .footer-list {
  max-height: 400px;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.65, 0.05, 0.36, 1);
}
@media (max-width: 991.98px) {
  .accordion-block:not(.is-open) .footer-list {
    max-height: 0;
  }
  .toggle-icon {
    transition: transform 0.4s ease;
  }
  .accordion-block.is-open .toggle-icon {
    transform: rotate(180deg);
  }
}
@media (max-width: 991.98px) {
  .footer {
    padding: 60px 0 40px;
  }
}
</style>
