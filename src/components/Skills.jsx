import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { skills } from '../data/skills'
import './Skills.css'

export default function Skills() {
  const ref = useReveal()
  const barsRef = useRef(null)

  useEffect(() => {
    const el = barsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.sk__fill').forEach(bar => bar.classList.add('sk__fill--on'))
          obs.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="section-wrap">
      <div className="reveal" ref={ref}>
        <p className="section-label">Capabilities</p>
        <h2 className="section-heading">Skills</h2>
        <div className="sk__grid" ref={barsRef}>
          {skills.map(s => (
            <div key={s.name} className="sk__item">
              <div className="sk__meta">
                <span className="sk__name">{s.name}</span>
                <span className="sk__pct">{s.pct}%</span>
              </div>
              <div className="sk__track">
                <div
                  className="sk__fill"
                  style={{ '--w': `${s.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
