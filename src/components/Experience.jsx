import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { sectionHeaderReveal } from '../lib/sectionReveal'
import { experience } from '../data/experience'
import './Experience.css'

export default function Experience() {
  const ref = useRef(null)

  useGSAP(() => {
    sectionHeaderReveal(ref.current)

    const entriesEl = ref.current.querySelector('.exp__entries')
    const entries = gsap.utils.toArray('.exp__entry', ref.current)
    const spineFill = ref.current.querySelector('.exp__spine-fill')
    if (!entriesEl || entries.length === 0) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(entries, { autoAlpha: 0, y: 36 })
      if (spineFill) gsap.set(spineFill, { scaleY: 0, transformOrigin: 'top center' })

      gsap.to(entries, {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: entriesEl,
          start: 'top 80%',
          once: true,
        },
      })

      if (spineFill) {
        gsap.to(spineFill, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: entriesEl,
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        })
      }

      entries.forEach(entry => {
        ScrollTrigger.create({
          trigger: entry,
          start: 'top center',
          end: 'bottom center',
          onToggle: self => entry.classList.toggle('is-active', self.isActive),
        })
      })

      return () => {}
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(entries, { autoAlpha: 1, y: 0 })
      if (spineFill) gsap.set(spineFill, { scaleY: 1 })

      gsap.from(entriesEl, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'none',
        scrollTrigger: { trigger: entriesEl, start: 'top 85%', once: true },
      })

      entries.forEach(entry => {
        ScrollTrigger.create({
          trigger: entry,
          start: 'top center',
          end: 'bottom center',
          onToggle: self => entry.classList.toggle('is-active', self.isActive),
        })
      })

      return () => {}
    })

    return () => mm.revert()
  }, { scope: ref })

  return (
    <section id="experience" className="section-wrap" ref={ref}>
      <p className="eyebrow">02 / EXPERIENCE</p>
      <h2 className="section-heading">Experience</h2>
      <div className="exp__entries">
        <div className="exp__spine">
          <div className="exp__spine-fill" />
        </div>
        {experience.map(e => (
          <article key={e.date} className="exp__entry">
            <div className="exp__tick" />
            <div className="exp__rail">
              <span className="exp__date">{e.date}</span>
              <span className="exp__company">{e.company}</span>
            </div>
            <div className="exp__body">
              <h3 className="exp__role">{e.role}</h3>
              <p className="exp__desc">{e.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
