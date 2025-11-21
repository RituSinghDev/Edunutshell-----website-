'use client'

import { useState, useEffect } from 'react'

export default function ScrollEnquiryPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    college: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Check if user has already filled the form in this session
    const hasFilledForm = sessionStorage.getItem('enquiryFormFilled')
    if (hasFilledForm) {
      setHasShown(true)
      return
    }

    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      if (hasShown) return

      // Debounce scroll checks to reduce performance impact
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      scrollTimeout = setTimeout(() => {
        // Get scroll position
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = window.innerHeight

        // Calculate scroll percentage
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100

        if (scrollPercentage >= 15 && !isVisible) {
          setIsVisible(true)
          setHasShown(true)
          // Prevent scrolling when popup is open
          document.body.style.overflow = 'hidden'
          document.documentElement.style.overflow = 'hidden'
        }
      }, 100)
    }

    // Delay initial check to avoid blocking initial render
    const initTimeout = setTimeout(() => {
      handleScroll()
    }, 500)

    // Listen to both scroll and Lenis scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Also listen to Lenis scroll event if available
    const lenisScrollHandler = () => handleScroll()
    window.addEventListener('lenis-scroll', lenisScrollHandler as EventListener)

    return () => {
      clearTimeout(initTimeout)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('lenis-scroll', lenisScrollHandler as EventListener)
    }
  }, [hasShown, isVisible])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits'
    }

    if (!formData.course) {
      newErrors.course = 'Please select a program'
    }

    if (!formData.college.trim()) {
      newErrors.college = 'College name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        const response = await fetch('https://sheetdb.io/api/v1/32r64i5cxdi2x', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 5t3ohqc39zlaw7wnqolvywww6xzp610dvsgadmqv',
          },
          body: JSON.stringify([{
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            program: formData.course,
            college: formData.college,
            message: '',
          }]),
        })

        if (!response.ok) {
          throw new Error('Failed to submit form')
        }

        // Store in sessionStorage to prevent showing again
        sessionStorage.setItem('enquiryFormFilled', 'true')

        // Close popup and restore scrolling
        setIsVisible(false)
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''

        // Show success message
        alert('Thank you for your interest! We will contact you soon.')
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('Failed to submit form. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" data-lenis-prevent>
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        style={{ backdropFilter: 'blur(8px)' }}
      />

      {/* Popup Form */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto animate-scale-in" data-lenis-prevent>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all hover:scale-110"
          aria-label="Close popup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white mb-2">
            🎓 Get Started Today!
          </h2>
          <p className="text-blue-100 text-sm">
            Fill in your details to receive personalized course recommendations
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.name ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.phone ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="1234567890"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Program Selection */}
          <div>
            <label htmlFor="course" className="block text-sm font-semibold text-gray-700 mb-2">
              Program Interested In <span className="text-red-500">*</span>
            </label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.course ? 'border-red-500' : 'border-gray-200'
                }`}
            >
              <option value="">Select a program</option>
              <option value="aws">AWS Cloud Practitioner</option>
              <option value="azure">Azure Solutions Architect</option>
              <option value="gcp">Google Cloud Platform</option>
              <option value="ml">Machine Learning Fundamentals</option>
              <option value="deep-learning">Deep Learning with TensorFlow</option>
              <option value="nlp">Natural Language Processing</option>
              <option value="computer-vision">Computer Vision</option>
              <option value="devops">Cloud DevOps Engineering</option>
              <option value="fullstack">Full Stack Web Development</option>
              <option value="data-science">Data Science with Python</option>
              <option value="cybersecurity">Cybersecurity Fundamentals</option>
              <option value="blockchain">Blockchain Development</option>
              <option value="other">Other</option>
            </select>
            {errors.course && (
              <p className="text-red-500 text-xs mt-1">{errors.course}</p>
            )}
          </div>

          {/* College Name Field */}
          <div>
            <label htmlFor="college" className="block text-sm font-semibold text-gray-700 mb-2">
              College Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.college ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="Enter your college name"
            />
            {errors.college && (
              <p className="text-red-500 text-xs mt-1">{errors.college}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
          </button>

          {/* Info Text */}
          <p className="text-xs text-gray-500 text-center mt-4">
            By submitting, you agree to receive course information and updates from EduNutshell
          </p>
        </form>
      </div>
    </div>
  )
}
