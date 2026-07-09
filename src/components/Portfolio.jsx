import { animate, stagger, enterOnce, createTimeline } from '../lib/anime'
import { useAnimeScope } from '../lib/useAnimeScope'
import { webProjects } from '../data/projects'
import './Portfolio.css'

const marketingCampaigns = [
  {
    name: "Let's Enterprise",
    role: "Meta Ads, Lead Gen & Growth Manager",
    desc: "Optimized full-funnel Meta Ads lead generation campaigns. Structured audience definitions and visual assets, achieving 6x ROI and 15M+ views across campaigns."
  },
  {
    name: "FullHouse Entertainment",
    role: "Head of Department — Social Media & Marketing",
    desc: "Directed paid performance and brand campaigns across Meta, Google, LinkedIn, and YouTube. Allocated media budgets and managed creative content teams."
  },
  {
    name: "Rom Guruji (Founder)",
    role: "YouTube Brand & SEO Strategy",
    desc: "Built and scaled a search-optimized YouTube tech channel to 23,000+ subscribers and 15M+ views. Managed scripts, editing, and thumbnail A/B testing."
  },
  {
    name: "Nirva Health (YC '21)",
    role: "Organic Growth Expert",
    desc: "Implemented organic lead generation, search ranking, and social content strategies. Drove +20% traffic growth and built client lead qualification systems."
  }
]

export default function Portfolio() {
  const ref = useAnimeScope(self => {
    const root = self.root
    const eyebrow = root.querySelector('.portfolio__eyebrow')
    const heading = root.querySelector('.portfolio__heading')
    const devHeading = root.querySelector('.portfolio__col-heading--dev')
    const mktHeading = root.querySelector('.portfolio__col-heading--mkt')
    const screenshotTiles = root.querySelectorAll('.portfolio__screenshot-tile')
    const campaignTiles = root.querySelectorAll('.portfolio__campaign-tile')

    if (self.matches.reduce) {
      animate([eyebrow, heading, devHeading, mktHeading, ...screenshotTiles, ...campaignTiles], {
        opacity: [0, 1],
        duration: 300,
        ease: 'linear',
        autoplay: enterOnce(root, 15),
      })
      return
    }

    const tl = createTimeline({ defaults: { ease: 'outExpo' } })
    tl.add(eyebrow, { opacity: [0, 1], translateY: [24, 0], duration: 600 }, 0)
    tl.add(heading, { opacity: [0, 1], translateY: [24, 0], duration: 700 }, 100)

    animate([devHeading, mktHeading], {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 650,
      ease: 'outCubic',
      autoplay: enterOnce(root, 20),
    })

    animate(screenshotTiles, {
      opacity: [0, 1],
      translateY: [36, 0],
      duration: 650,
      ease: 'outCubic',
      delay: stagger(80),
      autoplay: enterOnce(root, 20),
    })

    animate(campaignTiles, {
      opacity: [0, 1],
      translateY: [36, 0],
      duration: 650,
      ease: 'outCubic',
      delay: stagger(80),
      autoplay: enterOnce(root, 20),
    })
  })

  return (
    <section id="portfolio" className="portfolio" ref={ref}>
      <div className="portfolio__inner">
        <p className="portfolio__eyebrow">03 / ECOSYSTEM PORTFOLIO</p>
        <h2 className="portfolio__heading">Development & Marketing</h2>

        {/* Side-By-Side Grid Column */}
        <div className="portfolio__columns">
          
          {/* Left Column: Development Portfolio */}
          <div className="portfolio__col">
            <h3 className="portfolio__col-heading portfolio__col-heading--dev">Development Portfolio</h3>
            <div className="portfolio__screenshot-grid">
              {webProjects.map(p => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio__screenshot-tile"
                  aria-label={`Visit ${p.name}`}
                >
                  <div className="portfolio__screenshot-body">
                    <h4 className="portfolio__screenshot-title">{p.name}</h4>
                    <p className="portfolio__project-desc">{p.desc}</p>
                    <div className="portfolio__tags">
                      {p.tags.map(t => (
                        <span key={t} className="portfolio__tag">[{t.toLowerCase()}]</span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Marketing Portfolio */}
          <div className="portfolio__col">
            <h3 className="portfolio__col-heading portfolio__col-heading--mkt">Marketing Portfolio</h3>
            
            {/* Core Marketing Campaigns */}
            <div className="portfolio__campaign-list">
              {marketingCampaigns.map(c => (
                <div key={c.name} className="portfolio__campaign-tile">
                  <span className="portfolio__campaign-org">{c.name}</span>
                  <span className="portfolio__campaign-role">{c.role}</span>
                  <p className="portfolio__campaign-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
