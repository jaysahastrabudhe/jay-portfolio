import { gsap, SplitText } from './gsap'

/**
 * Shared section-header choreography: eyebrow fades in, then the
 * heading's lines rise out of a SplitText line mask. Fires once.
 *
 * Call inside a component's useGSAP(() => { ... }, { scope: ref }) so the
 * created matchMedia/ScrollTrigger instances are cleaned up automatically.
 *
 * @param {HTMLElement} scopeEl - section root containing `.eyebrow` and `.section-heading`
 */
export function sectionHeaderReveal(scopeEl) {
  const eyebrow = scopeEl.querySelector('.eyebrow')
  const heading = scopeEl.querySelector('.section-heading')
  if (!heading) return

  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const split = SplitText.create(heading, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 110,
          duration: 0.85,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: scopeEl,
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true,
          },
        })
      },
    })

    if (eyebrow) {
      gsap.from(eyebrow, {
        autoAlpha: 0,
        y: 12,
        duration: 0.45,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scopeEl,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
      })
    }

    return () => split.revert()
  })

  mm.add('(prefers-reduced-motion: reduce)', () => {
    // Single quiet fade — elements are otherwise in final position.
    gsap.from([eyebrow, heading].filter(Boolean), {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'none',
      scrollTrigger: { trigger: scopeEl, start: 'top 85%', once: true },
    })
  })
}
