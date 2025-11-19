"use client";

import { useState, useEffect, useRef } from "react";

interface Testimonial {
  name: string;
  message: string;
  photoURL: string;
  socialHandle: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
  const hasFetched = useRef(false); // Prevent multiple fetches

  useEffect(() => {
    // Prevent multiple fetches
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchTestimonials = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch('https://edunutshell-lms.onrender.com/api/testimonials', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          },
          cache: 'force-cache', // Enable caching
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }

        const data = await response.json();

        // Handle different response structures
        if (Array.isArray(data)) {
          setTestimonials(data);
        } else if (data.testimonials && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials);
        } else if (data.data && Array.isArray(data.data)) {
          setTestimonials(data.data);
        } else {
          console.warn('Unexpected API response structure:', data);
          setTestimonials([]);
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.error('Request timeout - API server may be slow or unavailable');
        } else {
          console.error('Error fetching testimonials:', err);
        }
        // Silently fail - just show empty state
        setError(null);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (testimonials.length <= 1) return;

    const startAutoScroll = () => {
      autoScrollInterval.current = setInterval(() => {
        goToNext();
      }, 4000); // Auto-scroll every 4 seconds
    };

    startAutoScroll();

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => setIsTransitioning(false), 500);
    
    // Reset auto-scroll timer when manually navigating
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = setInterval(() => {
        goToNext();
      }, 4000);
    }
  };

  const goToPrevious = () => {
    if (isTransitioning || testimonials.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => setIsTransitioning(false), 500);
    
    // Reset auto-scroll timer
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = setInterval(() => {
        goToNext();
      }, 4000);
    }
  };

  const goToNext = () => {
    if (isTransitioning || testimonials.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Create display array - duplicate testimonials if less than 3 to always show 3 cards
  const getDisplayTestimonials = () => {
    if (testimonials.length === 0) return [];
    if (testimonials.length >= 3) return testimonials;
    
    // If 1 or 2 testimonials, duplicate them to fill 3 slots
    const result = [...testimonials];
    while (result.length < 3) {
      result.push(...testimonials);
    }
    return result.slice(0, Math.max(3, testimonials.length));
  };

  const displayTestimonials = getDisplayTestimonials();

  // Testimonial Card Component
  const TestimonialCard = ({ testimonial, isCenter }: { testimonial: Testimonial; isCenter: boolean }) => (
    <>
      {/* Rating */}
      <div className="flex justify-center text-yellow-400 mb-3">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>

      {/* Content */}
      <p className="text-white mb-4 leading-relaxed text-center text-xs md:text-sm flex-grow line-clamp-4 md:line-clamp-5">
        "{testimonial.message}"
      </p>

      {/* Author */}
      <div className="flex flex-col items-center pt-3 border-t border-white/10">
        <div className="relative mb-2">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50"></div>
          <img
            src={testimonial.photoURL}
            alt={testimonial.name}
            className="relative w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border-2 border-white/20"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=' + testimonial.name.charAt(0);
            }}
          />
        </div>
        <h4 className="font-semibold text-white text-sm md:text-base">{testimonial.name}</h4>
        
        {/* Social Link - Only show on center card */}
        {testimonial.socialHandle && isCenter && (
          <a
            href={testimonial.socialHandle}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 md:gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 shadow-lg mt-2"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="hidden md:inline">LinkedIn</span>
          </a>
        )}
      </div>
    </>
  );

  return (
    <section 
      className="relative py-12 sm:py-14 md:py-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white z-10 w-full overflow-x-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-float opacity-20"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-white rounded-full animate-float-delayed opacity-20"></div>
        <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-white rounded-full animate-float opacity-20" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-8 animate-slide-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-2">
            Student Success Stories
          </h2>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto px-2">
            Hear from our graduates who are now working at top tech companies
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-300">{error}</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-blue-200">No testimonials available at the moment.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Carousel Container - Always shows 3 cards */}
            <div className="relative max-w-6xl mx-auto px-2 md:px-4">
              <div 
                ref={scrollContainerRef}
                className="overflow-hidden"
              >
                <div className="flex justify-center items-center gap-4 md:gap-6">
                  {/* Left Card */}
                  <div className="hidden md:block w-1/4 flex-shrink-0">
                    {displayTestimonials[(currentIndex - 1 + displayTestimonials.length) % displayTestimonials.length] && (
                      <div 
                        key={`left-${currentIndex}`}
                        className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30 flex flex-col shadow-xl transition-all duration-500 scale-90 opacity-100 animate-in fade-in slide-in-from-left-10"
                        style={{ animationDuration: '500ms' }}
                      >
                        <TestimonialCard 
                          testimonial={displayTestimonials[(currentIndex - 1 + displayTestimonials.length) % displayTestimonials.length]} 
                          isCenter={false}
                        />
                      </div>
                    )}
                  </div>

                  {/* Center Card */}
                  <div className="w-4/5 md:w-2/5 flex-shrink-0">
                    <div 
                      key={`center-${currentIndex}`}
                      className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-white/60 shadow-2xl bg-white/30 flex flex-col transition-all duration-500 scale-100 opacity-100 animate-in fade-in zoom-in-95"
                      style={{ animationDuration: '500ms' }}
                    >
                      <TestimonialCard 
                        testimonial={displayTestimonials[currentIndex]} 
                        isCenter={true}
                      />
                    </div>
                  </div>

                  {/* Right Card */}
                  <div className="hidden md:block w-1/4 flex-shrink-0">
                    {displayTestimonials[(currentIndex + 1) % displayTestimonials.length] && (
                      <div 
                        key={`right-${currentIndex}`}
                        className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30 flex flex-col shadow-xl transition-all duration-500 scale-90 opacity-100 animate-in fade-in slide-in-from-right-10"
                        style={{ animationDuration: '500ms' }}
                      >
                        <TestimonialCard 
                          testimonial={displayTestimonials[(currentIndex + 1) % displayTestimonials.length]} 
                          isCenter={false}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/30 z-10"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/30 z-10"
                  aria-label="Next testimonial"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Indicators - Only show for original testimonials count */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? 'w-8 h-3 bg-white'
                        : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
