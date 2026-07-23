import { useEffect, useState } from 'react'
import HeroScene from './components/HeroScene'
import { campaignChapters, digitalProducts, recommendations } from './data/portfolio'
import './App.css'

const navItems = [['story', 'Story'], ['campaigns', 'Campaigns'], ['operations', 'Operations'], ['products', 'Products'], ['recommendations', 'Words']]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: .08, rootMargin: '0px 0px -8% 0px' })
    document.querySelectorAll('[data-reveal]').forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <>
      <header className="topbar">
        <a className="wordmark" href="#top"><span>JAY</span><span>SAHASTRABUDHE</span></a>
        <span className="availability"><i /> Available for ambitious work</span>
        <button type="button" className="menu-button" onClick={() => setMenuOpen(value => !value)} aria-expanded={menuOpen}>{menuOpen ? 'Close' : 'Menu'} <b>{menuOpen ? '×' : '+'}</b></button>
      </header>
      <aside className={`menu-panel ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav>
          {navItems.map(([id, label], index) => <a href={`#${id}`} onClick={() => setMenuOpen(false)} key={id}><small>0{index + 1}</small><span>{label}</span><Arrow /></a>)}
          <a href="#contact" onClick={() => setMenuOpen(false)}><small>06</small><span>Contact</span><Arrow /></a>
        </nav>
      </aside>

      <main id="top">
        <HeroScene />

        <div className="credibility-rail" aria-label="Selected clients">
          <span>Macmerise</span><span>Nirva Health</span><span>FullHouse</span><span>Sitashree Laxminarayan</span><span>Kotibhaskar</span>
        </div>

        <section className="story section-pad" id="story">
          <p className="section-index">01 · The through-line</p>
          <div className="story-lead">
            <h2 data-reveal>One operator,<br />from idea to <em>outcome.</em></h2>
            <div data-reveal>
              <p>I work where growth strategy, creative production and technology overlap.</p>
              <p>That means fewer handoffs between the person shaping the promise and the person building the machinery that delivers it.</p>
            </div>
          </div>
          <div className="proof-grid">
            {[['15.4M+', 'campaign impressions'], ['9.9M+', 'campaign views'], ['3.33M', 'Shades of Love plays'], ['₹117', 'lowest real-estate CPL']].map(([value, label]) => <div key={label} data-reveal><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </section>

        <section className="campaigns" id="campaigns">
          <header className="campaigns-head section-pad">
            <p className="section-index">02 · Campaign systems</p>
            <h2 data-reveal>Culture, content<br />and <em>commerce.</em></h2>
            <p data-reveal>Real campaign imagery, grouped by the client system it belonged to—not a wall of disconnected posts.</p>
          </header>
          {campaignChapters.map((chapter, chapterIndex) => (
            <article className="campaign-chapter" key={chapter.id}>
              <div className="chapter-copy">
                <span>0{chapterIndex + 1} · {chapter.client}</span>
                <h3>{chapter.eyebrow}</h3>
                <p>{chapter.summary}</p>
                <strong>{chapter.metric}</strong><small>{chapter.metricLabel}</small>
              </div>
              <div className="campaign-track">
                {chapter.moments.map((moment, index) => (
                  <a href={moment.href} target="_blank" rel="noreferrer" className="campaign-moment" key={moment.title} data-reveal>
                    <figure><video src={moment.video} poster={moment.image} muted loop playsInline autoPlay preload="metadata" aria-label={`${moment.title} campaign video`} /></figure>
                    <div><span>{String(index + 1).padStart(2, '0')}</span><Arrow /></div>
                    <h4>{moment.title}</h4><p>{moment.role}</p>
                  </a>
                ))}
              </div>
            </article>
          ))}
          <article className="nirva-case section-pad">
            <div><span>Organic growth · SaaS health</span><h3>Nirva Health</h3></div>
            <p>Built audience and organic acquisition with a clear path to subscription: conversion-led content, doctor podcast planning and offline training designed around trust.</p>
          </article>
        </section>

        <section className="operations section-pad" id="operations">
          <p className="section-index section-index--light">03 · Growth operations</p>
          <header>
            <h2 data-reveal>The campaign is<br />only half the <em>system.</em></h2>
            <p data-reveal>June 2026 performance operations: acquisition, WhatsApp response, lead quality and sales handoff viewed as one connected loop.</p>
          </header>
          <div className="ops-metrics">
            {[['₹113', 'cost per lead'], ['1,771', 'WhatsApp messages'], ['222', 'hot leads'], ['34', 'sales-qualified']].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
          <div className="report-track">
            {[1,2,3,4,5,6,7,8].map(slide => <figure key={slide}><img src={`/slides/slide-${slide}.jpg`} alt={`Growth operations report page ${slide}`} loading="lazy" /></figure>)}
          </div>
        </section>

        <section className="commercial section-pad">
          <p className="section-index">04 · Commercial storytelling</p>
          <div className="commercial-grid">
            <article data-reveal>
              <div className="commercial-mark" aria-hidden="true"><strong>15.4M+</strong><span>impressions</span></div>
              <span>FullHouse · Awards submission</span><h3>Proof made persuasive.</h3><p>Krsnaa Diagnostics case-study narrative: 15.4M+ impressions, 9.9M+ views and ₹0.07 cost per view.</p>
            </article>
            <article data-reveal>
              <div className="commercial-mark commercial-mark--alt" aria-hidden="true"><strong>Pitch</strong><span>strategy → story</span></div>
              <span>FullHouse · Client pitch</span><h3>Complex thinking, made buyable.</h3><p>Strategic pitch development built to help decision-makers see the opportunity, the system and the next move.</p>
            </article>
          </div>
        </section>

        <section className="products section-pad" id="products">
          <p className="section-index section-index--light">05 · Digital products</p>
          <header><h2 data-reveal>From campaign path<br />to working <em>product.</em></h2></header>
          <div className="product-grid">
            {digitalProducts.map((product, index) => (
              <a href={product.href} target="_blank" rel="noreferrer" key={product.name} className="product-card" data-reveal>
                <div><span>0{index + 1} · {product.type}</span><Arrow /></div>
                <figure><img src={product.image} alt={`${product.name} interface`} loading="lazy" /></figure>
                <h3>{product.name}</h3><p>{product.tags.join(' · ')}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="capabilities section-pad">
          <p className="section-index">06 · Capability model</p>
          <h2 data-reveal>Think it. Make it.<br /><em>Measure it.</em></h2>
          <div className="capability-grid">
            <article><span>01</span><h3>Think</h3><p>Positioning, campaign strategy, acquisition and the commercial story.</p></article>
            <article><span>02</span><h3>Make</h3><p>Shoots, edits, event execution, live content and pitch narratives.</p></article>
            <article><span>03</span><h3>Build</h3><p>Web products, CRM workflows, automation, attribution and measurement.</p></article>
          </div>
        </section>

        <section className="recommendations section-pad" id="recommendations">
          <p className="section-index section-index--light">07 · LinkedIn recommendations</p>
          <h2 data-reveal>The work,<br />in their <em>words.</em></h2>
          <div className="quote-grid">
            {recommendations.map((item, index) => (
              <blockquote key={item.name} data-reveal>
                <span>0{index + 1}</span><p>“{item.quote}”</p>
                <footer><div><strong>{item.name}</strong><small>LinkedIn recommendation</small></div><a href={item.href} target="_blank" rel="noreferrer" aria-label={`View ${item.name} on LinkedIn`}>in</a></footer>
              </blockquote>
            ))}
          </div>
        </section>

        <footer className="contact section-pad" id="contact">
          <p>Bring me the ambitious brief.</p>
          <a href="mailto:jaysahastrabudhe@gmail.com">Let’s make it<br /><em>answer.</em> <Arrow /></a>
          <div><span>Jay Sahastrabudhe © 2026</span><nav><a href="https://linkedin.com/in/jaysahastrabudhe" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/jaysahastrabudhe" target="_blank" rel="noreferrer">GitHub</a></nav><a href="#top">Back to top ↑</a></div>
        </footer>
      </main>
    </>
  )
}
