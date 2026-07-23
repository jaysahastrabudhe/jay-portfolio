import { useEffect, useState } from 'react'
import './App.css'

const navigation = [
  ['about', 'About'],
  ['campaigns', 'Campaigns'],
  ['work', 'Digital products'],
  ['services', 'Capabilities'],
  ['testimonials', 'Recommendations'],
]

const campaigns = [
  {
    number: '01',
    title: 'Black Panther × INOX',
    client: 'Macmerise',
    role: 'Campaign planning · Reel production · Merchandise launch',
    result: 'Culture-led merchandise launch created with INOX around Black Panther.',
    image: '/slides/slide-1.jpg',
    href: 'https://www.instagram.com/reel/ClDLjXUtZL8/',
  },
  {
    number: '02',
    title: 'Shades of Love',
    client: 'Macmerise',
    role: 'Concept · Shoot direction · Edit',
    result: '3.33M plays from an emotion-first Valentine’s campaign.',
    image: '/slides/slide-2.jpg',
    href: 'https://www.instagram.com/reel/Cn_Mxyuq5cu/',
  },
  {
    number: '03',
    title: 'Alan Walker × Sunburn',
    client: 'Macmerise',
    role: 'On-ground sales · Viral content · Concert shoot',
    result: 'Official merchandise partnership activated at festival scale.',
    image: '/slides/slide-3.jpg',
    href: 'https://www.instagram.com/reel/Ci7mgVfvL1M/',
  },
  {
    number: '04',
    title: 'Anything Skin',
    client: 'Macmerise',
    role: 'Campaign strategy · Ideation · Sales activation',
    result: 'A product-led creative campaign designed to turn attention into sales.',
    image: '/slides/slide-4.jpg',
    href: 'https://www.instagram.com/reel/CiK5ovsOZSb/',
  },
  {
    number: '05',
    title: 'iPhone Giveaway',
    client: 'Macmerise',
    role: 'Multi-platform launch · View sharing · Virality',
    result: 'Giveaway mechanics distributed across platforms to compound reach.',
    image: '/slides/slide-5.jpg',
    href: 'https://www.instagram.com/reel/CfbYe5MtAF3/',
  },
  {
    number: '06',
    title: 'Women’s Day',
    client: 'Sitashree Laxminarayan',
    role: 'Account management · Shoot planning · Production · Edit',
    result: 'End-to-end social production managed from planning to final reel.',
    image: '/slides/slide-6.jpg',
    href: 'https://www.instagram.com/reel/DG69jZxo2tn/',
  },
]

const products = [
  {
    number: '01',
    name: 'Verve Nexus',
    type: 'Creative production platform',
    copy: 'A cinematic collaboration platform connecting filmmakers with scalable VFX production capacity.',
    image: '/screenshot-vervefx.png',
    tags: ['React', 'Product design', 'Motion'],
    href: 'https://forestgreen-locust-191432.hostingersite.com',
  },
  {
    number: '02',
    name: 'JawanDrop',
    type: 'Commerce and operations',
    copy: 'A live apparel storefront with Razorpay checkout, Supabase inventory allocation and operational order visibility.',
    image: '/screenshot-jawandrop.png',
    tags: ['React', 'Supabase', 'Razorpay'],
    href: 'https://jawandrop.in',
  },
  {
    number: '03',
    name: 'Jay Defence Academy',
    type: 'Education and local search',
    copy: 'An institutional website with a timed mock-test engine and a local search system that reached the top position in North Karnataka.',
    image: '/screenshot-jda.png',
    tags: ['WordPress', 'Local SEO', 'Product'],
    href: 'https://jaydefenceacademy.com',
  },
  {
    number: '04',
    name: 'beliive',
    type: 'E-commerce',
    copy: 'An operational online store with catalogue management, payment integration and end-to-end order tracking.',
    image: '/screenshot-beliive.png',
    tags: ['WooCommerce', 'Payments', 'Operations'],
    href: 'https://darkred-leopard-153534.hostingersite.com/',
  },
]

const capabilities = [
  ['01', 'Growth strategy', 'Acquisition plans grounded in audience, positioning, conversion and measurable commercial outcomes.'],
  ['02', 'Campaign production', 'Concept, shoot planning, on-ground coordination, editing and distribution managed as one system.'],
  ['03', 'Performance marketing', 'Paid media engineered around lead quality and revenue, including real-estate CPL as low as ₹117.'],
  ['04', 'Full-stack builds', 'Fast web products, commerce platforms, APIs, databases and practical internal tooling.'],
  ['05', 'AI and automation', 'Lead intake, CRM and messaging workflows that reduce response time without losing human judgment.'],
]

const recommendations = [
  {
    quote: 'Jay has a rare ability to balance strategy with execution. He blends creativity with data-driven thinking and consistently delivers impactful results. Proactive, detail-oriented and dependable, he guides teams with clarity and confidence.',
    name: 'Sayli Chaudhari',
    href: 'https://in.linkedin.com/in/sayli-chaudhari-48853576',
  },
  {
    quote: 'Jay brings approachable energy together with mature guidance. His social media and YouTube expertise, mentorship and interpersonal skills helped us sharpen our approach and elevate our performance.',
    name: 'Archi Kashmiriya',
    href: 'https://in.linkedin.com/in/archik-ux',
  },
]

const metrics = [
  ['15.4M+', 'Campaign impressions'],
  ['9.9M+', 'Campaign views'],
  ['3.33M', 'Shades of Love plays'],
  ['₹117', 'Lowest real-estate CPL'],
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Jay Sahastrabudhe home">
          <span>JAY</span><span>SAHASTRABUDHE</span>
        </a>
        <div className="availability"><i /> Available for ambitious work</div>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(value => !value)} aria-expanded={menuOpen}>
          <span>{menuOpen ? 'Close' : 'Menu'}</span><b>{menuOpen ? '×' : '+'}</b>
        </button>
      </header>

      <aside className={`menu-panel ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav>
          {navigation.map(([id, label], index) => (
            <a href={`#${id}`} key={id} onClick={closeMenu}><small>0{index + 1}</small><span>{label}</span><Arrow /></a>
          ))}
          <a href="#contact" onClick={closeMenu}><small>06</small><span>Contact</span><Arrow /></a>
        </nav>
      </aside>

      <main id="top">
        <section className="hero">
          <div className="hero__copy">
            <p className="eyebrow">Growth strategy × creative production × technology</p>
            <h1>Growth,<br /><em>engineered</em><br />differently.</h1>
            <p className="hero__intro">I build campaigns, products and systems that turn attention into accountable revenue.</p>
            <div className="hero__actions">
              <a href="#campaigns">Explore selected work <Arrow /></a>
              <a href="mailto:jaysahastrabudhe@gmail.com">Start a conversation</a>
            </div>
          </div>
          <figure className="hero__portrait">
            <img src="/jay-hero.jpg" alt="Jay Sahastrabudhe smiling in a navy suit" />
            <figcaption><span>Jay Sahastrabudhe</span><span>Mumbai · India</span></figcaption>
          </figure>
          <div className="hero__marquee" aria-hidden="true">
            <div>STRATEGIST ✦ BUILDER ✦ OPERATOR ✦ CREATIVE ✦ TECHNICAL ✦ STRATEGIST ✦ BUILDER ✦ OPERATOR ✦</div>
          </div>
        </section>

        <section className="statement" id="about">
          <div className="section-tag">01 · About</div>
          <div className="statement__grid">
            <h2 data-reveal>Not marketing beside tech. Marketing <em>through</em> tech.</h2>
            <div data-reveal>
              <p>Most teams split growth between people who make the promise and people who build the machinery. My work lives in the middle.</p>
              <p>I combine campaign thinking, production, product craft, automation and measurement into one accountable operating system.</p>
            </div>
          </div>
          <div className="metrics">
            {metrics.map(([value, label]) => <div key={label} data-reveal><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </section>

        <section className="campaigns" id="campaigns">
          <header className="section-head">
            <div className="section-tag">02 · Selected campaigns</div>
            <h2 data-reveal>Ideas made<br /><em>visible.</em></h2>
            <p data-reveal>Strategy, production and distribution carried from the first idea to the final performance signal.</p>
          </header>
          <div className="campaign-grid">
            {campaigns.map(campaign => (
              <a className="campaign-card" href={campaign.href} target="_blank" rel="noreferrer" key={campaign.title} data-reveal>
                <figure><img src={campaign.image} alt={`${campaign.title} campaign`} /></figure>
                <div className="campaign-card__meta"><span>{campaign.number}</span><span>{campaign.client}</span><Arrow /></div>
                <h3>{campaign.title}</h3>
                <p>{campaign.result}</p>
                <small>{campaign.role}</small>
              </a>
            ))}
          </div>
          <div className="campaign-strip" aria-label="More campaign snapshots">
            <div>
              {[7, 8, 1, 2, 3, 4, 7, 8, 1, 2, 3, 4].map((slide, index) => (
                <img src={`/slides/slide-${slide}.jpg`} alt="" key={`${slide}-${index}`} />
              ))}
            </div>
          </div>
        </section>

        <section className="products" id="work">
          <header className="section-head section-head--dark">
            <div className="section-tag">03 · Digital products</div>
            <h2 data-reveal>Designed to look sharp.<br />Built to <em>work hard.</em></h2>
          </header>
          <div className="product-list">
            {products.map(product => (
              <a className="product-card" href={product.href} target="_blank" rel="noreferrer" key={product.name} data-reveal>
                <div className="product-card__top"><span>{product.number}</span><span>{product.type}</span><Arrow /></div>
                <figure><img src={product.image} alt={`${product.name} website interface`} /></figure>
                <div className="product-card__copy">
                  <h3>{product.name}</h3><p>{product.copy}</p>
                  <div>{product.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="services" id="services">
          <header className="section-head">
            <div className="section-tag">04 · Capabilities</div>
            <h2 data-reveal>One operator.<br /><em>Fewer handoffs.</em></h2>
          </header>
          <div className="service-list">
            {capabilities.map(([number, title, copy]) => (
              <article key={title} data-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p><b>+</b></article>
            ))}
          </div>
        </section>

        <section className="recommendations" id="testimonials">
          <header className="section-head section-head--dark">
            <div className="section-tag">05 · LinkedIn recommendations</div>
            <h2 data-reveal>Trusted by people<br />I’ve worked <em>with.</em></h2>
          </header>
          <div className="quote-grid">
            {recommendations.map((item, index) => (
              <blockquote key={item.name} data-reveal>
                <span>0{index + 1}</span>
                <p>“{item.quote}”</p>
                <footer><div><strong>{item.name}</strong><small>LinkedIn recommendation</small></div><a href={item.href} target="_blank" rel="noreferrer" aria-label={`View ${item.name} on LinkedIn`}>in</a></footer>
              </blockquote>
            ))}
          </div>
        </section>

        <footer className="contact" id="contact">
          <p>Have something ambitious in mind?</p>
          <a href="mailto:jaysahastrabudhe@gmail.com">Let’s make it<br /><em>answer.</em> <Arrow /></a>
          <div className="contact__foot">
            <span>Jay Sahastrabudhe © 2026</span>
            <nav><a href="https://linkedin.com/in/jaysahastrabudhe" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/jaysahastrabudhe" target="_blank" rel="noreferrer">GitHub</a></nav>
            <a href="#top">Back to top ↑</a>
          </div>
        </footer>
      </main>
    </>
  )
}
