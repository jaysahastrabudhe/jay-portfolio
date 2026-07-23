import { useEffect } from 'react'

const clamp = value => Math.min(1, Math.max(0, value))
const smooth = value => value * value * (3 - 2 * value)
const range = (progress, start, end) => smooth(clamp((progress - start) / (end - start)))

export function useScrollScene(ref) {
  useEffect(() => {
    const section = ref.current
    if (!section) return

    let frame = 0
    const update = () => {
      const rect = section.getBoundingClientRect()
      const distance = Math.max(1, rect.height - window.innerHeight)
      const progress = clamp(-rect.top / distance)
      const intro = range(progress, 0, .18)
      const transition = range(progress, .22, .68)
      const settle = range(progress, .58, .92)

      section.style.setProperty('--scene-progress', progress.toFixed(4))
      section.style.setProperty('--portrait-y', `${(1 - intro) * 12 - settle * 3}vh`)
      section.style.setProperty('--portrait-x', `${transition * 23}vw`)
      section.style.setProperty('--portrait-scale', `${.9 + intro * .1 - settle * .12}`)
      section.style.setProperty('--portrait-opacity', `${1 - settle * .12}`)
      section.style.setProperty('--title-left-x', `${-transition * 18}vw`)
      section.style.setProperty('--title-right-x', `${transition * 20}vw`)
      section.style.setProperty('--opening-opacity', `${1 - range(progress, .36, .56)}`)
      section.style.setProperty('--resolved-opacity', `${range(progress, .62, .82)}`)
      section.style.setProperty('--cards-opacity', `${range(progress, .72, .94)}`)
    }

    const requestUpdate = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [ref])
}
