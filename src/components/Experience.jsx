import { useReveal } from '../hooks/useReveal'
import { experience } from '../data/experience'
import './Experience.css'

export default function Experience() {
  const ref = useReveal()
  return (
    <section id="experience" className="section-wrap">
      <div className="reveal" ref={ref}>
        <p className="section-label">Career</p>
        <h2 className="section-heading">Experience</h2>
        <div className="exp__grid">
          {experience.map(e => (
            <article key={e.date} className="exp__card">
              <div className="exp__meta">
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
      </div>
    </section>
  )
}
