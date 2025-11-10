'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      syncTouch: false,
      autoResize: true,
      wrapper: window,
      content: document.documentElement,
      prevent: (node) => {
        // Prevent Lenis from handling scroll on elements with data-lenis-prevent
        return node.hasAttribute('data-lenis-prevent') || 
               node.closest('[data-lenis-prevent]') !== null
      }
    })

    // Sync Lenis with GSAP ScrollTrigger and emit custom events
    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
      
      // Emit custom event for other components to listen to
      window.dispatchEvent(new CustomEvent('lenis-scroll', { detail: e }))
    })

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(() => {})
    }
  }, [])

  return null
}
