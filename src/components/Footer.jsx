import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__line">
          SET IN FRAUNCES &amp; GENERAL SANS · BUILT WITH REACT + ANIME.JS · PUNE, IN
          {' '}· © {new Date().getFullYear()} JAY SAHASTRABUDHE
        </p>
      </div>
    </footer>
  )
}
