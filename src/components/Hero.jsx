import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import './Hero.css'

const META_ITEMS = [
  '— JAY SAHASTRABUDHE',
  'PERFORMANCE MARKETER',
  'PUNE, IN',
  '5+ YRS · 15M+ VIEWS · 8+ BRANDS',
]

export default function Hero() {
  const sectionRef = useRef(null)
  const primaryCtaRef = useRef(null)

  const { contextSafe } = useGSAP(() => {
    const section = sectionRef.current
    const eyebrow = section.querySelector('.hero__eyebrow')
    const heading = section.querySelector('.hero__heading')
    const bio = section.querySelector('.hero__bio')
    const ctas = section.querySelectorAll('.hero__cta')
    const figure = section.querySelector('.hero__figure')
    const metaItems = section.querySelectorAll('.hero__meta li')
    const primaryCta = primaryCtaRef.current

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // No pre-set here: .from() applies its start state synchronously on
      // creation, which is the FOIC guard. A gsap.set(autoAlpha 0) before a
      // .from(autoAlpha 0) would tween 0 → 0 and leave elements invisible.
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      let split

      tl.from(eyebrow, { autoAlpha: 0, y: 16, duration: 0.5 }, 0)

      split = SplitText.create(heading, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          return tl.from(
            self.lines,
            { yPercent: 110, duration: 0.9, stagger: 0.09 },
            0.25
          )
        },
      })

      tl.from(
        bio,
        { autoAlpha: 0, y: 24, duration: 0.7, ease: 'power3.out' },
        '-=0.45'
      )
      tl.from(
        ctas,
        { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
        '-=0.4'
      )
      tl.fromTo(
        figure,
        { clipPath: 'inset(100% 0 0 0)', autoAlpha: 0 },
        { clipPath: 'inset(0% 0 0 0)', autoAlpha: 1, duration: 0.9 },
        0.35
      )
      tl.from(
        metaItems,
        { autoAlpha: 0, y: 12, duration: 0.5, stagger: 0.05, ease: 'power3.out' },
        '-=0.5'
      )

      return () => split && split.revert()
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.from(section.children, { autoAlpha: 0, duration: 0.3, ease: 'none' })
    })

    // Magnetic effect on the primary CTA only.
    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      if (!primaryCta) return

      const strength = 0.35

      const handleMouseMove = contextSafe(event => {
        const rect = primaryCta.getBoundingClientRect()
        const relX = event.clientX - (rect.left + rect.width / 2)
        const relY = event.clientY - (rect.top + rect.height / 2)
        gsap.to(primaryCta, {
          x: relX * strength,
          y: relY * strength,
          duration: 0.3,
          ease: 'power2.out',
        })
      })

      const handleMouseLeave = contextSafe(() => {
        gsap.to(primaryCta, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
      })

      primaryCta.addEventListener('mousemove', handleMouseMove)
      primaryCta.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        primaryCta.removeEventListener('mousemove', handleMouseMove)
        primaryCta.removeEventListener('mouseleave', handleMouseLeave)
      }
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section className="hero" ref={sectionRef} aria-labelledby="hero-heading">
      <div className="hero__stage">
        <figure className="hero__figure">
          <img
            src="/jay-hero.jpg"
            alt="Jay Sahastrabudhe"
            className="hero__photo"
            width="520"
            height="650"
            fetchPriority="high"
          />
          <figcaption className="hero__figcaption">FIG. 01 — THE OPERATOR</figcaption>
        </figure>
        <p className="hero__eyebrow">
          PERFORMANCE MARKETING — META / GOOGLE / AI / EDTECH
        </p>
        <h1 id="hero-heading" className="hero__heading">
          Marketing that has to <em className="hero__wonk">answer</em> for the money.
        </h1>
        <p className="hero__bio">
          I'm a performance marketer who cares about one question: did the spend turn
          into revenue? Paid acquisition on Meta, Google, LinkedIn and YouTube — plus the
          AI-powered web apps and automation engines that make it accountable.
        </p>
        <div className="hero__ctas">
          <a href="#contact" ref={primaryCtaRef} className="hero__cta hero__cta--primary">
            Get in touch
          </a>
          <a
            href="https://linkedin.com/in/jaysahastrabudhe"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__cta hero__cta--ghost"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <ul className="hero__meta">
        {META_ITEMS.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
