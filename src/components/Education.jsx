import { useReveal } from '../hooks/useReveal'
import { education, certifications } from '../data/experience'
import './Education.css'

export default function Education() {
  const ref = useReveal()
  return (
    <section className="section-wrap edu-section">
      <div className="reveal" ref={ref}>
        <p className="section-label">Academic & Professional</p>
        <h2 className="section-heading">Education & Certifications</h2>
        <div className="edu__cols">
          <div>
            <h3 className="edu__sub">Education</h3>
            {education.map(e => (
              <div key={e.date} className="edu__item">
                <div className="edu__year">{e.date}</div>
                <div>
                  <div className="edu__school">{e.school}</div>
                  <div className="edu__degree">{e.degree}</div>
                  <p className="edu__desc">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="edu__sub">Certifications</h3>
            {certifications.map(c => (
              <div key={c.name} className="cert__item">
                <span className="cert__year">{c.year}</span>
                <div>
                  <div className="cert__name">{c.name}</div>
                  <div className="cert__org">{c.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
