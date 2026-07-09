import Nav from './components/Nav'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Experience from './components/Experience'
import Portfolio from './components/Portfolio'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Experience />
        <Portfolio />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
