import { animate, stagger, enterOnce } from '../lib/anime'
import { useAnimeScope } from '../lib/useAnimeScope'
import { sectionHeaderReveal } from '../lib/sectionReveal'
import { skillGroups } from '../data/skills'
import './Skills.css'

export default function Skills() {
  const rootRef = useAnimeScope(self => {
    const reduce = self.matches.reduce
    const root = self.root
    const gridEl = root.querySelector('.sk__grid')
    const tiles = root.querySelectorAll('.sk__tile')

    if (reduce) {
      sectionHeaderReveal(root, { reduce: true })
      if (tiles.length > 0) {
        animate(tiles, {
          opacity: [0, 1],
          duration: 300,
          ease: 'linear',
          autoplay: enterOnce(root, 15),
        })
      }
      return
    }

    sectionHeaderReveal(root, { reduce })

    if (tiles.length === 0) return

    animate(tiles, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 500,
      ease: 'outCubic',
      delay: stagger(40),
      autoplay: enterOnce(gridEl, 20),
    })
  })

  return (
    <section id="skills" className="section-wrap" ref={rootRef}>
      <p className="eyebrow">05 / CAPABILITIES</p>
      <h2 className="section-heading">Capabilities</h2>
      <div className="sk__grid">
        {skillGroups.map(group => (
          <article
            key={group.category}
            className={`sk__tile sk__tile--${group.size}`}
          >
            <h3 className="sk__category">{group.category}</h3>
            <p className="sk__list">
              {group.skills.map((skill, i) => (
                <span className="sk__skill" key={skill}>
                  {skill}
                  {i < group.skills.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
