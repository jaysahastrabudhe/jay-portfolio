import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
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
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rules = gsap.utils.toArray('.stats__rule')
        gsap.set(rules, { scaleX: 0, transformOrigin: 'left center' })

        const numberEls = gsap.utils.toArray('.stats__number')
        numberEls.forEach(el => {
          el.textContent = '0'
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
            toggleActions: 'play none none none',
          },
        })

        tl.to(rules, {
          scaleX: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
        }, 0)

        stats.forEach((stat, i) => {
          const el = numberEls[i]
          if (!el) return
          const proxy = { val: 0 }
          tl.to(
            proxy,
            {
              val: stat.value,
              duration: 1.6 + i * 0.12,
              delay: i * 0.08,
              ease: 'power2.out',
              snap: { val: stat.value >= 100 ? 10 : 1 },
              onUpdate() {
                el.textContent = stat.format
                  ? stat.format(proxy.val)
                  : Math.round(proxy.val).toLocaleString('en-IN')
              },
            },
            0
          )
        })

        return () => tl.kill()
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(sectionRef.current, { autoAlpha: 0 })
        gsap.to(sectionRef.current, { autoAlpha: 1, duration: 0.3, ease: 'none' })
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section id="ledger" className="stats" ref={sectionRef} aria-label="Key stats">
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
