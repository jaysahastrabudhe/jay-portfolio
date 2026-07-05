import { useRef } from 'react'
import { animate, split, stagger, enterOnce, MOTION } from '../lib/anime'
import { useAnimeScope } from '../lib/useAnimeScope'
import './Contact.css'

export default function Contact() {
  const emailRef = useRef(null)

  const sectionRef = useAnimeScope(self => {
    const section = self.root
    const mega = section.querySelector('.contact__mega')
    const email = emailRef.current
    const links = section.querySelectorAll('.contact__social')
    const reduce = self.matches.reduce

    if (reduce) {
      animate(section.children, {
        opacity: [0, 1],
        duration: 300,
        ease: 'linear',
        autoplay: enterOnce(section, 15),
      })
      return
    }

    const { lines } = split(mega, { lines: { wrap: 'clip' } })
    animate(lines, {
      translateY: ['110%', '0%'],
      duration: MOTION.display.duration,
      ease: MOTION.display.ease,
      delay: stagger(80),
      autoplay: enterOnce(section, 25),
    })

    animate([email, ...links], {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      ease: 'outCubic',
      delay: stagger(60, { start: 300 }),
      autoplay: enterOnce(section, 25),
    })

    if (self.matches.fine) {
      const strength = 0.35

      const handleMouseMove = event => {
        const rect = email.getBoundingClientRect()
        const relX = event.clientX - (rect.left + rect.width / 2)
        const relY = event.clientY - (rect.top + rect.height / 2)
        animate(email, {
          translateX: relX * strength,
          translateY: relY * strength,
          duration: 300,
          ease: 'outQuad',
        })
      }

      const handleMouseLeave = () => {
        animate(email, {
          translateX: 0,
          translateY: 0,
          duration: 500,
          ease: MOTION.settle,
        })
      }

      email.addEventListener('mousemove', handleMouseMove)
      email.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        email.removeEventListener('mousemove', handleMouseMove)
        email.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  })

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
