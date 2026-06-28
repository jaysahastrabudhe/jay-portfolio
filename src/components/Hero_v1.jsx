import { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero() {
  const ref = useRef(null)
  useEffect(() => {
    const t = setTimeout(() => ref.current?.classList.add('hero--visible'), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-heading">
      <div className="hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow">Performance Marketing · AI · EdTech</p>
          <h1 id="hero-heading" className="hero__name">
            Hello, I'm<br /><em>Jay Sahastrabudhe</em>
          </h1>
          <p className="hero__bio">
            Most marketing looks busy. Very little of it is accountable. I'm a performance
            marketer who cares about one question: did the spend turn into revenue? Over 5+
            years I've driven 15M+ views for 8+ brands — running paid acquisition on Meta,
            Google, LinkedIn and YouTube, building AI‑powered web apps and marketing
            automation engines, and conducting digital marketing workshops for students and entrepreneurs.
          </p>
          <div className="hero__ctas">
            <a href="#contact" className="hero__cta hero__cta--primary">Get in touch</a>
            <a href="https://linkedin.com/in/jaysahastrabudhe" target="_blank" rel="noopener noreferrer" className="hero__cta hero__cta--ghost">LinkedIn</a>
          </div>
        </div>
        <div className="hero__photo-wrap">
          <img src="/jay-hero.jpg" alt="Jay Sahastrabudhe" className="hero__photo" width="480" height="560" fetchpriority="high" />
          <div className="hero__photo-accent" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
