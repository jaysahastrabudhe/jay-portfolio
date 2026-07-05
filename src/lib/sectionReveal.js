import { animate, split, stagger, enterOnce, MOTION } from './anime'

/**
 * Shared section-header choreography (anime.js v4): eyebrow fades in,
 * heading lines rise out of clipped line wrappers. Fires once on enter.
 *
 * Call inside a useAnimeScope constructor so the splitter, animations and
 * scroll observers register to the scope and revert on unmount.
 *
 * @param {HTMLElement} scopeEl - section root containing `.eyebrow` and `.section-heading`
 * @param {{ reduce?: boolean }} opts - pass self.matches.reduce from the scope
 */
export function sectionHeaderReveal(scopeEl, { reduce = false } = {}) {
  const eyebrow = scopeEl.querySelector('.eyebrow')
  const heading = scopeEl.querySelector('.section-heading')
  if (!heading) return

  if (reduce) {
    animate([eyebrow, heading].filter(Boolean), {
      opacity: [0, 1],
      duration: 300,
      ease: 'linear',
      autoplay: enterOnce(scopeEl, 15),
    })
    return
  }

  // Clipped line wrappers = the SplitText mask equivalent. addEffect
  // re-applies the animation whenever the splitter re-splits on resize.
  const splitter = split(heading, { lines: { wrap: 'clip' } })
  splitter.addEffect(({ lines }) =>
    animate(lines, {
      translateY: ['110%', '0%'],
      duration: MOTION.display.duration,
      ease: MOTION.display.ease,
      delay: stagger(80),
      autoplay: enterOnce(scopeEl, 25),
    })
  )

  if (eyebrow) {
    animate(eyebrow, {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 450,
      ease: 'outCubic',
      autoplay: enterOnce(scopeEl, 25),
    })
  }
}
