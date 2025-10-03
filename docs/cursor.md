# Custom Cursor Guide

## What It Does

A circular pointer that scales depending on hovered elements, giving a more
tactile feel.

## Key File

- `app/plugins/cursor.client.ts`

## Markup Injection

Cursor element is added once in `layouts/default.vue`:

```html
<div class="cursor" aria-hidden="true"></div>
```

## Hover Scaling Classes

Add to any element:

- `cursor-scale growUp` → large (scale ~7)
- `cursor-scale growDown` → medium (scale ~4)
- `cursor-scale growDown2` → small (scale ~2)

Example:

```html
<button class="cursor-scale growUp">Play</button>
```

## How It Works

- Tracks pointer each animation frame (no smoothing) via `left/top` positioning.
- Delegated event listeners (`mouseover` / `mouseout`) detect closest
  `.cursor-scale` ancestor.
- Applies one of: `big-cursor`, `small-cursor`, `small-cursor2` (CSS already in
  `gameplex-style.css`).
- Hides itself after first touch interaction (mobile / hybrid devices).

## CSS (excerpt)

```css
.cursor {
    width: 40px;
    height: 40px;
    border: 2px solid rgba(var(--n1), 0.8);
    transition: transform 0.3s;
}
.big-cursor {
    transform: scale(7);
}
.small-cursor {
    transform: scale(4);
}
.small-cursor2 {
    transform: scale(2);
}
```

(Container uses margin offsets to center on pointer.)

## Extending Sizes

1. Add style:

```css
.tiny-cursor {
    transform: scale(1.3);
}
```

2. Add semantic class to elements (e.g. `growTiny`).
3. Update plugin mapping:

```ts
else if (el.classList.contains('growTiny')) cursor.classList.add('tiny-cursor');
```

## Optional Inertia Effect

Replace direct positioning loop with lerp for slight lag:

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

## Troubleshooting

| Issue                 | Cause                                     | Fix                                         |
| --------------------- | ----------------------------------------- | ------------------------------------------- |
| Cursor not visible    | Viewport < 992px (hidden via media query) | Test desktop / widen window                 |
| Scale not changing    | Missing `cursor-scale` or wrong modifier  | Add both base & modifier classes            |
| Jittery movement      | Another script also moving the element    | Keep only this plugin controlling `.cursor` |
| Cursor behind content | z-index overridden                        | Ensure `.cursor { z-index:1000 }` remains   |

## Accessibility Notes

- Marked `aria-hidden="true"` to avoid screen reader noise.
- Does not replace native system pointer events.

Enjoy the enhanced pointer experience!
