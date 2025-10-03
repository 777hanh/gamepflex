# Animation & Interaction Guide (GSAP + AOS + Custom Cursor)

This document explains how animations are wired in the project and how to extend
or customize them safely.

## Overview

Components & effects are powered by three layers:

1. AOS (scroll entrance animations + replay logic).
2. GSAP (hero / section motion, batched scroll reveals, counters, parallax, tilt
   helpers via external libs).
3. Custom Cursor (scales on hover depending on modifier classes).

Supporting files:

- `app/plugins/animations.client.ts` – global AOS init + replay observer +
  periodic refresh.
- `app/composables/useAnimation.ts` – convenience API to initialize / tune GSAP
  & AOS per component.
- `app/plugins/cursor.client.ts` – custom cursor tracking & scale logic (no
  jQuery, delegation based).

---

## 1. AOS (Animate On Scroll)

### What We Added

- Global init with `once:false` & `mirror:true` (animations replay scrolling up
  and down).
- IntersectionObserver removes `aos-animate` after element leaves viewport (only
  after first run) → enables infinite replays.
- Fallback pass `forceAnimateVisible()` to animate elements already in view on
  load (avoids “need click” issue).
- Periodic light `AOS.refresh()` (~0.9s) to reconcile with smooth scrolling /
  dynamic DOM mutations.
- Opt‑out attributes for replay:
    - `data-aos-mirror-none`, `data-aos-once`, `data-aos-single`,
      `data-aos-sticky` → element will animate only once (or be skipped for
      reset logic).

### Basic Usage

Add attributes directly in templates:

```html
<div data-aos="fade-up">Content</div>
<div data-aos="zoom-in" data-aos-delay="120">Later</div>
```

AOS attributes you can use: `data-aos`, `data-aos-delay`, `data-aos-duration`,
`data-aos-offset`, `data-aos-anchor-placement`.

### Replay / One-time Control

| Behavior               | What to do                                                                      |
| ---------------------- | ------------------------------------------------------------------------------- |
| Replay every time      | (default) just `data-aos="..."`                                                 |
| Animate only once      | Add `data-aos-once="true"` OR one of: `data-aos-mirror-none`, `data-aos-single` |
| Exempt from auto-reset | Same as above (observer skips it)                                               |

### Programmatic Replay

Use composable helper:

```ts
const { replayAOS } = useAnimation();
// replay all
replayAOS();
// replay subset
replayAOS('.stats-block');
```

### Trigger Tuning at Runtime

```ts
const { configureAnimationTriggers } = useAnimation();
configureAnimationTriggers({
    aosOffset: 10, // earlier fire
    fadeStartPercent: 78, // ScrollTrigger batch start (top 78% of viewport)
    anchorPlacement: 'top-bottom'
});
```

### Per Element Fine-Tune

If a single element needs different offset or placement:

```html
<div
    data-aos="fade-up"
    data-aos-offset="150"
    data-aos-anchor-placement="center-bottom"
></div>
```

### Troubleshooting

| Symptom                      | Fix                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Anim not firing until scroll | Ensure element not hidden by `display:none`; AOS only inspects visible layout boxes. Call `AOS.refresh()` after making it visible. |
| Anim fires too late          | Lower global `aosOffset` via `configureAnimationTriggers` or per element `data-aos-offset`.                                        |
| Stutters on heavy pages      | Remove periodic refresh (comment RAF loop) or raise interval; reduce AOS durations.                                                |
| Doesn’t replay               | Check you did not add an opt‑out attribute accidentally and element leaves viewport fully before expecting replay.                 |

---

## 2. GSAP Layer

### What GSAP Handles

- Initial fade / hero entrance (`.fade-in`, `.hero-title`, `.hero-text`,
  `.hero-btn`).
- Batched scroll reveals for `.scroll-fade-up` via `ScrollTrigger.batch`.
- Parallax elements with class `.parallax` (Y movement tied to scroll).
- Hover lift for cards (`.game-card`, `.tournament-card`).

### Initialization

Automatic in `useAnimation` composable (called in component `onMounted`). For a
new component needing GSAP custom animation, just import and call
`useAnimation()`.

### Adding a New Scroll Reveal

```html
<div class="my-feature scroll-fade-up">...</div>
```

Batch config inherits from `configureAnimationTriggers()` (start position). For
bespoke control, write a custom `ScrollTrigger` in the component:

```ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.from('.stat-box', {
    scrollTrigger: { trigger: '.stat-box', start: 'top 85%' },
    y: 24,
    opacity: 0,
    duration: 0.4,
    ease: 'power2.out'
});
```

### Counters

```ts
const { animateCounter } = useAnimation();
animateCounter('#users-count', 5000, 1.5); // (selector, endValue, durationSeconds)
```

### Parallax

Add class `.parallax` and optional `data-speed` (default 0.5):

```html
<div class="parallax" data-speed="0.35"><img src="..." /></div>
```

### Performance Tips

- Keep transforms on composite properties (`x`, `y`, `scale`, `opacity`).
- Batch similar elements (already done for `.scroll-fade-up`).
- Avoid animating layout (`width/height/top/left`) where possible.
- For many simultaneous triggers, disable periodic AOS refresh (cursor to
  plugin) or debounce manual `ScrollTrigger.refresh()` calls.

---

## 3. Custom Cursor

### Markup

The cursor element is injected once in `layouts/default.vue`:

```html
<div class="cursor" aria-hidden="true"></div>
```

### Hover Scaling

Use combination of a base class + modifier: | Base | Modifiers | Result |
|------|-----------|--------| | `cursor-scale` | `growUp` | Large (scale 7) | |
`cursor-scale` | `growDown` | Medium (scale 4) | | `cursor-scale` | `growDown2`
| Small (scale 2) |

Example:

```html
<button class="cursor-scale growUp">Play Now</button>
```

### How It Works

- `cursor.client.ts` tracks the pointer each animation frame (no smoothing for
  zero lag) and positions via `left/top`.
- Scale classes (`big-cursor`, `small-cursor`, `small-cursor2`) are toggled when
  elements with the appropriate modifier are hovered (delegated events →
  efficient for dynamic content).
- Touch devices: cursor hides on first touch.

### Extending Cursor Sizes

1. Add new CSS class (example):

```css
.tiny-cursor {
    transform: scale(1.3);
    background: rgba(var(--n1), 0.8);
}
```

2. Add a new hover semantic class to elements (e.g. `growTiny`).
3. Update the plugin mapping (add condition):

```ts
else if (el.classList.contains('growTiny')) cursor.classList.add('tiny-cursor');
```

### Optional: Inertia / Trailing Effect

Replace direct assignment in plugin with lerp:

```ts
let cx = mouseX,
    cy = mouseY;
const loop = () => {
    cx += (mouseX - cx) * 0.15;
    cy += (mouseY - cy) * 0.15;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(loop);
};
```

---

## 4. Putting It Together in a Component

Minimal example:

```vue
<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useAnimation } from '@/app/composables/useAnimation';
    const { configureAnimationTriggers } = useAnimation();

    onMounted(() => {
        configureAnimationTriggers({ aosOffset: 15, fadeStartPercent: 82 });
    });
</script>

<template>
    <section>
        <h2 data-aos="fade-up" class="cursor-scale growUp">Amazing Block</h2>
        <p data-aos="fade-up" data-aos-delay="80">Lorem ipsum...</p>
        <button
            class="cursor-scale growDown2"
            data-aos="zoom-in"
            data-aos-delay="120"
        >
            Action
        </button>
    </section>
</template>
```

---

## 5. Common Pitfalls & Fixes

| Issue                                       | Cause                                          | Fix                                                                                  |
| ------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| Cursor not visible                          | Media query hides under 992px / missing markup | Ensure `<div class="cursor">` exists & viewport > 992px.                             |
| AOS anim not replaying                      | Element never fully leaves viewport            | Increase scroll room or manually remove `aos-animate` with `replayAOS(selector)`.    |
| Stale positions after dynamic DOM injection | AOS/ScrollTrigger unaware                      | Call `AOS.refresh(); ScrollTrigger.refresh();`.                                      |
| Laggy scroll                                | Too many heavy animations simultaneously       | Stagger more, shorten durations, remove periodic refresh loop if safe.               |
| Scale classes not working on cursor         | Other script overwriting `transform`           | We use left/top now; ensure no external script sets inline `transform` on `.cursor`. |

---

## 6. Quick Reference API (from `useAnimation`)

| Function                                   | Purpose                                                                                     |
| ------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `initAOS(opts?)`                           | Initialize (first) / refresh (subsequent) AOS. Prefer not to call manually unless advanced. |
| `replayAOS(selector?)`                     | Force replay by removing animation class(es) then refreshing.                               |
| `configureAnimationTriggers({...})`        | Adjust global offsets / anchor placement / ScrollTrigger batch start.                       |
| `initGSAP()`                               | Idempotent internal call; sets hero & batch animations. Normally not needed directly.       |
| `animateCounter(selector, end, duration?)` | Animated numeric count.                                                                     |
| `initParallax()`                           | Sets up GSAP parallax on `.parallax` elements.                                              |
| `refreshAnimations()`                      | Calls both `AOS.refresh()` and `ScrollTrigger.refresh()`.                                   |
| `cleanupAnimations()`                      | Kills all ScrollTriggers (auto on unmount in layout).                                       |

---

## 7. Adding a New Animation Pattern

1. Decide: scroll trigger vs on-load vs hover.
2. For scroll: create a class or data attribute and a GSAP `from(...)` with
   `scrollTrigger` config inside component `onMounted`.
3. If reuse across pages, wrap in a small helper in a new composable or extend
   `useAnimation.ts`.
4. Test with fast scroll (use PageDown) to confirm fallback logic catches
   initial state.

---

## 8. Performance Checklist

- Keep AOS durations ≤ 600ms for snappy UX (current default 500ms).
- Avoid animating large box-shadows (costly) on many items simultaneously.
- Limit simultaneous GSAP timelines; batch where possible.
- Use `will-change` only on actively animated elements to avoid memory pressure.
- If you add Lenis / smooth-scroll libs, ensure they call
  `ScrollTrigger.update()` or rely on existing integration.

---

## 9. Extending Replay Logic (Advanced)

You can tailor reset threshold per element by adding a custom attribute (e.g.
`data-aos-reset-threshold="0.25"`) and modifying the observer in
`animations.client.ts` to respect it (currently uses fixed thresholds
`0, 0.05, 0.1`).

---

## 10. When to Use GSAP vs AOS

| Scenario                                      | Use                      |
| --------------------------------------------- | ------------------------ |
| Simple entrance on scroll                     | AOS                      |
| Complex stagger timeline dependent on scroll  | GSAP + ScrollTrigger     |
| Physics / spring / morph animations           | GSAP                     |
| Replay entrance automatically both directions | AOS (already configured) |
| Programmatic control / chaining               | GSAP                     |

---

## 11. Styling Hooks

Cursor classes (from `gameplex-style.css`): `.cursor`, `.big-cursor`,
`.small-cursor`, `.small-cursor2` — feel free to theme border or blend mode.

Modify them if brand colors change:

```css
.cursor {
    border-color: rgba(255, 255, 255, 0.85);
}
.big-cursor,
.small-cursor,
.small-cursor2 {
    background: #fff;
}
```

---

## 12. Migration Notes (if refactoring later)

- If you move to a directive-based AOS wrapper (e.g.,
  `v-aos="{ name: 'fade-up', delay: 80 }"`), ensure hydration doesn’t mismatch
  SSR/CSR (guard with `if (import.meta.client)`).
- To drop periodic refresh: remove RAF loop in `animations.client.ts` and
  manually call `AOS.refreshHard()` after large DOM injections.
- For tree-shaking GSAP: import only used plugins (already only
  `ScrollTrigger`).

---

## 13. Support / Next Enhancements

Potential improvements:

- Directive `v-cursor-scale` auto-binding variant (data attribute based).
- Data-driven animation map (central JSON registry for consistent delays &
  types).
- Lazy-load GSAP on first component using it to reduce initial bundle.

---

Feel free to request tweaks (e.g. inertia cursor, magnetic buttons, advanced
scroll scrubbing). Happy animating!
