import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__logo">Jay<span>.</span></span>
        <p className="footer__copy">
          © {new Date().getFullYear()} Jay Sahastrabudhe · Pune, India
        </p>
        <div className="footer__socials">
          <a href="https://linkedin.com/in/jaysahastrabudhe" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/jaysahastrabudhe" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
