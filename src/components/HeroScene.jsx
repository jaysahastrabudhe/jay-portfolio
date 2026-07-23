import { useRef } from 'react'
import { useScrollScene } from '../hooks/useScrollScene'

export default function HeroScene() {
  const sceneRef = useRef(null)
  useScrollScene(sceneRef)

  return (
    <section className="hero-scene" ref={sceneRef} aria-labelledby="hero-title">
      <div className="hero-stage">
        <div className="hero-grid" aria-hidden="true" />
        <p className="hero-meta hero-meta--top">Jay Sahastrabudhe · Pune, India</p>
        <p className="hero-meta hero-meta--side">Strategy · Production · Systems</p>

        <div className="hero-word hero-word--rear" aria-hidden="true">GROWTH</div>
        <img
          className="hero-cutout"
          src="/jay-cutout-tight.png"
          width="747"
          height="999"
          alt="Jay Sahastrabudhe"
          fetchPriority="high"
        />
        <div className="hero-word hero-word--front" aria-hidden="true">OPERATOR</div>

        <div className="hero-opening">
          <p>Growth strategist · Campaign producer · Technical builder</p>
          <h1 id="hero-title">I turn attention<br />into <em>growth.</em></h1>
        </div>

        <div className="hero-resolved">
          <p className="eyebrow">The positioning</p>
          <h2>Demand in front.<br /><em>Systems behind it.</em></h2>
          <p>I create the campaign, build the conversion path and make the result measurable.</p>
          <div><a href="mailto:jaysahastrabudhe@gmail.com">Contact me ↗</a><a href="#campaigns">View selected work ↘</a></div>
        </div>

        <div className="hero-teasers" aria-hidden="true">
          <figure><img src="/screenshot-vervefx.png" alt="" /></figure>
          <figure><img src="/nirva/consultation.png" alt="" /></figure>
          <figure><img src="/screenshot-jawandrop.png" alt="" /></figure>
        </div>
        <div className="scroll-cue">Scroll to enter <span>↓</span></div>
      </div>
    </section>
  )
}
