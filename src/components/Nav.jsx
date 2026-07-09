import { useState } from 'react'
import { animate, onScroll } from '../lib/anime'
import { useAnimeScope } from '../lib/useAnimeScope'
import './Nav.css'

const links = [
  { id: 'ledger', num: '01', label: 'Ledger' },
  { id: 'experience', num: '02', label: 'Experience' },
  { id: 'portfolio', num: '03', label: 'Portfolio' },
  { id: 'contact', num: '04', label: 'Contact' },
]

const NAV_HEIGHT = 64

export default function Nav() {
  const [active, setActive] = useState(null)

  const rootRef = useAnimeScope(() => {
    const observers = links
      .filter(l => document.getElementById(l.id))
      .map(l =>
        onScroll({
          target: '#' + l.id,
          enter: { target: 'top', container: 'center' },
          leave: { target: 'bottom', container: 'center' },
          repeat: true,
          onEnter: () => setActive(l.id),
          onEnterBackward: () => setActive(l.id),
        })
      )

    return () => observers.forEach(o => o.revert())
  })

  const handleClick = (event, id) => {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targetY =
      target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT

    if (reduced) {
      window.scrollTo(0, targetY)
      return
    }

    const o = { y: window.scrollY }
    animate(o, {
      y: targetY,
      duration: 800,
      ease: 'inOutCubic',
      onUpdate: () => window.scrollTo(0, o.y),
    })
  }

  return (
    <header className="nav" ref={rootRef}>
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
