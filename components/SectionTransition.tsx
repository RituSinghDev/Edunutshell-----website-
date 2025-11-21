'use client'

import { useEffect, useRef, ReactNode, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionTransitionProps {
  children: ReactNode
  id: string
  className?: string
}

export default function SectionTransition({ children, id, className = '' }: SectionTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const resizeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    // Check if mobile viewport with debouncing
    const checkMobile = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      resizeTimeoutRef.current = setTimeout(() => {
        setIsMobile(window.innerWidth < 768)
      }, 150)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Delay initialization to prevent conflicts with Lenis
    const initTimeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Use GSAP's native animation instead of onUpdate for better performance
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: isMobile ? 'bottom top' : 'bottom 5%',
            scrub: 1,
            invalidateOnRefresh: false,
          }
        })

        if (isMobile) {
          // Mobile: Simple fade in, no fade out
          tl.fromTo(section, 
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.1, ease: 'none' }
          )
          .to(section, 
            { opacity: 1, y: 0, duration: 0.9, ease: 'none' }
          )
        } else {
          // Desktop: Fade in, stay visible, then fade out
          tl.fromTo(section,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.1, ease: 'none' }
          )
          .to(section,
            { opacity: 1, y: 0, duration: 0.85, ease: 'none' }
          )
          .to(section,
            { opacity: 0.7, y: -20, duration: 0.05, ease: 'none' }
          )
        }
      }, section)

      return () => ctx.revert()
    }, 150)

    return () => {
      clearTimeout(initTimeout)
    }
  }, [isMobile])

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`section-transition ${className}`}
      style={{
        width: '100%',
        maxWidth: '100vw',
        position: 'relative',
      }}
    >
      {children}
    </div>
  )
}
