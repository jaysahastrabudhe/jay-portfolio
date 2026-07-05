import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { sectionHeaderReveal } from '../lib/sectionReveal'
import { skillGroups } from '../data/skills'
import './Skills.css'

export default function Skills() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      sectionHeaderReveal(sectionRef.current)

      const tiles = gsap.utils.toArray('.sk__tile', sectionRef.current)
      if (tiles.length === 0) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(tiles, { autoAlpha: 0, y: 20 })

        gsap.to(tiles, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: { each: 0.04, from: 'start' },
          scrollTrigger: {
            trigger: '.sk__grid',
            start: 'top 80%',
            once: true,
            toggleActions: 'play none none none',
          },
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(tiles, { autoAlpha: 1, y: 0 })
        gsap.from(tiles, {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'none',
          scrollTrigger: { trigger: '.sk__grid', start: 'top 85%', once: true },
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section id="skills" className="section-wrap" ref={sectionRef}>
      <p className="eyebrow">05 / CAPABILITIES</p>
      <h2 className="section-heading">Capabilities</h2>
      <div className="sk__grid">
        {skillGroups.map(group => (
          <article
            key={group.category}
            className={`sk__tile sk__tile--${group.size}`}
          >
            <h3 className="sk__category">{group.category}</h3>
            <p className="sk__list">
              {group.skills.map((skill, i) => (
                <span className="sk__skill" key={skill}>
                  {skill}
                  {i < group.skills.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
