# GSAP + ScrollTrigger Guide

## Role in Project

GSAP handles richer motion beyond simple AOS entrances:

- Hero intro (`.hero-title`, `.hero-text`, `.hero-btn`, `.fade-in`)
- Batched scroll reveal class: `.scroll-fade-up`
- Parallax elements: `.parallax` (+ optional `data-speed`)
- Hover elevation: `.game-card`, `.tournament-card`
- Numeric counters (utility function)

## Key Files

- `app/composables/useAnimation.ts` – init + helpers
- `app/plugins/animations.client.ts` – (AOS related, GSAP already registered)

## Initialization Pattern

`useAnimation()` is called in pages. For a sub-component:

```ts
import { onMounted } from 'vue';
import { useAnimation } from '@/app/composables/useAnimation';

const { initGSAP } = useAnimation();

onMounted(() => {
    initGSAP(); // idempotent
});
```

## Scroll Reveal (Batch)

Add the class:

```html
<div class="feature-row scroll-fade-up">...</div>
```

Batch config adjustable via `configureAnimationTriggers({ fadeStartPercent })`.

Custom single trigger example:

```ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.from('.stat-box', {
    scrollTrigger: {
        trigger: '.stat-box',
        start: 'top 85%'
    },
    y: 24,
    opacity: 0,
    duration: 0.4,
    ease: 'power2.out'
});
```

## Parallax

```html
<div class="parallax" data-speed="0.35">
    <img src="/img/cloud.png" />
</div>
```

Speed default: `0.5`. Higher → stronger movement.

## Counters

```ts
const { animateCounter } = useAnimation();
animateCounter('#total-users', 12500, 2.2);
```

## Card Hover Motion

Applied globally to `.game-card, .tournament-card` in `initGSAP()`.

## Adjusting Global Reveal Speed

Edit durations / easings in `useAnimation.ts`:

```ts
// Example hero title segment
{ duration: 0.7, ease: 'power3.out' }
```

## Performance Best Practices

| Tip                                       | Why                 |
| ----------------------------------------- | ------------------- |
| Animate transform & opacity only          | Avoid layout thrash |
| Batch elements (`ScrollTrigger.batch`)    | Fewer observers     |
| Keep durations short for scroll reveals   | Snappier UX         |
| Avoid animating heavy box-shadows in bulk | Expensive paints    |

## Using with AOS

Use AOS for simple entrance fade/slide; GSAP for chained / custom / performance
critical sequences. Avoid double-animating the same element unless layering
(e.g. parallax wrapper + AOS child).

## Dynamic Content Refresh

```ts
import AOS from 'aos';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
AOS.refresh();
ScrollTrigger.refresh();
```

## Integrated Example

```vue
<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useAnimation } from '@/app/composables/useAnimation';
    const { configureAnimationTriggers } = useAnimation();

    onMounted(() => {
        configureAnimationTriggers({ fadeStartPercent: 80 });
    });
</script>
<template>
    <section>
        <h2 class="scroll-fade-up">Title</h2>
        <p class="scroll-fade-up">Copy</p>
        <div class="stats">
            <div class="stat-box">Stat</div>
        </div>
    </section>
</template>
```

## Cleanup

```ts
import { ScrollTrigger } from 'gsap/ScrollTrigger';
ScrollTrigger.getAll().forEach((t) => t.kill());
```

## Extending Further

- Add GSAP plugins (Flip, MotionPath) via import + register.
- Lazy-load GSAP where only specific routes need it.
- Use timelines (`gsap.timeline()`) for orchestrated sequences.

Happy animating with GSAP!
