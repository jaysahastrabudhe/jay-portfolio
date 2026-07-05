import { useEffect, useRef } from 'react'
import { createScope } from './anime'

/**
 * React binding for anime.js v4 scopes.
 *
 * Usage:
 *   const rootRef = useAnimeScope(self => {
 *     if (self.matches.reduce) { ...quiet fades... return }
 *     ...full motion...
 *     return () => { ...optional extra cleanup... }
 *   })
 *   <section ref={rootRef}>
 *
 * The scope:
 * - scopes all string selectors inside the constructor to the root element
 * - re-runs the constructor when a media query flips (live reduced-motion)
 * - reverts every registered animation/observer/splitter on unmount
 */
export function useAnimeScope(constructor) {
  const rootRef = useRef(null)
  const constructorRef = useRef(constructor)
  constructorRef.current = constructor

  useEffect(() => {
    const scope = createScope({
      root: rootRef.current,
      mediaQueries: {
        reduce: '(prefers-reduced-motion: reduce)',
        fine: '(hover: hover) and (pointer: fine)',
      },
    })
    scope.add(self => constructorRef.current(self))
    return () => scope.revert()
  }, [])

  return rootRef
}
