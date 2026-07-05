import { animate, enterOnce, stagger, utils } from '../lib/anime'
import { useAnimeScope } from '../lib/useAnimeScope'
import './Stats.css'

const stats = [
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 15, suffix: 'M+', label: 'Views Generated' },
  { value: 8, suffix: '+', label: 'Brands Managed' },
  { value: 3, suffix: '', label: 'Client Websites' },
  {
    value: 2000,
    suffix: '+',
    label: 'LinkedIn Followers',
    format: n => (n / 1000).toFixed(1).replace('.0', '') + 'K',
  },
]

function formatValue(stat) {
  return stat.format ? stat.format(stat.value) : stat.value.toLocaleString('en-IN')
}

export default function Stats() {
  const rootRef = useAnimeScope(self => {
    const sectionEl = self.root
    const reduce = self.matches.reduce

    if (reduce) {
      animate(sectionEl, {
        opacity: [0, 1],
        duration: 300,
        ease: 'linear',
        autoplay: enterOnce(sectionEl, 15),
      })
      return
    }

    const ruleEls = Array.from(sectionEl.querySelectorAll('.stats__rule'))
    const numberEls = Array.from(sectionEl.querySelectorAll('.stats__number'))

    animate(ruleEls, {
      scaleX: [0, 1],
      duration: 600,
      ease: 'outCubic',
      delay: stagger(100),
      autoplay: enterOnce(sectionEl, 30),
    })

    stats.forEach((stat, i) => {
      const numberEl = numberEls[i]
      if (!numberEl) return

      numberEl.textContent = '0'

      const modifier = stat.format
        ? v => stat.format(v)
        : stat.value >= 100
          ? utils.snap(10)
          : utils.round(0)

      animate(numberEl, {
        textContent: [0, stat.value],
        duration: 1600 + i * 120,
        delay: i * 80,
        ease: 'outQuad',
        modifier,
        autoplay: enterOnce(sectionEl, 30),
      })
    })
  })

  return (
    <section id="ledger" className="stats" ref={rootRef} aria-label="Key stats">
      <div className="stats__inner">
        <p className="eyebrow stats__eyebrow">01 / LEDGER</p>
        <div className="stats__rows">
          {stats.map((stat, i) => (
            <div className="stats__row" key={stat.label}>
              <span className="stats__label">{stat.label}</span>
              <span className="stats__number-wrap">
                <span className="stats__number">{formatValue(stat)}</span>
                {stat.suffix && <span className="stats__suffix">{stat.suffix}</span>}
              </span>
              {i < stats.length - 1 && <div className="stats__rule" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
