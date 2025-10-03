# AOS (Animate On Scroll) Guide

## Summary

AOS is used for scroll entrance animations with replay support (both
directions). We extended its default behavior to allow infinite replays while
giving you opt‑out controls for one-time animations.

## Key Files

- `app/plugins/animations.client.ts` – global init + replay observer + refresh
  loop
- `app/composables/useAnimation.ts` – helper functions (replay, trigger tuning)

## Global Configuration (Defaults)

```
once: false
mirror: true
duration: 500
delay: 40
offset: (configurable, default 20 via configureAnimationTriggers)
```

## Basic Usage

```html
<div data-aos="fade-up">Content</div>
<div data-aos="zoom-in" data-aos-delay="120">Later</div>
```

Available attributes: `data-aos`, `data-aos-delay`, `data-aos-duration`,
`data-aos-offset`, `data-aos-anchor-placement`.

## Replay & One-Time Control

| Behavior               | What to Add                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| Replay (default)       | Just `data-aos="..."`                                                 |
| Animate once only      | `data-aos-once="true"` OR `data-aos-mirror-none` OR `data-aos-single` |
| Skip reset by observer | Same as above                                                         |

## Programmatic Replay

```ts
const { replayAOS } = useAnimation();
replayAOS(); // replay all
replayAOS('.stats-box'); // replay subset
```

## Runtime Trigger Tuning

```ts
const { configureAnimationTriggers } = useAnimation();
configureAnimationTriggers({
    aosOffset: 10,
    fadeStartPercent: 78,
    anchorPlacement: 'top-bottom'
});
```

- `aosOffset`: global offset distance
- `fadeStartPercent`: adjusts ScrollTrigger batch start (for GSAP batch synergy)
- `anchorPlacement`: element anchor evaluation (e.g. `center-bottom`)

## Per Element Overrides

```html
<div
    data-aos="fade-up"
    data-aos-offset="150"
    data-aos-anchor-placement="center-bottom"
></div>
```

## Extended Replay Logic

We remove `aos-animate` only after the element fully leaves viewport (post first
run) so it can replay when re-entering.

## Fallbacks Implemented

- Force initial visible elements to animate (`forceAnimateVisible`) – prevents
  needing a user click.
- Periodic `AOS.refresh()` (~0.9s) to sync with smooth scroll & DOM mutations.

## Troubleshooting

| Issue                 | Cause                               | Solution                                                                 |
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| Not animating on load | Element already visible before init | Fallback handles it; otherwise manually call `AOS.refresh()` after mount |
| Fires too late        | Offset too high                     | Lower global `aosOffset` or per element `data-aos-offset`                |
| No replay             | Element never fully exits viewport  | Scroll further or manually `replayAOS(selector)`                         |
| Performance dip       | Too many elements, frequent refresh | Remove periodic refresh (plugin) or increase interval                    |

## Advanced: Custom Reset Threshold (Not Implemented Yet)

You can add `data-aos-reset-threshold="0.25"` & extend the observer to read it
(currently static thresholds `[0, 0.05, 0.1]`).

## When to Choose AOS over GSAP

| Goal                                         | Use AOS?                        |
| -------------------------------------------- | ------------------------------- |
| Simple entrance fade/slide                   | Yes                             |
| Complex chained timeline                     | Prefer GSAP                     |
| Needs reverse replay on scroll up            | AOS (already set `mirror:true`) |
| Fine-grained control across nested sequences | GSAP                            |

## Quick API (from composable)

| Function                           | Purpose                                |
| ---------------------------------- | -------------------------------------- |
| `initAOS(opts?)`                   | Initialize / refresh AOS (auto-called) |
| `replayAOS(selector?)`             | Clear animation state & refresh        |
| `configureAnimationTriggers(opts)` | Adjust offsets & anchor placement      |

## Minimal Example

```vue
<script setup lang="ts">
    import { useAnimation } from '@/app/composables/useAnimation';
    const { configureAnimationTriggers } = useAnimation();
    configureAnimationTriggers({ aosOffset: 15 });
</script>
<template>
    <section>
        <h2 data-aos="fade-up">Heading</h2>
        <p data-aos="fade-up" data-aos-delay="80">Paragraph</p>
    </section>
</template>
```

Happy scrolling!
