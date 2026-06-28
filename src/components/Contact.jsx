import { useReveal } from '../hooks/useReveal'
import './Contact.css'

export default function Contact() {
  const ref = useReveal()
  return (
    <section id="contact" className="contact">
      <div className="section-wrap reveal" ref={ref}>
        <p className="section-label" style={{ color: '#0e0e14' }}>Let's Talk</p>
        <h2 className="contact__heading">Ready to grow something?</h2>
        <p className="contact__sub">
          Whether it's a Meta campaign, a web project, or an AI automation idea — I'd love to hear what you're building.
        </p>
        <div className="contact__links">
          <a href="mailto:jaysahastrabudhe@gmail.com" className="contact__btn">
            Send an Email
          </a>
          <a href="https://linkedin.com/in/jaysahastrabudhe" target="_blank" rel="noopener noreferrer" className="contact__btn contact__btn--ghost">
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
