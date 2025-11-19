'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TransitionAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const circlesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Animate circles expanding and fading
      circlesRef.current.forEach((circle, index) => {
        gsap.fromTo(
          circle,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 0.6,
            duration: 1.5,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent"
    >
      {/* Animated circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) circlesRef.current[i] = el
            }}
            className="absolute rounded-full border-2 border-primary/20"
            style={{
              width: `${(i + 1) * 100}px`,
              height: `${(i + 1) * 100}px`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
