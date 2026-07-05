import { useRef } from 'react'
import { animate, createTimeline, split, stagger, MOTION } from '../lib/anime'
import { useAnimeScope } from '../lib/useAnimeScope'
import './Hero.css'

const META_ITEMS = [
  '— JAY SAHASTRABUDHE',
  'PERFORMANCE MARKETER',
  'PUNE, IN',
  '5+ YRS · 15M+ VIEWS · 8+ BRANDS',
]

export default function Hero() {
  const primaryCtaRef = useRef(null)

  const rootRef = useAnimeScope(self => {
    const reduce = self.matches.reduce
    const section = self.root
    const eyebrow = section.querySelector('.hero__eyebrow')
    const heading = section.querySelector('.hero__heading')
    const bio = section.querySelector('.hero__bio')
    const ctas = section.querySelectorAll('.hero__cta')
    const figure = section.querySelector('.hero__figure')
    const metaItems = section.querySelectorAll('.hero__meta li')
    const primaryCta = primaryCtaRef.current

    if (reduce) {
      animate([eyebrow, heading, bio, ...ctas, figure, ...metaItems], {
        opacity: [0, 1],
        duration: 300,
        ease: 'linear',
      })
      return
    }

    const tl = createTimeline({ defaults: { ease: 'outExpo' } })

    tl.add(eyebrow, { opacity: [0, 1], translateY: [16, 0], duration: 500 }, 0)

    const { lines } = split(heading, { lines: { wrap: 'clip' } })
    tl.add(
      lines,
      { translateY: ['110%', '0%'], duration: 900, delay: stagger(90) },
      250
    )

    tl.add(
      bio,
      { opacity: [0, 1], translateY: [24, 0], duration: 700, ease: 'outCubic' },
      '-=450'
    )
    tl.add(
      ctas,
      {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 700,
        delay: stagger(80),
        ease: 'outCubic',
      },
      '-=400'
    )
    tl.add(
      figure,
      {
        clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
        opacity: [0, 1],
        duration: 900,
      },
      350
    )
    tl.add(
      metaItems,
      {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 500,
        delay: stagger(50),
        ease: 'outCubic',
      },
      '-=500'
    )

    if (self.matches.fine && primaryCta) {
      const strength = 0.35

      const handleMouseMove = event => {
        const rect = primaryCta.getBoundingClientRect()
        const relX = event.clientX - (rect.left + rect.width / 2)
        const relY = event.clientY - (rect.top + rect.height / 2)
        animate(primaryCta, {
          translateX: relX * strength,
          translateY: relY * strength,
          duration: 300,
          ease: 'outQuad',
        })
      }

      const handleMouseLeave = () => {
        animate(primaryCta, {
          translateX: 0,
          translateY: 0,
          duration: 500,
          ease: MOTION.settle,
        })
      }

      primaryCta.addEventListener('mousemove', handleMouseMove)
      primaryCta.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        primaryCta.removeEventListener('mousemove', handleMouseMove)
        primaryCta.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  })

  return (
    <section className="hero" ref={rootRef} aria-labelledby="hero-heading">
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
