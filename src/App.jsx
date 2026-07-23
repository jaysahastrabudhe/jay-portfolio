import { useEffect, useState } from 'react'
import './App.css'

const navigation = [
  ['about', 'About'],
  ['work', 'Selected work'],
  ['services', 'What I do'],
  ['testimonials', 'Recommendations'],
  ['contact', 'Contact'],
]

const journey = [
  { year: '2021', tag: '@systems', title: 'Technical foundations', text: 'Started solving business problems through software, automation, web scraping and data analysis.', image: '/screenshot-jda.png' },
  { year: '2022', tag: '@macmerise', title: 'Creativity met commerce', text: 'Led social creative, production and campaign planning for culture-led product launches and brand partnerships.', image: '/jay-hero.jpg' },
  { year: '2023', tag: '@growth', title: 'From content to growth', text: 'Built organic acquisition systems for Nirva Health and sharpened the link between audience, message and conversion.', image: '/screenshot-beliive.png' },
  { year: '2024', tag: '@builder', title: 'The stack got deeper', text: 'Shipped React applications, commerce platforms, payment systems, database workflows and performance-led websites.', image: '/screenshot-vervefx.png' },
  { year: '2025', tag: '@leadership', title: 'Leading the function', text: 'Ran social and digital marketing at FullHouse, turning strategy, creative and paid media into one accountable operation.', image: '/slides/slide-4.jpg' },
  { year: '2026', tag: '@operator', title: 'Building accountable growth', text: 'Now combining performance marketing, AI workflows and full-stack engineering to make every growth input measurable.', image: '/slides/slide-1.jpg' },
]

const projects = [
  { number: '01', name: 'Verve Nexus', type: 'Product platform', description: 'A collaboration platform connecting filmmakers with creative VFX production capacity through a cinematic, motion-led interface.', image: '/screenshot-vervefx.png', tags: ['React', 'Vite', 'Motion'], url: 'https://forestgreen-locust-191432.hostingersite.com' },
  { number: '02', name: 'JawanDrop', type: 'Commerce system', description: 'A live apparel storefront with Razorpay checkout, Supabase inventory allocation and operational order visibility.', image: '/screenshot-jawandrop.png', tags: ['React', 'Supabase', 'Razorpay'], url: 'https://jawandrop.in' },
  { number: '03', name: 'Jay Defence Academy', type: 'Education platform', description: 'An institutional site with a timed mock-test engine and a local search system that reached the top Google position in North Karnataka.', image: '/screenshot-jda.png', tags: ['WordPress', 'Local SEO', 'Product'], url: 'https://jaydefenceacademy.com' },
  { number: '04', name: 'beliive', type: 'E-commerce', description: 'An operational online store with catalogue management, payment gateway integration and end-to-end order tracking.', image: '/screenshot-beliive.png', tags: ['WooCommerce', 'Razorpay', 'Operations'], url: 'https://darkred-leopard-153534.hostingersite.com/' },
]

const capabilities = [
  ['01', 'Performance growth', 'Paid acquisition designed around lead quality, revenue and the handoff to sales—not vanity volume.'],
  ['02', 'Full-stack builds', 'Fast, resilient web products built with React, Next.js, APIs, databases and practical operational tooling.'],
  ['03', 'AI & automation', 'Lead intake, messaging and CRM workflows that reduce response time while preserving human judgment.'],
  ['04', 'Campaign systems', 'Strategy, production and distribution joined into a repeatable content engine with clear commercial intent.'],
  ['05', 'Measurement', 'Event pipelines, attribution logic and reporting that make the spend answer for itself.'],
]

const campaignProof = [
  ['15.4M+', 'Krsnaa campaign impressions'],
  ['9.9M+', 'Krsnaa campaign views'],
  ['3.33M', 'Shades of Love plays'],
  ['₹117', 'Lowest real-estate CPL'],
]

const recommendations = [
  {
    quote: 'Jay blends creativity with data-driven thinking and consistently delivers impactful results. He is proactive, detail-oriented, and dependable—guiding teams with clarity and confidence.',
    name: 'Sayli Chaudhari',
    relation: 'Worked with Jay in digital marketing',
    link: 'https://in.linkedin.com/in/sayli-chaudhari-48853576',
  },
  {
    quote: 'Jay brings a combination of approachable energy and mature, strategic guidance. His insights helped us sharpen our approach and significantly elevate our performance across content, audience and growth.',
    name: 'Archi Kashmiriya',
    relation: 'Worked closely with Jay',
    link: 'https://in.linkedin.com/in/archik-ux',
  },
]

const faqs = [
  ['What kind of work are you looking for?', 'Growth, marketing technology and full-stack roles where strategy and execution sit close together. I am most useful when the job involves both customer acquisition and the systems behind it.'],
  ['Are you a marketer or a developer?', 'Both—and the overlap is the point. I can shape the campaign, build the landing experience, connect the CRM, automate the response and inspect what converted.'],
  ['Can you work with an existing team?', 'Yes. I have led creative and digital functions, partnered with sales and production teams, and built systems inside existing operating constraints.'],
  ['Do you take freelance projects?', 'I selectively take on performance systems, websites and automation builds where there is a clear business outcome and room to own the execution.'],
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    )
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frame
    const updateScrollScenes = () => {
      const hero = document.querySelector('.hero')
      const work = document.querySelector('.work')

      if (hero) {
        const rect = hero.getBoundingClientRect()
        const distance = Math.max(1, hero.offsetHeight - window.innerHeight)
        const progress = Math.min(1, Math.max(0, -rect.top / distance))
        hero.style.setProperty('--hero-p', progress.toFixed(4))
      }

      if (work) {
        const rect = work.getBoundingClientRect()
        const distance = Math.max(1, work.offsetHeight - window.innerHeight)
        const progress = Math.min(1, Math.max(0, -rect.top / distance))
        work.style.setProperty('--work-p', progress.toFixed(4))
      }
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateScrollScenes)
    }
    updateScrollScenes()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <>
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Jay Sahastrabudhe, home"><span>JAY</span><span>SAHASTRABUDHE</span></a>
        <div className="topbar__status"><i /> Available for ambitious work</div>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
          {menuOpen ? 'Close' : 'Menu'} <span>{menuOpen ? '×' : '+'}</span>
        </button>
      </header>

      <div className={`menu-panel ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav>
          {navigation.map(([id, label], index) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><small>0{index + 1}</small>{label}<Arrow /></a>
          ))}
        </nav>
        <div className="menu-panel__foot">
          <a href="mailto:jaysahastrabudhe@gmail.com">jaysahastrabudhe@gmail.com</a>
          <a href="https://linkedin.com/in/jaysahastrabudhe" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
        </div>
      </div>

      <main id="top">
        <section className="hero">
          <div className="hero__sticky">
            <div className="hero__image-stage"><img src="/jay-hero.jpg" alt="Jay Sahastrabudhe" /></div>
            <div className="hero__opening">
              <span>JAY SAHASTRABUDHE®</span>
              <strong>THE GROWTH<br />OPERATOR.</strong>
              <small>Scroll to enter ↓</small>
            </div>
            <div className="hero__kicker">Growth strategy × software engineering</div>
            <h1>Growth,<br /><em>engineered</em><br />differently.</h1>
            <div className="hero__bottom">
              <p>I build the campaigns, products and systems that turn attention into accountable revenue.</p>
              <div className="hero__numbers">
                <strong>15M+</strong><span>views generated</span>
                <strong>5+</strong><span>years building growth</span>
              </div>
            </div>
            <div className="hero__client-strip" aria-hidden="true">
              <div><img src="/screenshot-vervefx.png" alt="" /><span>Products</span></div>
              <div><img src="/slides/slide-1.jpg" alt="" /><span>Performance</span></div>
              <div><img src="/screenshot-jawandrop.png" alt="" /><span>Commerce</span></div>
            </div>
            <div className="hero__rail" aria-hidden="true">
              {['Strategist', 'Builder', 'Operator', 'Creative', 'Technical'].map(word => <span key={word}>{word}</span>)}
            </div>
          </div>
        </section>

        <section className="intro" id="about">
          <div className="section-label">About me (&amp;) the journey</div>
          <div className="intro__lead" data-reveal>
            <h2>Not marketing beside tech. Marketing <em>through</em> tech.</h2>
            <p>Most teams split growth between people who make the promise and people who build the machinery. My work lives in the middle: campaign thinking, product craft, automation and measurement moving as one system.</p>
          </div>
          <div className="journey">
            {journey.map(item => (
              <article className="journey-card" key={item.year} data-reveal>
                <div className="journey-card__top"><span>{item.tag}</span><b>{item.year}</b></div>
                <div className="journey-card__image"><img src={item.image} alt="" /></div>
                <h3>{item.title}</h3><p>{item.text}</p><div className="journey-card__number">{item.year.slice(-2)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="work" id="work">
          <div className="work__sticky">
            <div className="section-label section-label--light">Selected work · scroll to explore</div>
            <div className="section-intro section-intro--light">
              <h2>Built to look sharp.<br />Built to <em>perform.</em></h2>
              <p>Products and platforms where visual character, technical execution and business utility share the same brief.</p>
            </div>
            <div className="project-list">
              {projects.map(project => (
                <a className="project-card" key={project.name} href={project.url} target="_blank" rel="noreferrer">
                  <div className="project-card__meta"><span>{project.number}</span><span>{project.type}</span><span><Arrow /></span></div>
                  <div className="project-card__visual"><img src={project.image} alt="" /></div>
                  <div className="project-card__copy">
                    <h3>{project.name}</h3><p>{project.description}</p>
                    <div>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="proof">
          <div className="section-label">Campaign proof</div>
          <div className="proof__grid">
            {campaignProof.map(([value, label]) => <div className="proof__item" key={label} data-reveal><strong>{value}</strong><span>{label}</span></div>)}
          </div>
          <p className="proof__note">Selected results across FullHouse, Macmerise and performance campaigns.</p>
        </section>

        <section className="field-notes" aria-label="Performance campaign snapshots">
          <div className="field-notes__title"><span>Inside the work</span><h2>Campaign systems,<br /><em>in motion.</em></h2></div>
          <div className="field-notes__marquee">
            <div>
              {[1, 2, 3, 4, 5, 6, 7, 8, 1, 2].map((slide, index) => (
                <figure key={`${slide}-${index}`}><img src={`/slides/slide-${slide}.jpg`} alt={`Campaign performance snapshot ${slide}`} /></figure>
              ))}
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <div className="section-label">What you get</div>
          <div className="section-intro" data-reveal>
            <h2>One operator.<br />Fewer handoffs.</h2>
            <p>Strategy, creative, development and measurement combined—turning a growth brief into something real, useful and accountable.</p>
          </div>
          <div className="capability-list">
            {capabilities.map(([number, title, text]) => (
              <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{text}</p><b>+</b></article>
            ))}
          </div>
        </section>

        <section className="recommendations" id="testimonials">
          <div className="section-label section-label--light">Recommendations</div>
          <div className="recommendations__head" data-reveal>
            <h2>From people<br />I’ve worked <em>with.</em></h2><span>Public LinkedIn recommendations</span>
          </div>
          <div className="recommendations__grid">
            {recommendations.map((item, index) => (
              <blockquote key={item.name} data-reveal>
                <span>0{index + 1}</span><p>“{item.quote}”</p>
                <footer><div><strong>{item.name}</strong><small>{item.relation}</small></div><a href={item.link} target="_blank" rel="noreferrer" aria-label={`${item.name} on LinkedIn`}><Arrow /></a></footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="faq">
          <div className="section-label">FAQ</div>
          <div className="faq__layout">
            <h2 data-reveal>Got a<br /><em>question?</em></h2>
            <div className="faq__items">
              {faqs.map(([question, answer], index) => (
                <article className={openFaq === index ? 'is-open' : ''} key={question}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                    <span>0{index + 1}</span>{question}<b>{openFaq === index ? '−' : '+'}</b>
                  </button>
                  <div><p>{answer}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <p>Have something ambitious in mind?</p>
          <a href="mailto:jaysahastrabudhe@gmail.com">Let’s make it<br /><em>answer.</em> <Arrow /></a>
          <div className="contact__foot">
            <span>Jay Sahastrabudhe © 2026</span>
            <div><a href="https://linkedin.com/in/jaysahastrabudhe" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/jaysahastrabudhe" target="_blank" rel="noreferrer">GitHub</a></div>
            <a href="#top">Back to top ↑</a>
          </div>
        </section>
      </main>
    </>
  )
}
