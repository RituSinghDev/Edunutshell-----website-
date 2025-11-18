'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TransitionAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const circlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !circlesRef.current) return

    const ctx = gsap.context(() => {
      // Animate text
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      })

      // Animate circles
      const circles = circlesRef.current?.querySelectorAll('.circle')
      if (circles) {
        gsap.from(circles, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          },
          scale: 0,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'back.out(1.7)'
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black"
    >
      {/* Animated circles background */}
      <div ref={circlesRef} className="absolute inset-0 pointer-events-none">
        <div className="circle absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
        <div className="circle absolute top-1/2 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-xl" />
        <div className="circle absolute bottom-1/4 left-1/2 w-36 h-36 bg-pink-500/10 rounded-full blur-xl" />
      </div>

      {/* Center text content */}
      <div ref={textRef} className="relative z-10 text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Ready to Start Your Journey?
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Join thousands of students who have transformed their careers with us
        </p>
      </div>
    </div>
  )
}
