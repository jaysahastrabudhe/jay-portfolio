# Portfolio Redesign Specification — "The Ledger"

## 1. Design Direction

**"The Ledger"** — a warm-paper editorial broadsheet in the Swiss/financial-print tradition, with one contained dark "terminal" band where the builder identity lives. A performance marketer's claim is "the numbers reconcile," so the site is art-directed as a beautifully typeset annual report: cream paper, ink hairlines, huge wonk-locked serif statements, tabular mono numerals — and every color carries a meaning (vermilion = results, green = code, nothing decorative). Motion is calm and triggered everywhere except one signature moment: the stat ledger counting itself up.

**Council rulings (binding):**
- Display face is **Fraunces** (typographer wins; art-director's Newsreader is the documented fallback only if Fraunces reads too characterful in the browser — decide once at task 2, then never revisit).
- Stats section is **NOT pinned** (motion-designer wins). The ledger-row layout + hairline draws + staggered count-up is the signature moment; no scroll-jack.
- Stat numerals are **JetBrains Mono** in vermilion (art-director wins; resolves the typographer's tabular-figures concern by construction).
- Hero headline is the **claim, not the name**: "Marketing that has to *answer* for the money." Name demotes to a mono byline. Photo demotes to a small overlapping portrait.
- ScrambleText on **GitHub repo names only** (motion-designer wins; not on terminal-band section titles).
- Scrub budget: **exactly one** scrubbed animation on the page (Experience spine draw). Hero photo parallax is CUT.
- Web Projects + GitHub Projects **merge into one dark band** ("The Terminal").

---

## 2. Design Tokens

Replace the entire `:root` block in `src/index.css`. Delete `--dark`, `--dark-2`, `--yellow`, all Playfair/Montserrat references, and the hardcoded `#0a66c2` in `MarketingWork.css`.

```css
:root {
  /* ---------- Surfaces & ink ---------- */
  --paper:        oklch(96.8% 0.014 85);        /* warm cream — page background */
  --paper-2:      oklch(94.2% 0.018 85);        /* deeper cream — alternating bands, card fills */
  --ink:          oklch(22% 0.016 275);         /* near-black text; Contact block background */
  --ink-muted:    oklch(46% 0.014 275);         /* secondary text (never lighter than this) */
  --rule:         oklch(22% 0.016 275 / 0.16);  /* 1px hairlines — the site's skeleton */
  --rule-strong:  oklch(22% 0.016 275 / 0.55);  /* 3px heavy rules — section frames */

  /* ---------- Semantic accents (NEVER decorative) ---------- */
  --revenue:      oklch(58% 0.20 33);           /* vermilion. ONLY: stat numerals, result metrics,
                                                   primary CTA hover, active nav number, experience tick */
  --terminal:     oklch(78% 0.15 165);          /* green. ONLY inside the dark Terminal band */
  --panel:        oklch(18.5% 0.02 275);        /* the single dark surface (Terminal band) */
  --panel-text:   oklch(92% 0.01 275);
  --panel-muted:  oklch(92% 0.01 275 / 0.55);
  --panel-rule:   oklch(92% 0.01 275 / 0.14);

  /* ---------- Families ---------- */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body:    'General Sans', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;

  /* ---------- Fluid type scale (rem+vw pairs, never pure vw) ---------- */
  --text-hero:    clamp(3rem, 1.2rem + 7.5vw, 7.75rem);      /* 48 → 124px */
  --text-display: clamp(2.25rem, 1.35rem + 3.8vw, 4.5rem);   /* section H2 */
  --text-stat:    clamp(2.75rem, 1.4rem + 5vw, 5.75rem);     /* 2nd loudest on page */
  --text-mega:    clamp(3.5rem, 1rem + 10vw, 10rem);         /* Contact closing line only */
  --text-h3:      clamp(1.25rem, 1.08rem + 0.8vw, 1.75rem);  /* card/role titles */
  --text-body-lg: clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem);
  --text-body:    clamp(1rem, 0.96rem + 0.2vw, 1.125rem);    /* 16px floor, non-negotiable */
  --text-small:   clamp(0.875rem, 0.85rem + 0.12vw, 0.9375rem);
  --text-eyebrow: clamp(0.6875rem, 0.66rem + 0.15vw, 0.78125rem);

  /* ---------- Leading & tracking ---------- */
  --leading-hero:    0.94;
  --leading-display: 0.98;
  --leading-h3:      1.2;
  --leading-body:    1.65;
  --tracking-hero:    -0.025em;
  --tracking-display: -0.02em;
  --tracking-h3:      -0.01em;
  --tracking-mono:     0.14em;   /* uppercase mono labels */

  /* ---------- Weight stops (variable fonts — use ONLY these) ---------- */
  --fw-display:      620;   /* Fraunces headings */
  --fw-display-hero: 560;   /* Fraunces at hero size */
  --fw-body:         430;
  --fw-medium:       500;
  --fw-semibold:     600;
  --fw-mono:         460;
  --fw-stat:         640;   /* JetBrains Mono stat numerals */

  /* ---------- Layout ---------- */
  --content-max:   1360px;
  --space-section: clamp(5rem, 3.5rem + 6vw, 11rem);
  --space-block:   clamp(2rem, 1.5rem + 2vw, 3.5rem);

  /* ---------- Radii ---------- */
  --radius-paper:    0;      /* everything on paper is square-cornered */
  --radius-terminal: 12px;   /* tiles inside the dark band only */

  /* ---------- Motion (referenced by CSS hovers; GSAP eases live in src/lib/gsap.js) ---------- */
  --duration-micro:  250ms;
  --duration-img:    350ms;
  --ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
}
```

**Hard rules:**
- No `font-size`, `font-weight`, `letter-spacing`, or `line-height` literal in any component CSS file — tokens only.
- `border-radius: 0` everywhere on paper. `--radius-terminal` only inside the Terminal band.
- No box-shadows on paper — structure comes from hairlines, scale, and overlap. Subtle shadows permitted only on screenshot tiles inside the Terminal band.
- Vermilion never appears at sizes below `--text-h3` unless weight ≥ 600 (contrast discipline). Terminal green never appears outside the dark band — enforce in code review.
- **Texture:** one inline SVG `feTurbulence` noise (fractalNoise, baseFrequency 0.8) as a fixed full-page overlay div, `opacity: 0.035`, `pointer-events: none`, `mix-blend-mode: multiply` (do not run two overlays).

---

## 3. Typography System

| Role | Face | Source | Usage |
|---|---|---|---|
| Voice / display | **Fraunces** variable (wght, opsz, SOFT, WONK) + italic | Google Fonts, self-hosted | Hero headline, section headings, card/role titles, Contact mega line, nav logo |
| Evidence / body | **General Sans** variable | Fontshare, self-hosted | Body copy, bios, descriptions, buttons |
| Data / metadata | **JetBrains Mono** variable | Google Fonts, self-hosted | Eyebrows, nav links, dates, stat numerals, metrics, tech tags, byline, footer, everything in the Terminal band |

**Semantic division:** serif = Jay's voice · grotesk = evidence · mono = data. Hierarchy is carried by which voice speaks.

**Fraunces axis discipline:** `font-variation-settings: "SOFT" 0, "WONK" 0` sitewide; `font-optical-sizing: auto`. Exactly ONE wonky moment on the whole page: the italic word "*answer*" in the hero headline gets `"SOFT" 0, "WONK" 1`. Nothing else.

**Mono numerals:** `font-variant-numeric: tabular-nums lining-nums` on every element that displays numbers (stat values, dates, metrics) — mandatory for jitter-free GSAP counters.

**Loading strategy:**
- Self-host all three in `/public/fonts/` as subset latin woff2.
- Remove the Google Fonts `<link>` from `index.html` entirely.
- `@font-face` with `font-display: swap` for all; preload **only** Fraunces roman:
  `<link rel="preload" href="/fonts/Fraunces-VF.woff2" as="font" type="font/woff2" crossorigin>`

**Shared classes (rewrite in `src/index.css`):**

```css
.eyebrow {           /* numbered mono kickers: "01 / LEDGER", "02 / EXPERIENCE"… */
  font-family: var(--font-mono);
  font-size: var(--text-eyebrow);
  font-weight: var(--fw-mono);
  letter-spacing: var(--tracking-mono);
  text-transform: uppercase;
  color: var(--ink-muted);
}
.section-heading {
  font-family: var(--font-display);
  font-optical-sizing: auto;
  font-variation-settings: "SOFT" 0, "WONK" 0;
  font-size: var(--text-display);
  font-weight: var(--fw-display);
  line-height: var(--leading-display);
  letter-spacing: var(--tracking-display);
}
```

Section numbering (running folio): `01 / LEDGER` (Stats), `02 / EXPERIENCE`, `03 / SELECTED WORK` (Marketing), `04 / THE TERMINAL` (Web + GitHub), `05 / CAPABILITIES` (Skills), `06 / EDUCATION`, `07 / CONTACT`.

---

## 4. Section-by-Section Spec

### Nav
- **Layout:** solid `--paper` bar, 1px `--rule` bottom hairline. Left: "J.S." in Fraunces italic, `--fw-display`, 1.35rem. Right: mono links `01 Ledger · 02 Experience · 03 Work · 04 Terminal · 05 Contact` at `--text-eyebrow`, uppercase, tracked. Active section's number turns `--revenue` (IntersectionObserver or ScrollTrigger `onToggle` per section).
- **Hover:** CSS underline grow — `scaleX` 0→1, `transform-origin: left`, `--duration-micro` `--ease-out-expo`. No GSAP.
- **Anchor clicks:** ScrollToPlugin, `power3.inOut`, 0.8s. Remove `html { scroll-behavior: smooth }` from `index.css`.

### Hero
- **Layout:** full-bleed editorial statement escaping the 1360px container's type constraints (padding-only edges). Delete the two-column photo layout, "Hello, I'm", the `setTimeout`/`hero--visible` mechanism, and `Hero.css` opacity lines.
  1. Eyebrow (mono): `PERFORMANCE MARKETING — META / GOOGLE / AI / EDTECH`
  2. Headline, Fraunces `--text-hero`, `--fw-display-hero`, lh `--leading-hero`, ls `--tracking-hero`, breaking across 3 lines: **"Marketing that has to *answer* for the money."** — "answer" in Fraunces italic, `--revenue`, WONK 1 (the page's only wonk).
  3. Byline (mono, `--text-small`, `--ink-muted`): `— JAY SAHASTRABUDHE · 5+ YRS · 15M+ VIEWS · 8+ BRANDS`
  4. Bio: General Sans `--text-body-lg`, `--fw-body`, max-width 58ch, 2 sentences, `--ink-muted`.
  5. CTAs: primary = solid `--ink` block button, cream text, background→`--revenue` on hover; ghost = 1px `--rule-strong` border. Square corners.
- **Photo:** ~280px portrait, `filter: grayscale(0.3)`, bottom-right, **overlapping the hero/stats boundary by ~60px** via negative margin — the one grid-break in the top fold. On hover: grayscale(0) over `--duration-img`.
- **GSAP (on load, no ScrollTrigger):** timeline, defaults `expo.out`. SplitText on headline: `type: 'lines', mask: 'lines', autoSplit: true` → `from(lines, { yPercent: 110, duration: 0.9, stagger: 0.09 })`. Sequence: eyebrow (`autoAlpha 0, y 16`, 0.5s) → lines (`-=0.25`) → byline+bio (`autoAlpha 0, y 24`, 0.7s, `power3.out`, `-=0.45`) → CTAs (stagger 0.08, `-=0.4`) → photo `clip-path: inset(100% 0 0 0) → inset(0 0 0 0)` (0.9s, starts at 0.35s absolute). Total choreography ≤ 1.4s. **No photo parallax — cut.**

### Stats → "The Ledger" (signature section)
- **Layout:** full-bleed band framed by 3px `--rule-strong` top and bottom. Each stat is a **row**, not a cell: left = mono uppercase label (`YEARS EXPERIENCE`, `VIEWS GENERATED`…), right = numeral at `--text-stat`, JetBrains Mono `--fw-stat`, `--revenue`, right-aligned, `tabular-nums`. 1px `--rule` hairlines between rows. Suffixes (`M+`, `%`, `K`) at 0.45em raised, same vermilion. Reserve width (`min-width` per value) so counting causes zero CLS. On mobile (<768px) rows stack label-over-number, number stays right-aligned.
- **Data structure** (`Stats.jsx`):
```js
const stats = [
  { value: 5,    suffix: '+',  label: 'Years Experience' },
  { value: 15,   suffix: 'M+', label: 'Views Generated' },
  { value: 8,    suffix: '+',  label: 'Brands Managed' },
  { value: 3,    suffix: '',   label: 'Client Websites' },
  { value: 2000, suffix: '+',  label: 'LinkedIn Followers', format: n => (n/1000).toFixed(1).replace('.0','') + 'K' },
]
```
- **GSAP (NO pin):** trigger `.stats`, `start: 'top 70%'`, once.
  1. Each row's bottom hairline draws `scaleX: 0 → 1`, `transform-origin: left`, 0.6s `power3.out`, stagger 0.1.
  2. Counters per row: proxy tween `{ val: 0 → value }`, `duration: 1.6 + i*0.12`, `delay: i*0.08`, `ease: 'power2.out'` (never linear), `snap: { val: value >= 100 ? 10 : 1 }`, `onUpdate` writes `format ? format(val) : Math.round(val).toLocaleString('en-IN')` + suffix. Staggered finishes read organic, not mechanical.
- **Reduced motion:** final values set instantly, single 0.3s section fade.

### Experience
- **Layout:** keep the two-column table bones. Left rail (200px): dates + company in mono `--text-small`, `--ink-muted`, tabular-nums. Right: role in Fraunces `--text-h3` `--fw-semibold`; description in General Sans `--text-body` (fixes the 14.4px floor). 1px `--rule` hairline between entries. A continuous 1px vertical rule runs down the left edge of the section; a 3px `--revenue` tick marks the entry currently in viewport (ScrollTrigger `onToggle` per entry toggles a class).
- **GSAP:** entries `from { autoAlpha: 0, y: 36 }`, 0.65s `power3.out`, stagger 0.1, trigger `top 80%`, once. **The page's ONLY scrub:** the vertical spine draws `scaleY: 0 → 1`, `transform-origin: top`, `scrub: 0.6`, spanning the section — a clarifying scrub that tracks reading progress.

### Marketing Work
- **Layout:** editorial split replaces the uniform auto-fit grid — one featured case at 2/3 width, remaining cards stacked in the 1/3 column (single column <1024px). Cards: `--paper-2` fill, 1px `--rule` border, radius 0, no shadow. **Stat-first inversion:** each card leads with its metric in JetBrains Mono `--fw-stat` `--revenue` at `clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)` (`15M+ VIEWS`, `4.2x ROAS`), then title in Fraunces `--text-h3`, then description in General Sans `--text-body`. Delete the hardcoded `#0a66c2`; the LinkedIn link is a mono text link in `--ink`.
- **Hover (CSS):** `translateY(-4px)`, border-color → `--rule-strong`, `--duration-micro` `--ease-out-expo`. No motion inside card imagery.
- **GSAP:** cards `from { autoAlpha: 0, y: 40 }`, 0.65s `power3.out`, `stagger: 0.12, from: 'start'`, trigger `top 80%`, once.

### Web Projects + GitHub Projects → "The Terminal" (merged, one component band)
- **Layout:** single full-bleed `--panel` section — the only dark surface on the page. Section heading `04 / THE TERMINAL` in `--panel-text`; eyebrow numbers in `--terminal`. Everything inside is mono-forward.
  - **Web projects:** screenshot tiles, `--radius-terminal`, subtle shadow, mono title + `[react]` `[vite]` bracket-style tags in `--terminal`.
  - **GitHub repos:** terminal-window tiles (12px radius, three header dots in `--panel-muted`), repo name in mono `--terminal`, description in `--panel-muted`.
- **Hover:** screenshot `img` scales 1.02 inside `overflow: hidden` wrapper, `--duration-img`. Repo tiles: border-color shift only.
- **GSAP:** standard card reveal (`autoAlpha, y: 36`, stagger 0.1, `top 80%`). One sanctioned flex: ScrambleText-style decode on **repo names only** (mono, short strings, 0.6s, `chars: 'upperCase'`), once on section enter. Not on headings, not on descriptions. Cut it first if the page feels busy.

### Skills
- **Layout:** back on paper. Bento grid: 2 large tiles (Paid Acquisition; AI & Automation) + 4–6 small tiles. `--paper-2` fills, 1px `--rule` borders, radius 0. Category headers in Fraunces italic `--text-h3`; skill names in mono sentence-case `--text-small` — the serif/mono collision IS the dual-identity statement. No icon soup.
- **GSAP:** tiles `from { autoAlpha: 0, y: 20 }`, 0.5s, `stagger: { each: 0.04, from: 'start' }` (never `random`), trigger `top 80%`.

### Education
- **Layout:** compress to a two-row ledger table — mono years left, degree in Fraunces `--text-h3` + institution in General Sans right, hairline between. Low ceremony, no cards.
- **GSAP:** single quiet block fade, `autoAlpha 0, y: 28`, 0.6s.

### Contact
- **Layout:** the colophon. Full-bleed `--ink` block (pure ink, NOT `--panel`), cream text. Closing line in Fraunces at `--text-mega`, lh 0.9: **"Make the spend *answer*."** ("answer" italic, `--revenue`, WONK 0 — the wonk stays in the hero). Email as a large mono link beneath; social links as mono text links.
- **GSAP:** SplitText line-mask on the mega line (same helper as section headings), then email/links fade. Magnetic effect on the primary CTA (see §5). By here motion is nearly silent — the CTA carries the interaction.

### Footer
- **Layout:** lives inside the Contact ink block, separated by a cream 1px hairline. One mono line, `--text-eyebrow`: `SET IN FRAUNCES & GENERAL SANS · BUILT WITH REACT + GSAP · PUNE, IN`.
- **GSAP:** none.

---

## 5. GSAP Architecture

> **Engine note (2026-07-05):** the site now runs on **anime.js v4** (`src/lib/anime.js`, `src/lib/useAnimeScope.js`). The choreography values, ease tiers, single-scrub budget, and reduced-motion contract below are unchanged — read GSAP API names as their anime.js equivalents (SplitText → `split` with `wrap: 'clip'`, ScrollTrigger → `onScroll`, `useGSAP`/matchMedia → `createScope` with `mediaQueries`, ScrambleText → `scrambleText`, durations in ms).

**Install:** `npm install gsap @gsap/react` (GSAP 3.13+ — SplitText, ScrollTrigger, ScrollToPlugin all free).

**Single registration point — `src/lib/gsap.js`:**

```js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, useGSAP)
gsap.defaults({ ease: 'power3.out', duration: 0.7 })

export { gsap, ScrollTrigger, SplitText, useGSAP }
```

Every component imports from `../lib/gsap`, never from `gsap` directly.

**Ease/duration vocabulary (fixed — nothing else, ever):**

| Tier | Use | Ease | Duration |
|---|---|---|---|
| Display | Hero + section titles + Contact mega (SplitText lines) | `expo.out` | 0.8–0.9s |
| Content | Cards, rows, tiles, bio, CTAs | `power3.out` | 0.5–0.7s |
| Counter | Stat count-ups | `power2.out` | 1.6–2.2s |
| Micro | Hovers, nav (CSS where possible) | `power2.out` / `--ease-out-expo` | 0.25s |
| Settle | Magnetic release only | `elastic.out(1, 0.3)` | 0.5s |

**Shared helper — `src/lib/sectionReveal.js`:** `sectionHeaderReveal(scopeEl)` — label fade 0.45s → SplitText `mask: 'lines'` heading, `yPercent: 110`, stagger 0.08, `expo.out`; trigger `top 75%`, `toggleActions: 'play none none none'` — reveals fire once, never reverse.

**Magnetic CTA — exactly two elements** (hero primary + Contact CTA): strength 0.35, `power2.out` 0.3s follow, `elastic.out(1, 0.3)` 0.5s release. Built with `contextSafe()`, listeners removed in the `useGSAP` cleanup return. Gated behind `(hover: hover) and (pointer: fine)` AND no-preference reduced-motion.

**FOIC safety:** elements visible by default in CSS; GSAP hides via `gsap.set(..., { autoAlpha: 0 })` inside `useGSAP` immediately before animating. Delete `src/hooks/useReveal.js` and all `.reveal`/`.vis` CSS in the same commit the last consumer migrates — never run two reveal systems.

**Reduced motion — the contract.** One `gsap.matchMedia()` per animated component, two branches:
- `no-preference`: full spec above.
- `reduce`: SplitText, y-transforms, magnetic, scramble, spine scrub all removed; elements render in final position; at most one 0.3s opacity fade per section (`ease: 'none'`); stat counters set final values instantly. `matchMedia` is live — OS toggles rebuild without reload.
- CSS belt-and-suspenders: `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } *, *::before, *::after { transition-duration: 0.01ms !important; } }`.

**React 19 / StrictMode rules:** all animation inside `useGSAP(() => {…}, { scope: sectionRef })`; string selectors always scoped; `contextSafe()` for every event handler; no stray `gsap.to` in plain `useEffect`. In `App.jsx`: `window.addEventListener('load', () => ScrollTrigger.refresh())` (screenshot-heavy page); `autoSplit: true` handles font-load re-splits. **Do not add ScrollSmoother.** No `will-change` in CSS.

**Budget:** GSAP core + plugins ≈ 30kb gzipped, imported statically (needed at first paint). All motion on `transform`/`opacity` only.

---

## 6. Implementation Order

1. **Fonts** — download/subset Fraunces (roman+italic), General Sans, JetBrains Mono to `/public/fonts/`; write `@font-face` block; preload Fraunces; remove Google Fonts link from `index.html`.
2. **Tokens & global CSS** — replace `:root` in `src/index.css`; rewrite shared classes; noise overlay in `App.jsx`; reduced-motion CSS; remove `scroll-behavior: smooth`.
3. **GSAP bootstrap** — `npm i gsap @gsap/react`; create `src/lib/gsap.js` and `src/lib/sectionReveal.js`; `ScrollTrigger.refresh()` on window load.
4. **Nav** 5. **Hero** 6. **Stats/Ledger** 7. **Experience** 8. **Marketing Work** 9. **The Terminal** 10. **Skills** 11. **Education** 12. **Contact + Footer** (delete useReveal.js + .reveal/.vis CSS) 13. **QA pass**
