# 🔧 Component Mount Animation Fix

## Date: October 6, 2025

### Problem: GSAP Animations Not Working for Components

**Root Cause**:

```
Plugin Load (100ms) → Query DOM → No component elements found ❌
                ↓
         Component mounts (500ms later)
                ↓
         GSAP already finished → No animation ❌
```

**What Happened**:

1. ✅ Layout elements (AppHeader, AppFooter) → Available immediately → Animated
2. ❌ Component elements (ProfileHeader, TeamCard, etc.) → Mount later → **NOT
   Animated**
3. ❌ GSAP plugin runs too early → Elements not in DOM yet

---

## 🎯 Solution: MutationObserver Pattern

### Watch for Dynamic Elements

Instead of running once and giving up, we now **continuously watch** for new
elements:

```typescript
// OLD APPROACH (Failed)
setTimeout(() => {
  const elements = document.querySelectorAll('.title-anim');
  animate(elements); // Only finds layout elements
}, 100);

// NEW APPROACH (Works!)
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node has .title-anim) {
        animate(node); // ✅ Finds component elements too!
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,  // Watch for new children
  subtree: true     // Watch entire tree
});
```

---

## 📝 Files Modified

### 1. `text-animations.client.ts`

**Before**:

```typescript
const initTextAnimations = () => {
    const titleElements = document.querySelectorAll('.title-anim');
    titleElements.forEach(animate); // Only finds existing elements
};

setTimeout(initTextAnimations, 300); // Runs once, misses components
```

**After**:

```typescript
// Track animated elements to prevent double-init
const animatedElements = new WeakSet<HTMLElement>();

const animateTitleElement = (element: HTMLElement) => {
  if (animatedElements.has(element)) return; // Skip if already animated
  animatedElements.add(element);

  // Create SplitText animation
  const split_char = new SplitText(element, { type: 'chars, words' });
  gsap.from(split_char.chars, { ... });
};

// Initial scan
const initTextAnimations = () => {
  const titleElements = document.querySelectorAll('.title-anim');
  titleElements.forEach(el => animateTitleElement(el));
};

// MutationObserver for dynamically mounted elements
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;

        // Check if added node has class
        if (element.classList.contains('title-anim')) {
          setTimeout(() => animateTitleElement(element), 100);
        }

        // Check children
        const children = element.querySelectorAll('.title-anim');
        children.forEach(el => {
          setTimeout(() => animateTitleElement(el), 100);
        });
      }
    });
  });
});

// Start watching after initial scan
setTimeout(() => {
  initTextAnimations();
  observer.observe(document.body, { childList: true, subtree: true });
}, 300);
```

**Key Changes**:

- ✅ **WeakSet tracking** prevents double animations
- ✅ **MutationObserver** detects new elements when components mount
- ✅ **Checks both node and children** catches all cases
- ✅ **100ms delay** gives component time to fully render

---

### 2. `gsap-animations.client.ts`

**Before**:

```typescript
const initGSAPAnimations = () => {
  const elements = document.querySelectorAll('[data-gsap]');
  elements.forEach(element => {
    // Set initial state and animate
    gsap.set(element, { opacity: 0, y: 30 });
    gsap.to(element, { opacity: 1, y: 0, ... });
  });
};

setTimeout(initGSAPAnimations, 100); // Only runs once
```

**After**:

```typescript
const animateElement = (element: HTMLElement) => {
    if (element.dataset.gsapAnimated === 'true') return;
    element.dataset.gsapAnimated = 'true';

    const animation = element.getAttribute('data-gsap') || 'fade-up';
    // ... animation logic
};

const initGSAPAnimations = () => {
    const elements = document.querySelectorAll('[data-gsap]');
    elements.forEach((el) => animateElement(el));
};

// MutationObserver watches for new [data-gsap] elements
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;

                if (element.hasAttribute('data-gsap')) {
                    console.log('[GSAP] New element detected:', element);
                    setTimeout(() => animateElement(element), 100);
                }

                const children = element.querySelectorAll('[data-gsap]');
                children.forEach((el) => {
                    setTimeout(() => animateElement(el), 100);
                });
            }
        });
    });
});

setTimeout(() => {
    initGSAPAnimations();
    observer.observe(document.body, { childList: true, subtree: true });
}, 100);
```

**Key Changes**:

- ✅ **Extracted animateElement** function for reuse
- ✅ **data-gsapAnimated flag** prevents double animations
- ✅ **MutationObserver** catches components mounting
- ✅ **Console logs** for debugging component detection

---

### 3. `scroll-animations.client.ts`

**Before**:

```typescript
const initScrollAnimations = () => {
  const footerBanner = document.querySelector('.footer-banner-img');
  if (footerBanner) {
    gsap.to(footerBanner, { ... }); // May run multiple times
  }
};
```

**After**:

```typescript
// Track initialized animations
let isInitialized = false;
const animatedElements = new Set<string>();

const initScrollAnimations = () => {
  if (isInitialized) return; // Prevent double init
  isInitialized = true;

  const footerBanner = document.querySelector('.footer-banner-img');
  if (footerBanner && !animatedElements.has('footer-banner')) {
    animatedElements.add('footer-banner');
    gsap.to(footerBanner, { ... });
  }

  // Same for sword, diamond, game-console

  console.log('[Scroll Animations] Initialized', animatedElements.size, 'animations');
};

nuxtApp.hook('page:finish', () => {
  isInitialized = false; // Allow re-init on route change
  setTimeout(initScrollAnimations, 200);
});
```

**Key Changes**:

- ✅ **isInitialized flag** prevents multiple inits
- ✅ **animatedElements Set** tracks what's already animated
- ✅ **Reset on route change** allows fresh init for new pages

---

## 🎯 How It Works Now

### Timeline

```
0ms     → Plugin loads
100ms   → initTextAnimations() runs
          - Finds .title-anim in layout (e.g., AppHeader)
          - Animates layout elements ✅
          - Starts MutationObserver watching

500ms   → Component mounts (e.g., ProfileHeader.vue)
          - Component HTML added to DOM
          - MutationObserver detects new node
          - Finds .title-anim in component
          - Animates component elements ✅

800ms   → Another component mounts (e.g., TeamCard.vue)
          - MutationObserver still watching
          - Detects new elements
          - Animates them ✅
```

### Detection Logic

```typescript
MutationObserver callback fires when node added:

1. Check if node itself has target class/attribute
   └─ Yes → Animate it
   └─ No  → Continue

2. Check if node has children with target class/attribute
   └─ Yes → Animate all children
   └─ No  → Done

3. Add 100ms delay before animating
   └─ Gives component time to finish mounting
   └─ Ensures styles are applied
```

---

## 📊 Performance Impact

| Aspect              | Before   | After                         | Status     |
| ------------------- | -------- | ----------------------------- | ---------- |
| Initial scan        | 1 scan   | 1 scan                        | Same       |
| Component detection | ❌ None  | ✅ Automatic                  | Fixed      |
| Double animations   | Possible | Prevented (WeakSet)           | Improved   |
| Memory              | Low      | Slightly higher (observer)    | Acceptable |
| CPU                 | Low      | Minimal (only on DOM changes) | Acceptable |

### MutationObserver Performance

**Efficient**:

- Only fires when DOM actually changes
- Not polling every frame (unlike setInterval)
- Batches multiple changes into one callback

**Minimal Overhead**:

- Native browser API (C++ implementation)
- Only watches `childList` (not attributes, etc.)
- Only checks added nodes, not removed ones

---

## 🧪 Testing Guide

### Test Layout Elements (Should work immediately)

```bash
npm run dev
```

1. Open homepage
2. Check console: `[Text Animations] Found X title elements`
3. Verify AppHeader animations work ✅

### Test Component Elements (Now work after mount)

1. Navigate to `/profile`
2. Check console:
   `[Text Animations] New title element detected via MutationObserver`
3. Scroll down
4. Verify ProfileHeader text animates ✅

### Test Route Changes

1. Navigate from `/profile` → `/teams`
2. Check console: `[Text Animations] Page finished, re-initializing`
3. New components should animate ✅

### Debug Commands

**Check what's animated**:

```javascript
// In browser console
document.querySelectorAll('[data-gsap-animated]').length;
document.querySelectorAll('[data-split-init]').length;
```

**Check observer status**:

```javascript
// Should see these logs
[Text Animations] MutationObserver started
[GSAP Animations] MutationObserver started
```

**Trigger manual detection**:

```javascript
// Force re-scan
document.querySelectorAll('.title-anim').forEach((el) => {
    if (!el.hasAttribute('data-split-init')) {
        console.log('Missed element:', el);
    }
});
```

---

## 🔍 Common Issues

### Issue: Elements still not animating

**Check**:

1. Does element have correct class? (`.title-anim`, `[data-gsap]`)
2. Is component actually mounting? (Check Vue DevTools)
3. Is console showing detection? (`New title element detected`)
4. Is element visible? (Not `display: none`)

**Debug**:

```javascript
// Add to component
onMounted(() => {
    console.log('Component mounted');
    console.log(
        'Has .title-anim:',
        document.querySelectorAll('.title-anim').length
    );
});
```

### Issue: Double animations

**Cause**: Element animated twice (initial + observer)

**Solution**: Already handled by WeakSet/flags

- `animatedElements.has(element)` checks before animating
- `data-gsapAnimated="true"` marks animated elements

### Issue: Performance lag

**Cause**: Too many DOM changes triggering observer

**Solutions**:

1. Reduce component re-renders
2. Use `v-once` for static content
3. Batch DOM updates

---

## 📚 Related Documentation

- [MutationObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [GSAP ScrollTrigger](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Vue Component Lifecycle](https://vuejs.org/guide/essentials/lifecycle.html)

---

**Status**: ✅ Fixed  
**Animations**: Working for layout + components  
**Detection**: Automatic via MutationObserver  
**Performance**: Minimal overhead
