import { animate, stagger, enterOnce } from '../lib/anime'
import { useAnimeScope } from '../lib/useAnimeScope'
import { sectionHeaderReveal } from '../lib/sectionReveal'
import { liPosts } from '../data/projects'
import './MarketingWork.css'

const cardMetrics = ['847 REACTIONS', '6H → 4MIN', '634 REACTIONS', '47 TESTS / 90 DAYS']

export default function MarketingWork() {
  const rootRef = useAnimeScope(self => {
    const { reduce } = self.matches
    const root = self.root
    const cards = root.querySelectorAll('.mkt__card')
    const gridEl = root.querySelector('.mkt__grid')

    if (reduce) {
      sectionHeaderReveal(root, { reduce: true })
      animate(cards, {
        opacity: [0, 1],
        duration: 300,
        ease: 'linear',
        autoplay: enterOnce(root, 15),
      })
      return
    }

    sectionHeaderReveal(root, { reduce })

    animate(cards, {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 650,
      ease: 'outCubic',
      delay: stagger(120),
      autoplay: enterOnce(gridEl, 20),
    })
  })

  return (
    <section id="work" className="mkt" ref={rootRef}>
      <div className="section-wrap">
        <p className="eyebrow">03 / SELECTED WORK</p>
        <h2 className="section-heading">Marketing Work</h2>
        <div className="mkt__grid">
          {liPosts.map((post, i) => (
            <article key={i} className="mkt__card">
              <p className="mkt__card-metric">{cardMetrics[i]}</p>
              <p className="mkt__card-tag">{post.tag}</p>
              <p className="mkt__card-text">{post.text}</p>
              <p className="mkt__card-engagement">{post.reactions}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
