import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { sectionHeaderReveal } from '../lib/sectionReveal'
import { liPosts } from '../data/projects'
import './MarketingWork.css'

const cardMetrics = ['847 REACTIONS', '6H → 4MIN', '634 REACTIONS', '47 TESTS / 90 DAYS']

export default function MarketingWork() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      sectionHeaderReveal(sectionRef.current)

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray('.mkt__card')
        gsap.set(cards, { autoAlpha: 0, y: 40 })

        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          stagger: { each: 0.12, from: 'start' },
          scrollTrigger: {
            trigger: '.mkt__grid',
            start: 'top 80%',
            once: true,
            toggleActions: 'play none none none',
          },
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const cards = gsap.utils.toArray('.mkt__card')
        gsap.set(cards, { autoAlpha: 1, y: 0 })
        gsap.from(cards, {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'none',
          scrollTrigger: { trigger: '.mkt__grid', start: 'top 85%', once: true },
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section id="work" className="mkt" ref={sectionRef}>
      <div className="section-wrap">
        <p className="eyebrow">03 / SELECTED WORK</p>
        <h2 className="section-heading">Marketing Work</h2>
        <div className="mkt__grid">
          {liPosts.map((post, i) => (
            <article key={i} className="mkt__card">
              <p className="mkt__card-metric">{cardMetrics[i]}</p>
              <p className="mkt__card-tag">{post.tag}</p>
              <p className="mkt__card-text">{post.text}</p>
              <p className="mkt__card-engagement">{post.reactions}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
