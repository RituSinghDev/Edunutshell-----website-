'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Extend Window interface to store Lenis instance
declare global {
  interface Window {
    __lenisInstance?: Lenis
  }
}

export default function LenisScroll() {
  const rafRef = useRef<((time: number) => void) | null>(null)
  const isInitializedRef = useRef(false)
  const scrollTriggerUpdateRef = useRef<number>(0)

  useEffect(() => {
    // Prevent multiple instances using window-level singleton
    if (isInitializedRef.current || window.__lenisInstance) {
      return
    }

    // Delay initialization to allow DOM to settle
    const initTimeout = setTimeout(() => {
      isInitializedRef.current = true

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

      window.__lenisInstance = lenis

      // Throttle ScrollTrigger updates to avoid excessive calls
      lenis.on('scroll', () => {
        if (scrollTriggerUpdateRef.current) {
          cancelAnimationFrame(scrollTriggerUpdateRef.current)
        }
        scrollTriggerUpdateRef.current = requestAnimationFrame(() => {
          ScrollTrigger.update()
        })
      })

      // Configure ScrollTrigger to work with Lenis
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length && value !== undefined) {
            lenis.scrollTo(value, { immediate: true })
          }
          return lenis.animatedScroll || 0
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          }
        }
      })

      const raf = (time: number) => {
        lenis.raf(time * 1000)
      }
      rafRef.current = raf

      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      // Delay ScrollTrigger refresh to avoid initial load conflicts
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, 100)

    return () => {
      clearTimeout(initTimeout)
      if (scrollTriggerUpdateRef.current) {
        cancelAnimationFrame(scrollTriggerUpdateRef.current)
      }
      if (rafRef.current) {
        gsap.ticker.remove(rafRef.current)
      }
      if (window.__lenisInstance) {
        ScrollTrigger.scrollerProxy(document.body, {})
        window.__lenisInstance.destroy()
        delete window.__lenisInstance
        isInitializedRef.current = false
        ScrollTrigger.refresh()
      }
    }
  }, [])

  return null
}
