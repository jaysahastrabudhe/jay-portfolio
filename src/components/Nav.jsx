import { useState, useEffect } from 'react'
import './Nav.css'

const links = [
  { href: '#experience', label: 'Experience' },
  { href: '#marketing', label: 'Marketing' },
  { href: '#web', label: 'Web Dev' },
  { href: '#github', label: 'Code' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#" className="nav__logo">Jay<span>.</span></a>
        <nav className={`nav__links${open ? ' nav__links--open' : ''}`} aria-label="Main navigation">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </nav>
        <button
          className="nav__burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
