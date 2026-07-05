import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import './Contact.css'

export default function Contact() {
  const sectionRef = useRef(null)
  const emailRef = useRef(null)

  const { contextSafe } = useGSAP(() => {
    const section = sectionRef.current
    const mega = section.querySelector('.contact__mega')
    const email = emailRef.current
    const links = section.querySelectorAll('.contact__social')

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set([email, links], { autoAlpha: 0 })

      let split
      split = SplitText.create(mega, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 0.85,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              once: true,
            },
          })
        },
      })

      gsap.to([email, links], {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      })

      return () => split && split.revert()
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.from(section.children, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
      })
    })

    // Magnetic effect on the primary CTA (email link) only.
    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      if (!email) return

      const strength = 0.35

      const handleMouseMove = contextSafe(event => {
        const rect = email.getBoundingClientRect()
        const relX = event.clientX - (rect.left + rect.width / 2)
        const relY = event.clientY - (rect.top + rect.height / 2)
        gsap.to(email, {
          x: relX * strength,
          y: relY * strength,
          duration: 0.3,
          ease: 'power2.out',
        })
      })

      const handleMouseLeave = contextSafe(() => {
        gsap.to(email, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
      })

      email.addEventListener('mousemove', handleMouseMove)
      email.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        email.removeEventListener('mousemove', handleMouseMove)
        email.removeEventListener('mouseleave', handleMouseLeave)
      }
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="section-wrap contact__inner">
        <p className="eyebrow contact__eyebrow">07 / CONTACT</p>
        <h2 className="contact__mega">
          Make the spend <em className="contact__mega-em">answer</em>.
        </h2>
        <a href="mailto:jaysahastrabudhe@gmail.com" ref={emailRef} className="contact__email">
          jaysahastrabudhe@gmail.com
        </a>
        <div className="contact__socials">
          <a
            href="https://linkedin.com/in/jaysahastrabudhe"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__social"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/jaysahastrabudhe"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__social"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
