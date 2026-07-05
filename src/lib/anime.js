import {
  animate,
  createTimeline,
  createScope,
  createSpring,
  onScroll,
  stagger,
  utils,
  engine,
  splitText,
  scrambleText,
} from 'animejs'

/**
 * Single import point for the site's motion system (anime.js v4).
 * Components import from here, never from 'animejs' directly.
 *
 * Ease/duration vocabulary (The Ledger, docs/design-spec.md §5).
 * anime.js durations are in MILLISECONDS.
 */
export const MOTION = {
  display: { ease: 'outExpo', duration: 850 },   // SplitText-style line reveals
  content: { ease: 'outCubic', duration: 650 },  // cards, rows, tiles
  counter: { ease: 'outQuad', duration: 1600 },  // stat count-ups (base)
  micro: { ease: 'outQuad', duration: 250 },     // hovers (CSS where possible)
  settle: createSpring({ stiffness: 120, damping: 10 }), // magnetic release only
}

/**
 * GSAP "start: 'top 80%'" equivalent — fire once when the target's top
 * crosses (viewport bottom - offsetPct%). Object-form thresholds are
 * unambiguous: { target, container } positions.
 */
export const enterOnce = (target, offsetPct = 20) =>
  onScroll({
    target,
    enter: { target: 'top', container: `bottom-=${offsetPct}%` },
    repeat: false,
  })

if (import.meta.env.DEV) {
  // Dev-only handles for debugging/preview harnesses that suspend rAF.
  window.anime = { animate, createTimeline, engine, utils, onScroll }
}

export {
  animate,
  createTimeline,
  createScope,
  createSpring,
  onScroll,
  stagger,
  utils,
  engine,
  // exported as `split` for call sites; splitText is the non-deprecated import
  splitText as split,
  scrambleText,
}
