import { useState, useEffect, useRef } from 'react'
import { animate, stagger, scrambleText, enterOnce } from '../lib/anime'
import { useAnimeScope } from '../lib/useAnimeScope'
import { webProjects, githubProjects } from '../data/projects'
import './Terminal.css'

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Jay Sahastrabudhe Growth Engine & CLI Sandbox v1.0.0', color: 'var(--terminal)' },
    { type: 'output', text: 'Type "help" to view all available commands.', color: 'var(--panel-muted)' },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isExecuting, setIsExecuting] = useState(false)
  const cliBodyRef = useRef(null)

  useEffect(() => {
    if (cliBodyRef.current) {
      cliBodyRef.current.scrollTop = cliBodyRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = async (e) => {
    if (e.key !== 'Enter') return
    const cmdText = inputValue.trim()
    setInputValue('')
    if (!cmdText) return

    const newHistory = [...history, { type: 'input', text: cmdText }]
    setHistory(newHistory)

    const args = cmdText.split(' ')
    const baseCmd = args[0].toLowerCase()

    if (baseCmd === 'clear') {
      setHistory([])
      return
    }

    setIsExecuting(true)

    if (baseCmd === 'help') {
      setHistory(prev => [
        ...prev,
        { type: 'output', text: 'Available commands:' },
        { type: 'output', text: '  about      - Display Jay Sahastrabudhe\'s developer & growth bio' },
        { type: 'output', text: '  projects   - List key full-stack & automation web platforms' },
        { type: 'output', text: '  sysinfo    - Output local ecosystem sandbox status and telemetry' },
        { type: 'output', text: '  simulate   - Trigger interactive sandboxed lead webhook intake pipeline' },
        { type: 'output', text: '  clear      - Clear console terminal screen' }
      ])
    } else if (baseCmd === 'about') {
      setHistory(prev => [
        ...prev,
        { type: 'output', text: 'Jay Sahastrabudhe — Full Stack Developer & Growth Engineer' },
        { type: 'output', text: 'I build automated pipelines, marketing message routers, Zoho CRM webhooks, and React/Next.js platforms.' },
        { type: 'output', text: 'My work bridges the gap between software development and acquisition strategy.' }
      ])
    } else if (baseCmd === 'projects') {
      setHistory(prev => [
        ...prev,
        { type: 'output', text: 'Active Shipped Web Platforms:' },
        { type: 'output', text: '  1. LE WhatsApp Engine      - Next.js 15, Neon Postgres, Upstash Redis Queue, Twilio, Zoho CRM API' },
        { type: 'output', text: '  2. MailBlast Mass Mailer   - Next.js, Drizzle, Resend API' },
        { type: 'output', text: '  3. Verve Nexus             - React, Vite, GSAP visual planner' },
        { type: 'output', text: '  4. JawanDrop               - React, Supabase, Razorpay SDK' },
        { type: 'output', text: '  5. Jay Defence Academy     - WordPress, timed exam mock test engine' }
      ])
    } else if (baseCmd === 'sysinfo') {
      setHistory(prev => [
        ...prev,
        { type: 'output', text: 'Ecosystem Telemetry:' },
        { type: 'output', text: '  Database State:   Mock Neon Postgres Connected (Isolated)' },
        { type: 'output', text: '  Messaging Queue:  Mock Upstash Redis Active' },
        { type: 'output', text: '  Twilio API:       Sandboxed Bypass Active (E.164 Mode)' },
        { type: 'output', text: '  Zoho CRM write:   Local Buffer Writes Enabled' },
        { type: 'output', text: '  SLA Telemetry:    Latency <= 2.2s, Uptime 100%' }
      ])
    } else if (baseCmd === 'simulate') {
      let leadName = 'Jane Doe'
      const nameIndex = cmdText.indexOf('--name')
      if (nameIndex !== -1) {
        const parts = cmdText.slice(nameIndex + 6).trim().split('"')
        if (parts.length >= 2) leadName = parts[1]
      }

      setHistory(prev => [
        ...prev,
        { type: 'output', text: 'Initializing sandboxed webhook intake cycle...' }
      ])

      const steps = [
        `[WEBHOOK] Intake payload received from Meta Ads Campaign...`,
        `[NORMALIZER] Target Lead: "${leadName}". Phone normalized: +91 90123 45678 (E.164)`,
        `[CLASSIFIER] Academic Level: "Graduate". Urgency score: HIGH`,
        `[LOGIC_BUILDER] Fetching cached React Flow graph rules... 8 nodes, 7 edges loaded.`,
        `[LOGIC_BUILDER] Evaluating conditions: LeadSource="Meta Ads" & Urgency=HIGH`,
        `[LOGIC_BUILDER] Route matched: Meta Campaign. Queueing welcome dispatch.`,
        `[SANDBOX] [SAFETY GUARD] Bypass active. Redirecting Twilio WhatsApp dispatch to local virtual emulator.`,
        `[DISPATCHER] Enqueuing simulated message "wa_welcome_meta_student" via mock queue worker...`,
        `[CRM_SYNC] [SAFETY GUARD] Zoho CRM writeback enqueued to mock stack database.`,
        `[SUCCESS] Lead intake lifecycle executed in 2.01s. Total cost: $0.00 (Sandboxed).`
      ]

      for (let i = 0; i < steps.length; i++) {
        await new Promise((res) => setTimeout(res, 200))
        setHistory(prev => [...prev, { type: 'output', text: steps[i], color: i === steps.length - 1 ? 'var(--terminal)' : undefined }])
      }
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'output', text: `Command not found: "${cmdText}". Type "help" for a list of commands.`, color: '#FF5F56' }
      ])
    }

    setIsExecuting(false)
  }

  const ref = useAnimeScope(self => {
    const root = self.root
    const eyebrow = root.querySelector('.terminal__eyebrow')
    const heading = root.querySelector('.terminal__heading')
    const cliContainer = root.querySelector('.terminal__cli')
    const screenshotTiles = root.querySelectorAll('.terminal__screenshot-tile')
    const repoTiles = root.querySelectorAll('.terminal__repo-tile')
    const repoGrid = root.querySelector('.terminal__repo-grid')
    const repoNames = root.querySelectorAll('.terminal__repo-name')

    if (self.matches.reduce) {
      animate([eyebrow, heading, cliContainer, ...screenshotTiles, ...repoTiles], {
        opacity: [0, 1],
        duration: 300,
        ease: 'linear',
        autoplay: enterOnce(root, 15),
      })
      return
    }

    animate([eyebrow, heading], {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 700,
      ease: 'outCubic',
      delay: stagger(100),
      autoplay: enterOnce(root, 20),
    })

    animate(cliContainer, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 750,
      ease: 'outCubic',
      autoplay: enterOnce(root, 20),
    })

    animate(screenshotTiles, {
      opacity: [0, 1],
      translateY: [36, 0],
      duration: 650,
      ease: 'outCubic',
      delay: stagger(100),
      autoplay: enterOnce(root, 20),
    })

    animate(repoTiles, {
      opacity: [0, 1],
      translateY: [36, 0],
      duration: 650,
      ease: 'outCubic',
      delay: stagger(100),
      autoplay: enterOnce(repoGrid || root, 20),
    })

    if (repoNames.length > 0) {
      animate(repoNames, {
        textContent: scrambleText({ chars: 'uppercase' }),
        duration: 600,
        ease: 'outQuad',
        delay: stagger(80),
        autoplay: enterOnce(repoGrid || root, 20),
      })
    }
  })

  return (
    <section id="terminal" className="terminal" ref={ref}>
      <div className="terminal__inner">
        <p className="terminal__eyebrow">04 / THE TERMINAL</p>
        <h2 className="terminal__heading">The Terminal</h2>

        {/* Interactive CLI Console */}
        <div className="terminal__cli" style={{ marginBottom: '2.5rem' }}>
          <div className="terminal__cli-header">
            <span className="terminal__cli-dot terminal__cli-dot--red" />
            <span className="terminal__cli-dot terminal__cli-dot--yellow" />
            <span className="terminal__cli-dot terminal__cli-dot--green" />
            <span className="terminal__cli-title">Ecosystem Sandbox</span>
          </div>
          <div className="terminal__cli-body" ref={cliBodyRef}>
            {history.map((line, idx) => (
              <div
                key={idx}
                className="terminal__cli-line"
                style={{ color: line.color, fontFamily: 'var(--font-mono)' }}
              >
                {line.type === 'input' ? (
                  <>
                    <span className="terminal__cli-prompt">jay@ecosystem:~$</span> {line.text}
                  </>
                ) : (
                  line.text
                )}
              </div>
            ))}
            <div className="terminal__cli-input-line">
              <span className="terminal__cli-prompt">jay@ecosystem:~$</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleCommand}
                disabled={isExecuting}
                className="terminal__cli-input"
                placeholder={isExecuting ? 'Processing...' : 'type help...'}
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>
        </div>

        <div className="terminal__screenshot-grid">
          {webProjects.map(p => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="terminal__screenshot-tile"
              aria-label={`Visit ${p.name}`}
            >
              <div className="terminal__screenshot-wrap">
                {p.image ? (
                  <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" />
                ) : (
                  <div className="terminal__screenshot-placeholder">
                    <span>{p.name[0]}</span>
                  </div>
                )}
              </div>
              <div className="terminal__screenshot-body">
                <h3 className="terminal__screenshot-title">{p.name}</h3>
                <div className="terminal__tags">
                  {p.tags.map(t => (
                    <span key={t} className="terminal__tag">[{t.toLowerCase()}]</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="terminal__repo-grid">
          {githubProjects.map(p => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="terminal__repo-tile"
              aria-label={p.name}
            >
              <div className="terminal__repo-header">
                <span className="terminal__repo-dot" />
                <span className="terminal__repo-dot" />
                <span className="terminal__repo-dot" />
                <GitHubIcon />
              </div>
              <span className="terminal__repo-name">{p.name}</span>
              <p className="terminal__repo-desc">{p.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
