'use client'

import { useEffect, useRef, ReactNode } from 'react'
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

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Main timeline for enter/exit animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 5%',
          scrub: 1,
          onUpdate: (self) => {
            // Smooth transitions for both directions
            const progress = self.progress
            
            // Fade in from bottom (scrolling down)
            if (progress < 0.1) {
              gsap.set(section, {
                opacity: progress / 0.1,
                y: 40 * (1 - progress / 0.1),
              })
            }
            // Fully visible in middle - extended range
            else if (progress >= 0.1 && progress <= 0.95) {
              gsap.set(section, {
                opacity: 1,
                y: 0,
              })
            }
            // Fade out to top (scrolling down past section) - only at the very end
            else if (progress > 0.95) {
              const fadeProgress = (progress - 0.95) / 0.05
              gsap.set(section, {
                opacity: 1 - (fadeProgress * 0.3), // Only fade to 70% opacity
                y: -20 * fadeProgress,
              })
            }
          },
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`section-transition ${className}`}
      style={{
        willChange: 'transform, opacity',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {children}
    </div>
  )
}
