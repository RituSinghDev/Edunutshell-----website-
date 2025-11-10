"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  level: string;
  category?: string;
  studentsEnrolled: number;
}

export default function PopularCourses() {
  const [isVisible, setIsVisible] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://edunutshell-lms.onrender.com/api/courses/list');

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();

        // Handle different response structures
        if (Array.isArray(data)) {
          setCourses(data);
        } else if (data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else if (data.data && Array.isArray(data.data)) {
          setCourses(data.data);
        } else {
          console.warn('Unexpected API response structure:', data);
          setCourses([]);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Use API courses - display first 8
  const displayCourses = courses.slice(0, 8);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-scroll effect - scroll one card at a time continuously in one direction
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || loading || displayCourses.length === 0) return;

    let scrollInterval: NodeJS.Timeout;
    let isPaused = false;

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      scrollInterval = setInterval(() => {
        if (!isPaused && scrollContainer) {
          // Calculate card width including gap (320px card + 24px gap)
          const cardWidth = 344; // 320px + 24px gap
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          const currentScroll = scrollContainer.scrollLeft;

          // Check if we've reached the end
          if (currentScroll >= maxScroll - 10) {
            // Reset to start smoothly
            scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // Scroll by one card width
            scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
          }
        }
      }, 3000); // Scroll every 3 seconds
    }, 500);

    // Pause on hover
    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      if (scrollInterval) clearInterval(scrollInterval);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [loading, displayCourses.length]);

  return (
    <section ref={sectionRef} className="relative py-8 sm:py-10 md:py-12 bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive programs designed by industry experts
          </p>
        </div>

        {/* Most Viewed Courses - Horizontal Scroll */}
        <div className={`mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : displayCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No courses available at the moment.</p>
            </div>
          ) : (
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 pt-2"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {displayCourses.map((course) => (
                <div
                  key={course._id}
                  className="flex-shrink-0 w-[320px] group"
                >
                  <div className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] relative hover:border-blue-600 h-full flex flex-col">
                    <div className="relative h-28 rounded-lg mb-3 overflow-hidden shadow-md border border-gray-100">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/320x144?text=' + encodeURIComponent(course.title);
                        }}
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-lg text-sm font-semibold text-blue-600 shadow-sm z-10">
                        {course.category || course.level}
                      </div>
                    </div>

                    <div className="flex flex-col flex-grow">
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-gray-600 text-sm">(5.0)</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-base text-gray-600 mb-3 line-clamp-2">{course.description}</p>

                      <div className="flex items-center justify-between text-sm mb-3 mt-auto">
                        <span className="flex items-center text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {course.studentsEnrolled}+
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <Link
                          href={`/courses/${course._id}`}
                          className="text-base text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center"
                        >
                          View Details
                          <svg className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`text-center mt-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
          <Link
            href="/courses"
            className="inline-flex items-center bg-gray-900 text-white px-7 py-3.5 rounded-lg text-base font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            View All Courses
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
