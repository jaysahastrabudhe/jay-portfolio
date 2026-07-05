import { useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import './Nav.css'

const links = [
  { id: 'ledger', num: '01', label: 'Ledger' },
  { id: 'experience', num: '02', label: 'Experience' },
  { id: 'work', num: '03', label: 'Work' },
  { id: 'terminal', num: '04', label: 'Terminal' },
  { id: 'contact', num: '05', label: 'Contact' },
]

const NAV_HEIGHT = 64

export default function Nav() {
  const [active, setActive] = useState(null)

  const { contextSafe } = useGSAP(() => {
    const triggers = links
      .filter(l => document.getElementById(l.id))
      .map(l =>
        ScrollTrigger.create({
          trigger: '#' + l.id,
          start: 'top center',
          end: 'bottom center',
          onToggle: self => self.isActive && setActive(l.id),
        })
      )

    return () => triggers.forEach(t => t.kill())
  }, { dependencies: [] })

  const handleClick = contextSafe((event, id) => {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      gsap.to(window, { scrollTo: { y: '#' + id, offsetY: NAV_HEIGHT }, duration: 0 })
      return
    }

    gsap.to(window, {
      scrollTo: { y: '#' + id, offsetY: NAV_HEIGHT },
      duration: 0.8,
      ease: 'power3.inOut',
    })
  })

  return (
    <header className="nav">
      <div className="nav__inner">
        <a
          href="#"
          className="nav__logo"
          onClick={e => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'auto' })
          }}
        >
          J.S.
        </a>
        <nav className="nav__links" aria-label="Main navigation">
          {links.map(l => (
            <a
              key={l.id}
              href={'#' + l.id}
              className={active === l.id ? 'nav__link nav__link--active' : 'nav__link'}
              onClick={e => handleClick(e, l.id)}
            >
              <span className="nav__num">{l.num}</span>
              <span className="nav__label"> {l.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
