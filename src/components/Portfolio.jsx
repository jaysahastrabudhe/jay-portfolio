import { animate, stagger, enterOnce, createTimeline } from '../lib/anime'
import { useAnimeScope } from '../lib/useAnimeScope'
import { marketingCaseStudies, webProjects } from '../data/projects'
import './Portfolio.css'

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
              {marketingCaseStudies.map(c => (
                <article key={c.client} className="portfolio__campaign-tile">
                  <span className="portfolio__campaign-org">{c.client}</span>
                  <h4 className="portfolio__campaign-title">{c.title}</h4>
                  <span className="portfolio__campaign-role">{c.role}</span>
                  <p className="portfolio__campaign-desc">{c.summary}</p>
                  <ul className="portfolio__campaign-contributions">
                    {c.contributions.map(item => <li key={item}>{item}</li>)}
                  </ul>
                  {c.proof && <p className="portfolio__campaign-proof">{c.proof}</p>}
                  {c.metrics && <div className="portfolio__campaign-metrics">{c.metrics.map(metric => <span key={metric}>{metric}</span>)}</div>}
                  {c.context && <p className="portfolio__campaign-context">{c.context}</p>}
                  {c.links && (
                    <div className="portfolio__campaign-links">
                      {c.links.map(link => (
                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.label}<span aria-hidden="true"> ↗</span>
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
