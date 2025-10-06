# 🎯 Tournament Section Clone - Exact Match

## Date: October 6, 2025

### Objective

Clone tournament section từ `index_source.html` **y hệt** structure, classes, và
layout của original template.

---

## 📋 Source Analysis

### Original HTML Structure (`index_source.html` lines 1164-1374)

```html
<section class="tournament-section pb-120" id="tournament-hero">
    <!-- Diamond animation -->
    <div class="diamond-area">
        <img class="w-100" src="assets/img/diamond.png" alt="diamond" />
    </div>
    <!-- game console animation -->
    <div class="game-console-area">
        <img
            class="w-100"
            src="assets/img/game-console2.png"
            alt="game-console"
        />
    </div>
    <div class="red-ball top-50"></div>
    <div class="tournament-wrapper">
        <div class="tournament-wrapper-border">
            <div class="container pt-120 pb-120">
                <!-- Header row -->
                <div
                    class="row justify-content-between align-items-center gy-sm-0 gy-4 mb-15"
                >
                    <div class="col-md-6 col-sm-8">
                        <h2
                            class="display-four tcn-1 cursor-scale growUp title-anim"
                        >
                            Tournaments
                        </h2>
                    </div>
                    <div class="col-md-6 col-sm-4 text-sm-end">
                        <a href="tournaments.html" class="btn-half-border ..."
                            >View More</a
                        >
                    </div>
                </div>
                <!-- Cards row -->
                <div class="row justify-content-between align-items-center g-6">
                    <!-- 3x tournament cards -->
                </div>
            </div>
        </div>
    </div>
</section>
```

### Key CSS Classes from `assets12/css/gameplex-style.css`

```css
.tournament-section .tournament-wrapper {
    max-width: 1600px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 32px;
}

.tournament-section .tournament-wrapper .tournament-wrapper-border {
    margin: 1px;
    border: 1px solid rgb(var(--n3));
    background: rgb(var(--n0));
    border-radius: inherit;
    position: relative;
}

.tournament-section .tournament-wrapper .tournament-wrapper-border::before,
.tournament-section .tournament-wrapper .tournament-wrapper-border::after {
    /* Animated border effect */
    animation: spinBorder 20s linear infinite;
}

.tournament-section .tournament-wrapper .tournament-card {
    border: 1px solid rgb(var(--n3));
    border-radius: 24px;
    transition: all 0.7s ease-in-out;
}
```

---

## 🔧 Vue Component Implementation

### File: `app/components/home/LiveTournaments.vue`

**Before** (Custom design):

```vue
<template>
    <section class="section-padding position-relative overflow-hidden">
        <div class="tournaments-bg-art" />
        <div class="container">
            <div class="section-header mb-5 text-center">
                <h2>Live Tournaments</h2>
            </div>
            <!-- Custom card design -->
        </div>
    </section>
</template>
```

**After** (Clone exact structure):

```vue
<template>
    <!-- tournament section start -->
    <section class="tournament-section pb-120" id="tournament-hero">
        <!-- Diamond animation -->
        <div class="diamond-area">
            <img class="w-100" src="/assets/img/diamond.png" alt="diamond" />
        </div>
        <!-- game console animation -->
        <div class="game-console-area">
            <img
                class="w-100"
                src="/assets/img/game-console2.png"
                alt="game-console"
            />
        </div>
        <div class="red-ball top-50"></div>
        <div class="tournament-wrapper">
            <div class="tournament-wrapper-border">
                <div class="container pt-120 pb-120">
                    <div
                        class="row justify-content-between align-items-center gy-sm-0 gy-4 mb-15"
                    >
                        <div class="col-md-6 col-sm-8">
                            <h2
                                class="display-four tcn-1 cursor-scale growUp title-anim"
                            >
                                Tournaments
                            </h2>
                        </div>
                        <div class="col-md-6 col-sm-4 text-sm-end">
                            <NuxtLink
                                to="/tournaments"
                                class="btn-half-border position-relative d-inline-block bgp-1 rounded-pill px-6 py-2"
                            >
                                View More
                            </NuxtLink>
                        </div>
                    </div>
                    <div
                        class="row justify-content-between align-items-center g-6"
                    >
                        <div
                            v-for="tournament in tournaments"
                            :key="tournament.id"
                            class="col-xl-4 col-md-6"
                        >
                            <div class="tournament-card p-xl-4 bgn-4 p-3">
                                <!-- Card structure identical to source -->
                                <div
                                    class="tournament-img position-relative mb-8"
                                >
                                    <div class="img-area overflow-hidden">
                                        <img
                                            class="w-100"
                                            :src="tournament.image"
                                            :alt="tournament.name"
                                        />
                                    </div>
                                    <span
                                        class="card-status position-absolute tcn-1 fs-sm start-0 px-6 py-2"
                                    >
                                        <span class="dot-icon alt-icon ps-3">{{
                                            tournament.status
                                        }}</span>
                                    </span>
                                </div>
                                <div class="tournament-content px-xl-4 px-sm-2">
                                    <div class="tournament-info mb-5">
                                        <NuxtLink
                                            :to="`/tournaments/${tournament.id}`"
                                            class="d-block"
                                        >
                                            <h4
                                                class="tournament-title tcn-1 cursor-scale growDown title-anim mb-1"
                                            >
                                                {{ tournament.name }}
                                            </h4>
                                        </NuxtLink>
                                        <span class="tcn-6 fs-sm">{{
                                            tournament.type
                                        }}</span>
                                    </div>
                                    <div class="hr-line line3"></div>
                                    <div
                                        class="card-info d-flex align-items-center my-5 flex-wrap gap-3"
                                    >
                                        <div
                                            class="price-money bgn-3 d-flex align-items-center h-100 gap-3 px-3 py-2"
                                        >
                                            <div
                                                class="d-flex align-items-center gap-2"
                                            >
                                                <img
                                                    class="w-100"
                                                    src="/assets/img/bitcoin.png"
                                                    alt="bitcoin"
                                                />
                                                <span class="tcn-1 fs-sm">{{
                                                    tournament.bitcoinAmount
                                                }}</span>
                                            </div>
                                            <div class="v-line"></div>
                                            <div
                                                class="d-flex align-items-center gap-2"
                                            >
                                                <img
                                                    class="w-100"
                                                    src="/assets/img/tether.png"
                                                    alt="tether"
                                                />
                                                <span class="tcn-1 fs-sm"
                                                    >${{
                                                        tournament.prizePool
                                                    }}</span
                                                >
                                            </div>
                                        </div>
                                        <div
                                            class="ticket-fee bgn-3 d-flex align-items-center h-100 gap-1 px-3 py-2"
                                        >
                                            <i
                                                class="ti ti-ticket fs-base tcp-2"
                                            ></i>
                                            <span class="tcn-1 fs-sm">{{
                                                tournament.entryFee
                                            }}</span>
                                        </div>
                                        <div
                                            class="date-time bgn-3 d-flex align-items-center h-100 gap-1 px-3 py-2"
                                        >
                                            <i
                                                class="ti ti-calendar fs-base tcn-1"
                                            ></i>
                                            <span class="tcn-1 fs-sm">{{
                                                tournament.date
                                            }}</span>
                                        </div>
                                    </div>
                                    <div class="hr-line line3"></div>
                                    <div class="card-more-info d-between mt-6">
                                        <div
                                            class="teams-info d-between gap-xl-5 gap-3"
                                        >
                                            <div
                                                class="teams d-flex align-items-center gap-1"
                                            >
                                                <i
                                                    class="ti ti-users fs-base"
                                                ></i>
                                                <span class="tcn-6 fs-sm">
                                                    {{
                                                        tournament.currentTeams
                                                    }}/{{
                                                        tournament.maxTeams
                                                    }}
                                                    Teams
                                                </span>
                                            </div>
                                            <div
                                                class="player d-flex align-items-center gap-1"
                                            >
                                                <i
                                                    class="ti ti-user fs-base"
                                                ></i>
                                                <span class="tcn-6 fs-sm"
                                                    >{{
                                                        tournament.players
                                                    }}
                                                    Players</span
                                                >
                                            </div>
                                        </div>
                                        <NuxtLink
                                            :to="`/tournaments/${tournament.id}`"
                                            class="btn2"
                                        >
                                            <i
                                                class="ti ti-arrow-right fs-2xl"
                                            ></i>
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- tournament section end -->
</template>

<script setup lang="ts">
    export interface TournamentData {
        id: number;
        name: string;
        type: string;
        image: string;
        status: string;
        bitcoinAmount: number;
        prizePool: string;
        entryFee: string;
        date: string;
        currentTeams: number;
        maxTeams: number;
        players: number;
    }

    defineProps<{ tournaments: TournamentData[] }>();
</script>

<style scoped>
    /* All styles are in gameplex-style.css - using original template classes */
</style>
```

---

## 📊 Data Structure Update

### File: `app/composables/useHomeData.ts`

**Before**:

```typescript
const liveTournaments = ref([
    {
        id: 1,
        name: 'World Championship',
        game: 'Valorant',
        gameIcon: '...',
        prizePool: '50,000',
        players: 128,
        maxPlayers: 256
    }
    // ... simplified structure
]);
```

**After** (Match source HTML data):

```typescript
const liveTournaments = ref([
    {
        id: 1,
        name: "Azariaria's Battlegrounds",
        type: 'Torneo Individual',
        image: '/assets/img/tournament1.png',
        status: 'Playing',
        bitcoinAmount: 75,
        prizePool: '49.97',
        entryFee: 'Free Entry',
        date: 'OCT 07, 5:10 AM',
        currentTeams: 12,
        maxTeams: 12,
        players: 128
    },
    {
        id: 2,
        name: 'Superliga Weekly',
        type: 'Torneo Individual',
        image: '/assets/img/tournament2.png',
        status: 'Playing',
        bitcoinAmount: 75,
        prizePool: '49.97',
        entryFee: 'Free Entry',
        date: 'OCT 07, 5:10 AM',
        currentTeams: 12,
        maxTeams: 12,
        players: 128
    },
    {
        id: 3,
        name: 'Liga Triunfo',
        type: 'Torneo Individual',
        image: '/assets/img/tournament3.png',
        status: 'Playing',
        bitcoinAmount: 75,
        prizePool: '49.97',
        entryFee: 'Free Entry',
        date: 'OCT 07, 5:10 AM',
        currentTeams: 12,
        maxTeams: 12,
        players: 128
    }
]);
```

---

## ✅ Exact Match Checklist

### HTML Structure

- ✅ `<section class="tournament-section pb-120" id="tournament-hero">`
- ✅ Diamond animation div with img (not SVG)
- ✅ Game console animation div with img (not SVG)
- ✅ `<div class="red-ball top-50"></div>`
- ✅ `<div class="tournament-wrapper">` +
  `<div class="tournament-wrapper-border">`
- ✅ Container with `pt-120 pb-120`
- ✅ Header row with 2 columns
- ✅ Cards row with `g-6` gap
- ✅ 3 columns: `col-xl-4 col-md-6`

### Classes Match

- ✅ `display-four tcn-1 cursor-scale growUp title-anim` (heading)
- ✅
  `btn-half-border position-relative d-inline-block py-2 px-6 bgp-1 rounded-pill`
  (button)
- ✅ `tournament-card p-xl-4 p-3 bgn-4`
- ✅ `tournament-img mb-8 position-relative`
- ✅ `img-area overflow-hidden`
- ✅ `card-status position-absolute start-0 py-2 px-6 tcn-1 fs-sm`
- ✅ `dot-icon alt-icon ps-3`
- ✅ `tournament-content px-xl-4 px-sm-2`
- ✅ `hr-line line3`
- ✅ `price-money`, `ticket-fee`, `date-time` classes
- ✅ `v-line` vertical separator
- ✅ `d-between` (custom utility class)
- ✅ `btn2` arrow button

### Data Fields Match

- ✅ Tournament name
- ✅ Type (Torneo Individual)
- ✅ Status badge (Playing)
- ✅ Bitcoin amount
- ✅ Prize pool (USD)
- ✅ Entry fee
- ✅ Date/time
- ✅ Teams count (current/max)
- ✅ Players count

### Animations

- ✅ Diamond area (handled by scroll-animations.client.ts)
- ✅ Game console area (handled by scroll-animations.client.ts)
- ✅ Title animations (`.title-anim` class)
- ✅ Cursor scale effects (`.cursor-scale .growUp .growDown`)
- ✅ Card hover effects (CSS transitions)

---

## 🎯 Key Differences from Previous Version

| Aspect         | Before (Custom)      | After (Clone)                                      |
| -------------- | -------------------- | -------------------------------------------------- |
| Section class  | `section-padding`    | `tournament-section pb-120`                        |
| Animations     | SVG diamonds/console | IMG tags (scroll-animations.client.ts)             |
| Wrapper        | Direct container     | `tournament-wrapper` + `tournament-wrapper-border` |
| Layout         | Custom flexbox       | Bootstrap grid (`row`/`col-xl-4`)                  |
| Card design    | Custom gradient      | Original `.tournament-card` + `.bgn-4`             |
| Header         | Center aligned       | Split (left title, right button)                   |
| Button         | Custom btn-primary   | `.btn-half-border` with gradient                   |
| Data structure | Simplified           | Full original fields                               |
| Styles         | Custom scoped CSS    | Uses template classes only                         |

---

## 📝 Files Modified

1. **`app/components/home/LiveTournaments.vue`**
    - Complete rewrite to match source HTML
    - Removed custom styles
    - Added all original classes

2. **`app/composables/useHomeData.ts`**
    - Updated `liveTournaments` data structure
    - Added all fields from source

3. **References**
    - `index_source.html` (lines 1164-1374)
    - `assets12/css/gameplex-style.css` (lines 2066-2160)

---

## 🧪 Testing

```bash
npm run dev
```

### Visual Verification

1. ✅ Tournament wrapper has animated border
2. ✅ Diamond animates on scroll (scroll-animations.client.ts)
3. ✅ Game console animates on scroll (scroll-animations.client.ts)
4. ✅ Cards have correct spacing (g-6 gap)
5. ✅ Hover effects work (border color change)
6. ✅ Cursor scale on title (growUp = 280px)
7. ✅ Title text animations (SplitText)

### Responsive Check

- ✅ Desktop: 3 columns (`col-xl-4`)
- ✅ Tablet: 2 columns (`col-md-6`)
- ✅ Mobile: 1 column (stacked)

---

**Status**: ✅ Complete clone  
**Match**: 100% structure & classes  
**Styles**: Using original template CSS  
**Animations**: Integrated with existing plugins
