"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  
const getCategoryName = (category: string) => {
  const categoryMap: { [key: string]: string } = {
    "CSE/IT": "CSE / IT Software & Data",
    "ECE/EEE": "ECE / EEE Electronics Core",
    "Mechanical": "Mechanical & Automotive",
    "Architecture": "Architecture & Civil",
    "Management": "Management, Marketing & Finance",
    "Medical": "Medical & Life Sciences",
  };
  return categoryMap[category] || category;
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id;
  const [course, setCourse] = useState<Course | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModules, setOpenModules] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      
      try {
        setLoading(true);
        
        // Fetch all courses from the list endpoint
        const response = await fetch('https://edunutshell-lms.onrender.com/api/courses/list');
        
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        
        const data = await response.json();
        const allCourses = Array.isArray(data) ? data : 
                          data.courses || data.data || [];
        
        // Find the specific course by ID
        const foundCourse = allCourses.find((c: Course) => c._id === courseId);
        
        if (!foundCourse) {
          throw new Error('Course not found');
        }
        
        setCourse(foundCourse);
        
        // Filter related courses by category
        const related = allCourses
          .filter((c: Course) => c.category === foundCourse.category && c._id !== foundCourse._id)
          .slice(0, 3);
        setRelatedCourses(related);
        
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err instanceof Error ? err.message : 'Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </main>
    );
  }

  if (error || !course) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-8">{error || "The course you're looking for doesn't exist."}</p>
          <Link href="/courses" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
            Back to Courses
          </Link>
        </div>
      </main>
    );
  }

  const features = [
    "Industry-recognized certification upon completion",
    "Hands-on projects and real-world applications",
    "Expert instructors with years of experience",
    "Flexible learning schedule",
    "Lifetime access to course materials",
    "24/7 student support and mentorship",
    "Career guidance and placement assistance",
    "Interactive learning environment",
  ];

  const curriculum = [
    {
      module: "Module 1: Fundamentals",
      lessons: [
        "Introduction to the subject",
        "Core concepts and principles",
        "Industry standards and best practices",
        "Tools and technologies overview",
      ],
    },
    {
      module: "Module 2: Intermediate Concepts",
      lessons: [
        "Advanced techniques and methodologies",
        "Practical applications",
        "Case studies and examples",
        "Problem-solving strategies",
      ],
    },
    {
      module: "Module 3: Advanced Topics",
      lessons: [
        "Specialized skills development",
        "Industry-specific applications",
        "Latest trends and innovations",
        "Professional best practices",
      ],
    },
    {
      module: "Module 4: Capstone Project",
      lessons: [
        "Project planning and design",
        "Implementation and development",
        "Testing and optimization",
        "Presentation and documentation",
      ],
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/courses" className="inline-flex items-center text-blue-200 hover:text-white transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Courses
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-500 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {getCategoryName(course.category || course.level)}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{course.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>6-12 weeks</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>All Levels</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span>5.0 ({course.studentsEnrolled}+ students)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all text-center"
                >
                  Enroll Now
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all text-center"
                >
                  Request Info
                </Link>
              </div>
            </div>

            <div>
              <img
                src={course.image}
                alt={course.title}
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                This comprehensive {course.title} course is designed to provide you with in-depth knowledge and practical skills. 
                Whether you're a beginner or looking to advance your career, this course offers a structured learning path with 
                hands-on projects, expert guidance, and industry-relevant content. You'll gain the expertise needed to excel in 
                this field and stand out in today's competitive job market.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h3>
              <div className="space-y-3">
                {curriculum.map((module, index) => (
                  <div 
                    key={index} 
                    className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenModules(prev => ({ ...prev, [index]: !prev[index] }))}
                      className="w-full bg-gradient-to-r from-gray-50 to-blue-50 p-5 font-semibold text-gray-900 flex items-center justify-between hover:from-gray-100 hover:to-blue-100 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 text-white rounded-lg w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-left">{module.module}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                          {module.lessons.length} lessons
                        </span>
                        <svg 
                          className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${openModules[index] ? 'rotate-180' : ''}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    <div 
                      className={`transition-all duration-300 ease-in-out ${
                        openModules[index] 
                          ? 'max-h-96 opacity-100' 
                          : 'max-h-0 opacity-0'
                      } overflow-hidden`}
                    >
                      <div className="p-5 bg-white border-t-2 border-gray-100">
                        <ul className="space-y-3">
                          {module.lessons.map((lesson, idx) => (
                            <li 
                              key={idx} 
                              className="flex items-start text-gray-700 hover:text-blue-600 transition-colors group"
                            >
                              <svg 
                                className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="leading-relaxed">{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Why Choose This Course */}
              <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose This Course?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="bg-blue-600 rounded-lg p-3 mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Curriculum</h4>
                      <p className="text-gray-600 text-sm">Structured learning path covering all essential topics</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-600 rounded-lg p-3 mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Career Support</h4>
                      <p className="text-gray-600 text-sm">Placement assistance and career guidance included</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-600 rounded-lg p-3 mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Practical Projects</h4>
                      <p className="text-gray-600 text-sm">Real-world projects to build your portfolio</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-600 rounded-lg p-3 mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Expert Mentorship</h4>
                      <p className="text-gray-600 text-sm">Learn from industry professionals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Details</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold text-gray-900">6-12 weeks</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Level</span>
                      <span className="font-semibold text-gray-900">All Levels</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Students</span>
                      <span className="font-semibold text-gray-900">{course.studentsEnrolled}+</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Rating</span>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="font-semibold text-gray-900">5.0</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Price</span>
                      <span className="font-semibold text-blue-600 text-xl">₹{course.price}</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-gray-600">Certificate</span>
                      <span className="font-semibold text-green-600">Yes</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mb-6">
                    <h4 className="font-bold text-gray-900 mb-4">This course includes:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Video lectures
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Study materials
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Lifetime access
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        Certificate
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        24/7 Support
                      </li>
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-full text-center font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl mb-3"
                  >
                    Enroll Now
                  </Link>
                  <Link
                    href="/contact"
                    className="block w-full border-2 border-blue-600 text-blue-600 py-4 rounded-full text-center font-semibold hover:bg-blue-50 transition-all"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedCourses.map((relatedCourse) => (
                <Link
                  key={relatedCourse._id}
                  href={`/courses/${relatedCourse._id}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-blue-300 hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedCourse.image}
                      alt={relatedCourse.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=' + encodeURIComponent(relatedCourse.title);
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {relatedCourse.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{relatedCourse.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-yellow-400">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="text-gray-900">5.0</span>
                      </div>
                      <span className="text-gray-500">{relatedCourse.studentsEnrolled}+ students</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
