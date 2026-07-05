import { animate, enterOnce } from '../lib/anime'
import { useAnimeScope } from '../lib/useAnimeScope'
import { sectionHeaderReveal } from '../lib/sectionReveal'
import { education } from '../data/experience'
import './Education.css'

export default function Education() {
  const rootRef = useAnimeScope(self => {
    const root = rootRef.current
    const reduce = self.matches.reduce
    const rows = root.querySelectorAll('.edu__row')

    if (reduce) {
      sectionHeaderReveal(root, { reduce: true })
      if (rows.length > 0) {
        animate(rows, {
          opacity: [0, 1],
          duration: 300,
          ease: 'linear',
          autoplay: enterOnce(root, 15),
        })
      }
      return
    }

    sectionHeaderReveal(root, { reduce })

    if (rows.length === 0) return

    const rowsContainer = root.querySelector('.edu__ledger')

    animate(rows, {
      opacity: [0, 1],
      translateY: [28, 0],
      duration: 600,
      ease: 'outCubic',
      autoplay: enterOnce(rowsContainer, 20),
    })
  })

  return (
    <section id="education" className="section-wrap" ref={rootRef}>
      <p className="eyebrow">06 / EDUCATION</p>
      <h2 className="section-heading">Education</h2>
      <div className="edu__ledger">
        {education.map(e => (
          <div key={e.date} className="edu__row">
            <span className="edu__year">{e.date}</span>
            <div className="edu__info">
              <h3 className="edu__degree">{e.degree}</h3>
              <p className="edu__school">{e.school}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
