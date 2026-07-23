import { useEffect, useState } from 'react'
import HeroScene from './components/HeroScene'
import { campaignChapters, digitalProducts, recommendations } from './data/portfolio'
import './App.css'

const navItems = [['story', 'Story'], ['youtube', 'YouTube'], ['campaigns', 'Campaigns'], ['nirva', 'Nirva case'], ['products', 'Development'], ['recommendations', 'Words']]

const popularVideos = [
  { title: 'Samsung S21 FE Review 2023: Is It Still Worth Buying?', views: '215K views', image: '/youtube/s21-fe.jpg', href: 'https://www.youtube.com/watch?v=owqQ8hgfLWI' },
  { title: 'Should You Buy Pixel 6A In 2023? All Pros and Cons After 5 Months!', views: '190K views', image: '/youtube/pixel-6a-pros-cons.jpg', href: 'https://www.youtube.com/watch?v=maPQIuvYgkA' },
  { title: 'Nothing Phone 1 or Pixel 6A? Which One Should You Buy In 2023', views: '158K views', image: '/youtube/nothing-vs-pixel.jpg', href: 'https://www.youtube.com/watch?v=RQ_Wtk2cW-k' },
  { title: 'Pixel 6A in 2023: Is It Still a Smart Buy?', views: '120K views', image: '/youtube/pixel-6a-hidden-gems.jpg', href: 'https://www.youtube.com/watch?v=-VaEmol3cnk' },
]

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
          <a href="#contact" onClick={() => setMenuOpen(false)}><small>07</small><span>Contact</span><Arrow /></a>
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

        <section className="youtube section-pad" id="youtube">
          <p className="section-index section-index--light">02 · Owned media archive</p>
          <header className="youtube-head">
            <div>
              <span>Built and hosted by Jay · 2014–2025</span>
              <h2 data-reveal>Four years of making<br />tech <em>understandable.</em></h2>
            </div>
            <p data-reveal>Rom Guruji was my owned-media laboratory: scripting, presenting, production, thumbnails, search-led publishing and audience building—run end to end.</p>
          </header>
          <div className="youtube-stats">
            <div><strong>22.5K</strong><span>subscribers</span></div>
            <div><strong>727</strong><span>published videos</span></div>
            <div><strong>5.93M</strong><span>lifetime channel views</span></div>
            <a href="https://www.youtube.com/@RomGuruji/videos" target="_blank" rel="noreferrer"><span>Explore the archive</span><Arrow /></a>
          </div>
          <div className="youtube-grid">
            {popularVideos.map((video, index) => (
              <a href={video.href} target="_blank" rel="noreferrer" className="youtube-card" key={video.href} data-reveal>
                <figure><img src={video.image} alt={`${video.title} thumbnail`} loading="lazy" /><i aria-hidden="true">▶</i></figure>
                <div><span>0{index + 1} · Most popular</span><strong>{video.views}</strong></div>
                <h3>{video.title}</h3>
              </a>
            ))}
          </div>
          <small className="youtube-note">Public channel totals and Popular-tab ranking captured July 2026.</small>
        </section>

        <section className="campaigns" id="campaigns">
          <header className="campaigns-head section-pad">
            <p className="section-index">03 · Campaign systems</p>
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
        </section>

        <section className="nirva-study section-pad" id="nirva">
          <p className="section-index section-index--light">04 · Nirva Health case study</p>
          <header className="nirva-study__head">
            <h2 data-reveal>The campaign is<br />only half the <em>system.</em></h2>
            <div data-reveal>
              <span>Health tech · Organic growth · CRO</span>
              <p>For Nirva Health, growth meant connecting discovery, conversion, retention and activation—not treating content or paid media as isolated channels.</p>
            </div>
          </header>

          <div className="nirva-hero" data-reveal>
            <img src="/nirva/hero.png" alt="Nirva Health lifestyle care experience" loading="lazy" />
            <div><span>Measured outcome</span><strong>+50%</strong><p>increase in site conversion</p></div>
          </div>

          <div className="nirva-system">
            {[
              ['01', 'Acquire', 'Published search-led articles and connected Meta ads with social content to build more efficient acquisition and reduce CAC.'],
              ['02', 'Convert', 'Planned CRO activities across the site journey, translating audience intent into a 50% increase in conversion.'],
              ['03', 'Retain', 'Improved the content experience to increase site retention, then developed ideas for LTV extensions beyond the first purchase.'],
              ['04', 'Activate', 'Used a giveaway campaign as an attendance engine, increasing participation in Nirva’s health workshops.'],
            ].map(([number, title, copy]) => (
              <article key={title} data-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>

          <div className="nirva-editorial">
            <figure data-reveal><img src="/nirva/method.png" alt="Nirva Health mobile care experience" loading="lazy" /></figure>
            <div>
              <p className="eyebrow">SEO publishing engine</p>
              <h3 data-reveal>Useful health content built for discovery—and the next action.</h3>
              <p data-reveal>Editorial planning focused on questions people were already searching for, while the site journey carried that attention toward Nirva’s consultations, subscriptions and workshops.</p>
              <nav>
                <a href="https://www.nirvahealth.com/blog/health-care-gap-lifestyle-prescription" target="_blank" rel="noreferrer">The healthcare gap <Arrow /></a>
                <a href="https://www.nirvahealth.com/blog/guide-incorporate-healthy-habits-busy-work-life" target="_blank" rel="noreferrer">Healthy habits guide <Arrow /></a>
                <a href="https://www.nirvahealth.com/blog/power-of-exercise-on-mental-health" target="_blank" rel="noreferrer">Exercise & mental health <Arrow /></a>
              </nav>
            </div>
          </div>

          <div className="nirva-outcomes">
            {[['+50%', 'site conversion'], ['Higher', 'site retention'], ['Lower', 'customer acquisition cost'], ['More', 'workshop attendance']].map(([value, label]) => (
              <div key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
        </section>

        <section className="commercial section-pad">
          <p className="section-index">05 · Commercial storytelling</p>
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
          <p className="section-index section-index--light">06 · Development portfolio</p>
          <header className="products-head"><h2 data-reveal>Strategy that ships<br />as working <em>product.</em></h2><p data-reveal>I do more than plan the funnel. I design and build the interfaces, conversion paths and technical systems that make the growth idea real.</p></header>
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
          <p className="section-index">07 · Capability model</p>
          <h2 data-reveal>Think it. Make it.<br /><em>Measure it.</em></h2>
          <div className="capability-grid">
            <article><span>01</span><h3>Think</h3><p>Positioning, campaign strategy, acquisition and the commercial story.</p></article>
            <article><span>02</span><h3>Make</h3><p>Shoots, edits, event execution, live content and pitch narratives.</p></article>
            <article><span>03</span><h3>Build</h3><p>Web products, CRM workflows, automation, attribution and measurement.</p></article>
          </div>
        </section>

        <section className="recommendations section-pad" id="recommendations">
          <p className="section-index section-index--light">08 · LinkedIn recommendations</p>
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
