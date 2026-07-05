import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, ScrambleTextPlugin, useGSAP)
gsap.defaults({ ease: 'power3.out', duration: 0.7 })

if (import.meta.env.DEV) {
  // Dev-only handles for debugging/preview harnesses that suspend rAF.
  window.gsap = gsap
  window.ScrollTrigger = ScrollTrigger
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
