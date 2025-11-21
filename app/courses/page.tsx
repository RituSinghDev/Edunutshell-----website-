"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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

export default function CoursesPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false); // Prevent multiple fetches
  const coursesPerPage = 12;

  // Fetch courses from API
  useEffect(() => {
    // Prevent multiple fetches
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchCourses = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch('https://edunutshell-lms.onrender.com/api/courses/list', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store', // Always fetch fresh data
        });
        
        clearTimeout(timeoutId);
        
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
        if (err instanceof Error && err.name === 'AbortError') {
          console.error('Request timeout - API server may be slow or unavailable');
        } else {
          console.error('Error fetching courses:', err);
        }
        // Silently fail - just show empty state
        setError(null);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesFilter = selectedFilter === "all" || course.category === selectedFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Reset to page 1 when filter or search changes
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <main className="min-h-screen pt-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-6 sm:py-1 bg-white">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-6xl md:text-5xl font-bold text-gray-900 mb-4 animate-slide-up">
                Explore Our Courses
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 animate-slide-up">
                Choose from our comprehensive selection of courses designed by industry experts
                to help you master the latest technologies
              </p>
            </div>

            {/* Right Animation */}
            <div className="flex justify-center py-4 overflow-visible lg:justify-end">
              <div className="w-[450px] h-80 sm:w-[550px] sm:h-96">
                <Image 
                  src="/mobile.png?v=2"
                  alt="Mobile Phone"
                  width={550}
                  height={550}
                  className="w-full h-full object-contain transform lg:-rotate-6"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-4 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses by title or description..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-6 py-4 pl-14 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
              />
              <svg
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
            <button
              onClick={() => handleFilterChange("all")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all ${selectedFilter === "all"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
            >
              All Courses
            </button>
            <button
              onClick={() => handleFilterChange("CSE/IT")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all ${selectedFilter === "CSE/IT"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
            >
              💻 CSE / IT
            </button>
            <button
              onClick={() => handleFilterChange("ECE/EEE")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all ${selectedFilter === "ECE/EEE"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
            >
              ⚡ ECE / EEE
            </button>
            <button
              onClick={() => handleFilterChange("Mechanical")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all ${selectedFilter === "Mechanical"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
            >
              🔧 Mechanical
            </button>
            <button
              onClick={() => handleFilterChange("Architecture")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all ${selectedFilter === "Architecture"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
            >
              🏗️ Architecture
            </button>
            <button
              onClick={() => handleFilterChange("Management")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all ${selectedFilter === "Management"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
            >
              📊 Management
            </button>
            <button
              onClick={() => handleFilterChange("Medical")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all ${selectedFilter === "Medical"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
            >
              🧬 Medical
            </button>
            {/* <button
              onClick={() => handleFilterChange("Agriculture")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all ${selectedFilter === "Agriculture"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
            >
              🌾 Agriculture
            </button> */}
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-blue-600">{filteredCourses.length}</span> course{filteredCourses.length !== 1 ? 's' : ''}
              {searchQuery && <span> matching "{searchQuery}"</span>}
            </p>
          </div>

          {/* Course Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 mb-4">{error}</p>
              <p className="text-gray-600">Showing fallback courses</p>
            </div>
          ) : currentCourses.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {currentCourses.map((course) => (
                <Link
                  key={course._id}
                  href={`/courses/${course._id}`}
                  className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 overflow-hidden relative hover:border-transparent course-card-glow cursor-pointer"
                >
                  <div className="relative h-32 sm:h-48 overflow-hidden rounded-lg mb-4 shadow-lg">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=' + encodeURIComponent(course.title);
                      }}
                    />
                    {/* AWS-themed gradient overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-[#232f3e] to-[#0073bb] opacity-0 group-hover:opacity-70 transition-all duration-300 ease-in-out"
                      style={{ mixBlendMode: 'overlay' }}
                    />
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm font-semibold text-blue-600 shadow-sm z-10">
                      {course.category || course.level}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-1 sm:mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 sm:ml-2 text-gray-600 text-xs sm:text-sm">(5.0)</span>
                    </div>

                    <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-base text-gray-600 mb-2 sm:mb-4 line-clamp-2">{course.description}</p>

                    <div className="flex items-center justify-between text-xs sm:text-sm mb-2 sm:mb-4">
                      <span className="text-xl sm:text-2xl font-bold text-blue-600">
                        ₹{course.price}
                      </span>
                      <span className="flex items-center text-gray-500">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {course.studentsEnrolled}+
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-base text-blue-600 font-semibold group-hover:text-blue-800 transition-colors flex items-center">
                        View Details
                        <svg className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  handleSearchChange("");
                  handleFilterChange("all");
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredCourses.length > coursesPerPage && (
            <div className="mt-12 flex justify-center items-center gap-1 sm:gap-2 flex-wrap">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
                  }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  disabled={page === '...'}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all ${page === currentPage
                      ? "bg-blue-600 text-white shadow-md"
                      : page === '...'
                        ? "bg-transparent text-gray-400 cursor-default"
                        : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
                    }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
                  }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
