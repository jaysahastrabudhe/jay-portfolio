import { useAnimeScope } from '../lib/useAnimeScope'
import { animate, onScroll, stagger, enterOnce } from '../lib/anime'
import { sectionHeaderReveal } from '../lib/sectionReveal'
import { experience } from '../data/experience'
import './Experience.css'

export default function Experience() {
  const rootRef = useAnimeScope(self => {
    const reduce = self.matches.reduce
    const root = rootRef.current

    sectionHeaderReveal(root, { reduce })

    const entriesContainer = root.querySelector('.exp__entries')
    const entries = root.querySelectorAll('.exp__entry')
    const spineFill = root.querySelector('.exp__spine-fill')
    if (!entriesContainer || entries.length === 0) return

    entries.forEach(entry => {
      onScroll({
        target: entry,
        enter: { target: 'top', container: 'center' },
        leave: { target: 'bottom', container: 'center' },
        repeat: true,
        onEnter: () => entry.classList.add('is-active'),
        onLeave: () => entry.classList.remove('is-active'),
      })
    })

    if (reduce) {
      animate(entriesContainer, {
        opacity: [0, 1],
        duration: 300,
        ease: 'linear',
        autoplay: enterOnce(root, 15),
      })
      if (spineFill) spineFill.style.transform = 'scaleY(1)'
      return
    }

    animate(entries, {
      opacity: [0, 1],
      translateY: [36, 0],
      duration: 650,
      ease: 'outCubic',
      delay: stagger(100),
      autoplay: enterOnce(entriesContainer, 20),
    })

    if (spineFill) {
      animate(spineFill, {
        scaleY: [0, 1],
        ease: 'linear',
        autoplay: onScroll({
          target: entriesContainer,
          enter: { target: 'top', container: 'bottom-=25%' },
          leave: { target: 'bottom', container: 'center' },
          sync: 0.25,
        }),
      })
    }
  })

  return (
    <section id="experience" className="section-wrap" ref={rootRef}>
      <p className="eyebrow">02 / EXPERIENCE</p>
      <h2 className="section-heading">Experience</h2>
      <div className="exp__entries">
        <div className="exp__spine">
          <div className="exp__spine-fill" />
        </div>
        {experience.map(e => (
          <article key={e.date} className="exp__entry">
            <div className="exp__tick" />
            <div className="exp__rail">
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
    </section>
  )
}
