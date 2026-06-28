import { useReveal } from '../hooks/useReveal'
import { liPosts } from '../data/projects'
import './MarketingWork.css'

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

export default function MarketingWork() {
  const ref = useReveal()

  return (
    <section id="marketing" className="mkt">
      <div className="section-wrap reveal" ref={ref}>
        <p className="section-label">Thought Leadership</p>
        <h2 className="section-heading">Marketing Work</h2>
        <div className="mkt__li-grid">
          {liPosts.map((post, i) => (
            <article key={i} className="mkt__li-card">
              <div className="mkt__li-header">
                <LinkedInIcon />
                <span className="mkt__li-tag">{post.tag}</span>
              </div>
              <p className="mkt__li-text">{post.text}</p>
              <p className="mkt__li-reactions">{post.reactions}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
