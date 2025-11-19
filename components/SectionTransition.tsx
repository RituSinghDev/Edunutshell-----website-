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

  useEffect(() => {
    // Check if mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: isMobile ? 'bottom top' : 'bottom 5%',
          scrub: 1,
          invalidateOnRefresh: false, // Prevent unnecessary refreshes
          onUpdate: (self) => {
            const progress = self.progress
            
            if (isMobile) {
              // Mobile: Simple fade in, no fade out
              if (progress < 0.1) {
                gsap.set(section, {
                  opacity: progress / 0.1,
                  y: 40 * (1 - progress / 0.1),
                })
              } else {
                gsap.set(section, {
                  opacity: 1,
                  y: 0,
                })
              }
            } else {
              // Desktop: Original behavior with fade out
              if (progress < 0.1) {
                gsap.set(section, {
                  opacity: progress / 0.1,
                  y: 40 * (1 - progress / 0.1),
                })
              } else if (progress >= 0.1 && progress <= 0.95) {
                gsap.set(section, {
                  opacity: 1,
                  y: 0,
                })
              } else if (progress > 0.95) {
                const fadeProgress = (progress - 0.95) / 0.05
                gsap.set(section, {
                  opacity: 1 - (fadeProgress * 0.3),
                  y: -20 * fadeProgress,
                })
              }
            }
          },
        },
      })
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`section-transition ${className}`}
      style={{
        willChange: 'transform, opacity',
        width: '100%',
        maxWidth: '100vw',
        position: 'relative',
      }}
    >
      {children}
    </div>
  )
}
