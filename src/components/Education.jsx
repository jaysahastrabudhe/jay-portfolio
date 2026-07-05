import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { sectionHeaderReveal } from '../lib/sectionReveal'
import { education } from '../data/experience'
import './Education.css'

export default function Education() {
  const ref = useRef(null)

  useGSAP(() => {
    sectionHeaderReveal(ref.current)

    const rows = gsap.utils.toArray('.edu__row', ref.current)
    if (rows.length === 0) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(rows, { autoAlpha: 0, y: 28 })

      gsap.to(rows, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once: true,
        },
      })

      return () => {}
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(rows, { autoAlpha: 1, y: 0 })

      gsap.from(rows, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      })

      return () => {}
    })

    return () => mm.revert()
  }, { scope: ref })

  return (
    <section id="education" className="section-wrap" ref={ref}>
      <p className="eyebrow">06 / EDUCATION</p>
      <h2 className="section-heading">Education</h2>
      <div className="edu__ledger">
        {education.map(e => (
          <div key={e.date} className="edu__row">
            <span className="edu__year">{e.date}</span>
            <div className="edu__info">
              <h3 className="edu__degree">{e.degree}</h3>
              <p className="edu__school">{e.school}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
