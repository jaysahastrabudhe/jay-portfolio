import Nav from './components/Nav'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Experience from './components/Experience'
import MarketingWork from './components/MarketingWork'
import Skills from './components/Skills'
import WebProjects from './components/WebProjects'
import GitHubProjects from './components/GitHubProjects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Experience />
        <MarketingWork />
        <Skills />
        <WebProjects />
        <GitHubProjects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
