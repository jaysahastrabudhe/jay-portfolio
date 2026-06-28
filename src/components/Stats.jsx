import { useReveal } from '../hooks/useReveal'
import './Stats.css'

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '15M+', label: 'Views Generated' },
  { value: '8+', label: 'Brands Managed' },
  { value: '3', label: 'Client Websites' },
  { value: '2K+', label: 'LinkedIn Followers' },
]

export default function Stats() {
  const ref = useReveal()
  return (
    <section className="stats" aria-label="Key stats">
      <div className="stats__inner reveal" ref={ref}>
        {stats.map(s => (
          <div key={s.label} className="stats__item">
            <span className="stats__value">{s.value}</span>
            <span className="stats__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
