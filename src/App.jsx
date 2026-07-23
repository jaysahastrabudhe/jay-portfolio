import { useEffect, useState } from 'react'
import HeroScene from './components/HeroScene'
import { campaignChapters, digitalProducts, recommendations } from './data/portfolio'
import './App.css'

const navItems = [['story', 'Story'], ['now', 'Now'], ['youtube', 'YouTube'], ['campaigns', 'Campaigns'], ['nirva', 'Nirva case'], ['products', 'Development'], ['recommendations', 'Words']]

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
        <a className="availability" href="mailto:jaysahastrabudhe@gmail.com"><i /> Let’s talk</a>
        <button type="button" className="menu-button" onClick={() => setMenuOpen(value => !value)} aria-expanded={menuOpen}>{menuOpen ? 'Close' : 'Menu'} <b>{menuOpen ? '×' : '+'}</b></button>
      </header>
      <a className="mobile-contact" href="mailto:jaysahastrabudhe@gmail.com">Let’s talk <Arrow /></a>
      <aside className={`menu-panel ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav>
          {navItems.map(([id, label], index) => <a href={`#${id}`} onClick={() => setMenuOpen(false)} key={id}><small>0{index + 1}</small><span>{label}</span><Arrow /></a>)}
          <a href="#contact" onClick={() => setMenuOpen(false)}><small>07</small><span>Let’s talk</span><Arrow /></a>
        </nav>
      </aside>

      <main id="top">
        <HeroScene />

        <div className="credibility-rail" aria-label="Selected clients">
          <span>Let&apos;s Enterprise</span><span>Macmerise</span><span>Nirva Health</span><span>FullHouse</span><span>Sitashree Laxminarayan</span><span>Kotibhaskar</span>
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

        <section className="now section-pad" id="now">
          <p className="section-index">02 · Where am I now?</p>
          <div className="now-lead">
            <div>
              <span>Let&apos;s Enterprise · Pune</span>
              <h2 data-reveal>Building the system behind a <em>Working BBA.</em></h2>
            </div>
            <div data-reveal>
              <p>Let&apos;s Enterprise pairs a recognised BBA degree with three years of real work—apprenticeships, industry projects, mentorship and a portfolio that proves what students can do.</p>
              <a href="https://letsenterprise.in/" target="_blank" rel="noreferrer">See what LE is all about <Arrow /></a>
            </div>
          </div>
          <div className="now-grid">
            <article data-reveal><span>01 · Demand</span><h3>Campaigns built for admissions.</h3><p>Planning and building campaigns that turn student and parent interest into qualified conversations.</p></article>
            <article data-reveal><span>02 · Infrastructure</span><h3>The complete admission system.</h3><p>Built the admission journey end to end, connecting enquiry, communication and follow-through.</p></article>
            <article data-reveal><span>03 · Delivery</span><strong>50% → 100%</strong><h3>WhatsApp delivery rate.</h3><p>Used AI-driven template refinement to remove delivery friction and bring critical communication reliably to every lead.</p></article>
          </div>
        </section>

        <section className="youtube section-pad" id="youtube">
          <p className="section-index section-index--light">03 · Owned media archive</p>
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
            <p className="section-index">04 · Campaign systems</p>
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
          <div className="campaign-download section-pad">
            <div><span>Selected research</span><h3>Research you can<br /><em>take with you.</em></h3></div>
            <div className="document-downloads">
              <a href="https://raw.githubusercontent.com/jaysahastrabudhe/jay-portfolio/main/downloads/emotional-marketing-fmcg-research-report.pdf" download="Jay-Sahastrabudhe-Emotional-Marketing-Research.pdf"><span><small>MBA research report</small>Emotional marketing & FMCG · PDF</span><Arrow /></a>
            </div>
          </div>
        </section>

        <section className="nirva-study section-pad" id="nirva">
          <p className="section-index section-index--light">05 · Nirva Health case study</p>
          <header className="nirva-study__head">
            <h2 data-reveal>The campaign is<br />only half the <em>system.</em></h2>
            <div data-reveal>
              <span>Health tech · Organic growth · CRO</span>
              <p>For Nirva Health, growth meant connecting discovery, conversion, retention and activation—not treating content or paid media as isolated channels.</p>
            </div>
          </header>

          <div className="nirva-brief" data-reveal>
            <figure><img src="/nirva/hero.png" alt="Nirva Health lifestyle care experience" loading="lazy" /></figure>
            <div className="nirva-brief__content">
              <div><span>Primary markets</span><strong>US · UK</strong></div>
              <p>Led growth work across the customer journey, increasing conversion and views through planned CRO activities.</p>
              <p>Planned the international Apple Watch giveaway, including multi-site campaign listings designed to expand reach and workshop participation.</p>
              <ul><li>Increased conversion</li><li>Increased views</li><li>CRO activities</li></ul>
            </div>
          </div>
        </section>

        <section className="workshop section-pad" id="workshop">
          <p className="section-index">06 · Teaching & impact</p>
          <div className="workshop-grid">
            <a className="workshop-media" href="https://www.linkedin.com/feed/update/urn:li:activity:7426147112528297984/" target="_blank" rel="noreferrer" data-reveal>
              <video src="/workshops/deasraa-workshop.mp4" poster="/workshops/deasraa-workshop.jpg" muted loop playsInline autoPlay preload="metadata" aria-label="DeAsraa women entrepreneurs digital marketing workshop recap" />
              <span>Watch the workshop recap <Arrow /></span>
            </a>
            <div className="workshop-copy">
              <span>deAsra Foundation · Women entrepreneurs</span>
              <h2 data-reveal>Helping founders<br />advertise with <em>clarity.</em></h2>
              <p data-reveal>Led a practical digital marketing workshop for budding women founders, turning paid advertising from a source of confusion and loss into a structured growth system.</p>
              <ul>
                <li>Reduce losses caused by ineffective ads</li>
                <li>Recover and secure business advertising accounts</li>
                <li>Build funnel-based advertising for growth</li>
                <li>Develop customer personas and precise ad targeting</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="products section-pad" id="products">
          <p className="section-index section-index--light">07 · Development portfolio</p>
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

        <section className="recommendations section-pad" id="recommendations">
          <p className="section-index section-index--light">08 · LinkedIn recommendations · All 4</p>
          <div className="recommendations-head"><h2 data-reveal>The work,<br />in their <em>words.</em></h2><a href="https://www.linkedin.com/in/jaysahastrabudhe/details/recommendations/?detailScreenTabIndex=0" target="_blank" rel="noreferrer">View all on LinkedIn <Arrow /></a></div>
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
          <p>Have an idea, a challenge or simply want to connect?</p>
          <a href="mailto:jaysahastrabudhe@gmail.com">Let’s talk.<br /><em>Contact me.</em> <Arrow /></a>
          <a className="contact-email" href="mailto:jaysahastrabudhe@gmail.com">jaysahastrabudhe@gmail.com</a>
          <div><span>Jay Sahastrabudhe © 2026</span><nav><a href="https://linkedin.com/in/jaysahastrabudhe" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/jaysahastrabudhe" target="_blank" rel="noreferrer">GitHub</a></nav><a href="#top">Back to top ↑</a></div>
        </footer>
      </main>
    </>
  )
}
