import { useReveal } from '../hooks/useReveal'
import { webProjects } from '../data/projects'
import './WebProjects.css'

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15,3 21,3 21,9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

export default function WebProjects() {
  const ref = useReveal()
  return (
    <section id="web" className="section-wrap web-section">
      <div className="reveal" ref={ref}>
        <p className="section-label">Freelance Development</p>
        <h2 className="section-heading">Web Projects</h2>
        <div className="web__grid">
          {webProjects.map(p => (
            <article key={p.name} className="web__card">
              {p.image && (
                <div className="web__img-wrap">
                  <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" />
                </div>
              )}
              {!p.image && (
                <div className="web__img-placeholder">
                  <span>{p.name[0]}</span>
                </div>
              )}
              <div className="web__body">
                <div className="web__title-row">
                  <h3 className="web__title">{p.name}</h3>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="web__link" aria-label={`Visit ${p.name}`}>
                    <ExternalIcon />
                  </a>
                </div>
                <p className="web__desc">{p.desc}</p>
                <div className="web__tags">
                  {p.tags.map(t => (
                    <span key={t} className="web__tag">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
