import { useEffect } from 'react'
import { ScrollTrigger } from './lib/gsap'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Experience from './components/Experience'
import MarketingWork from './components/MarketingWork'
import Skills from './components/Skills'
import Terminal from './components/Terminal'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    // Screenshot-heavy page: recalculate trigger positions once images land.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Experience />
        <MarketingWork />
        <Terminal />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
