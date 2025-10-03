# Legacy Template Migration (Phase 1)

This document tracks the cloning of the original static GamePlex HTML template
into Nuxt.

## Implemented (Phase 1)

- Global utility CSS: spacing/gap/display/position classes extracted.
- Plugins (client-only): preloader, ui toggles, box hover effects, countdown,
  apexcharts (lazy), magnific popup (jQuery dependent), base Swiper sliders.
- jQuery exposed globally for legacy-dependent plugins (will be refactored
  later).

## Next (Phase 2)

- Create raw 3D swiper component or rely fully on DOM-based init (verify markup
  source placement in page component).
- Audit missing classes vs original (e.g., additional spacing variants,
  responsive breakpoints if needed).
- Convert remaining jQuery-esque patterns to composables and Vue components.

## Notes

- ApexCharts dynamically imported; if not installed build will skip silently.
  Add `npm install apexcharts` to enable chart rendering.
- Magnific popup requires `magnific-popup` assets already bundled (CSS imported
  via theme). If removing jQuery later, replace with a lightweight modal iframe
  wrapper.
- Utilities kept minimal to avoid clashing with Tailwind from `@nuxt/ui`.
