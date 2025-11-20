'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { Target, Eye, Users, Lightbulb, Globe } from 'lucide-react'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const AboutPage = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLHeadingElement>(null)
  const heroSubtextRef = useRef<HTMLParagraphElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to revolutionize digital learning' },
    { year: '2021', title: 'First 1000 Students', description: 'Reached our first major milestone in student enrollment' },
    { year: '2022', title: 'Global Expansion', description: 'Expanded to serve students in 50+ countries worldwide' },
    { year: '2023', title: 'AI Integration', description: 'Launched AI-powered personalized learning features' },
    { year: '2024', title: '15K+ Students', description: 'Growing community of learners across all domains' },
  ]

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from course content to student support.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a global community of learners who support and inspire each other.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously innovating to provide cutting-edge learning experiences.',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making quality education accessible to learners worldwide.',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Animation
      if (heroTextRef.current && heroSubtextRef.current && heroBgRef.current) {
        const splitText = new SplitType(heroTextRef.current, { types: 'lines' })

        if (splitText.lines) {
          gsap.set(splitText.lines, {
            overflow: 'visible',
            paddingBottom: '16px',
            lineHeight: '1.1'
          })

          splitText.lines.forEach((line) => {
            if (line.parentElement) {
              gsap.set(line.parentElement, { overflow: 'visible' })
            }
          })
        }

        gsap.fromTo(heroBgRef.current,
          { scale: 1.2 },
          { scale: 1, duration: 2, ease: 'power2.out' }
        )

        gsap.fromTo(splitText.lines,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
        )

        gsap.fromTo(heroSubtextRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 1.2 }
        )
      }

      // Mission Section Animation
      if (missionRef.current) {
        const missionElements = missionRef.current.querySelectorAll('.animate-item')
        gsap.fromTo(missionElements,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: missionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              once: false,
              invalidateOnRefresh: false
            }
          }
        )
      }

      // Vision Section Animation
      if (visionRef.current) {
        const visionElements = visionRef.current.querySelectorAll('.animate-item')
        gsap.fromTo(visionElements,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: visionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              once: false,
              invalidateOnRefresh: false
            }
          }
        )
      }

      // Story Section Animation
      if (storyRef.current) {
        const storyTitle = storyRef.current.querySelector('.story-title')
        const storySubtext = storyRef.current.querySelector('.story-subtext')

        if (storyTitle) {
          const splitStoryTitle = new SplitType(storyTitle as HTMLElement, { types: 'lines' })
          gsap.fromTo(splitStoryTitle.lines,
            { y: 50, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
              scrollTrigger: {
                trigger: storyRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
                once: false,
                invalidateOnRefresh: false
              }
            }
          )
        }

        if (storySubtext) {
          gsap.fromTo(storySubtext,
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
              scrollTrigger: {
                trigger: storyRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
                once: false,
                invalidateOnRefresh: false
              }
            }
          )
        }
      }

      // Timeline Animation - Scroll-linked
      if (timelineRef.current) {
        const timelineLine = timelineRef.current.querySelector('.timeline-line')
        const milestoneItems = timelineRef.current.querySelectorAll('.milestone-item')

        if (timelineLine) {
          gsap.fromTo(timelineLine,
            { scaleY: 0, transformOrigin: 'top' },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 60%',
                end: 'bottom 80%',
                scrub: 1,
                invalidateOnRefresh: true
              }
            }
          )
        }

        milestoneItems.forEach((item, index) => {
          const icon = item.querySelector('.milestone-icon')
          const card = item.querySelector('.milestone-card')

          gsap.fromTo(icon,
            { scale: 0, opacity: 0 },
            {
              scale: 1, 
              opacity: 1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                end: 'top 50%',
                scrub: 1,
                invalidateOnRefresh: true
              }
            }
          )

          if (card) {
            gsap.fromTo(card,
              { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
              {
                x: 0, 
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 75%',
                  end: 'top 50%',
                  scrub: 1,
                  invalidateOnRefresh: true
                }
              }
            )
          }
        })
      }

      // Values Section Animation
      if (valuesRef.current) {
        const valueCards = valuesRef.current.querySelectorAll('.value-card')
        valueCards.forEach((card) => {
          gsap.fromTo(card,
            { y: 60, opacity: 0, scale: 0.9 },
            {
              y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                once: false,
                invalidateOnRefresh: false
              }
            }
          )
        })
      }

    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 pt-36 bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
        {/* Watermark Background Image */}
        <div
          ref={heroBgRef}
          className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-20 pointer-events-none z-0"
          style={{ backgroundImage: "url('/Group 7.png')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)] z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 ref={heroTextRef} className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900 overflow-visible">
              Your breakthrough <span className="text-blue-600">begins now</span>
            </h1>
            <p ref={heroSubtextRef} className="text-xl text-gray-600 leading-relaxed">
              At Edunutshell, we don't just offer courses. We build career-changing experiences. Our programs are built for students, freshers, and working professionals who are ready to bridge the gap between education and real opportunity. Whether you're preparing for your dream job or exploring a brand-new domain, Edunutshell equips you with the skills, guidance, and industry exposure to stand out and succeed. We believe transformation happens when learning meets purpose, and every learner deserves a fair shot at proving their potential regardless of background or degree.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div ref={missionRef} className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all">
              <div className="animate-item flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="animate-item text-gray-600 text-lg leading-relaxed">
                To empower the next generation of professionals with
                the right skills, mentorship, and experience to excel in
                real-world careers.
              </p>
            </div>

            {/* Vision */}
            <div ref={visionRef} className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all">
              <div className="animate-item flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="animate-item text-gray-600 text-lg leading-relaxed">
                To be India's most impactful EdTech platform by transforming fresh talent into
                industry-ready professionals — through accessible training, practical internships, and
                lifelong career support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section ref={storyRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="story-title text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gray-900">Our</span> <span className="text-blue-600">Journey</span>
            </h2>
            <p className="story-subtext text-gray-600 text-lg max-w-3xl mx-auto">
              From a small startup to a global education platform, here's how we've grown
              to serve thousands of learners worldwide.
            </p>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-600"></div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`milestone-item flex items-center mb-8 md:mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-4 md:pr-8 text-right' : 'pl-4 md:pl-8'}`}>
                  <div className="milestone-card bg-white rounded-2xl p-4 md:p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all">
                    <div className="card-element text-blue-600 font-bold text-base md:text-lg mb-1 md:mb-2">{milestone.year}</div>
                    <h3 className="card-element text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gray-900">{milestone.title}</h3>
                    <p className="card-element text-sm md:text-base text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                <div className="milestone-icon w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full border-4 border-gray-50 
                               relative z-10 flex-shrink-0"></div>

                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gray-900">Our</span> <span className="text-blue-600">Values</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              These core values guide everything we do and shape the way we serve our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6
                               group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              <span className="text-gray-900">Powered by</span> <span className="text-blue-600">Passionate People</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto px-2">
              Our diverse team of educators, technologists, and innovators work together
              to create exceptional learning experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-md md:max-w-none mx-auto">
            {[
              { number: '50+', label: 'Team Members' },
              { number: '15+', label: 'Countries' },
              { number: '100+', label: 'Expert Mentors' },
              { number: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center py-5 md:py-0 flex flex-col items-center justify-center"
              >
                <div className="text-2xl md:text-4xl font-extrabold text-blue-600 mb-2 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-xs md:text-base text-gray-600 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Join Our <span className="text-blue-100">Learning Community</span>?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Become part of our growing family of learners and start your journey
              towards achieving your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl">
                Start Learning Today
              </Link>
              <Link href="/contact" className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-900 transition-all border-2 border-white/20">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
