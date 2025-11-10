"use client";

import { useEffect, useState, useRef } from "react";

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    {
      number: 10000,
      suffix: "+",
      label: "Students Enrolled",
      description: "Active learners worldwide",
      color: "bg-blue-500",
      lightColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      number: 50,
      suffix: "+",
      label: "Expert Instructors",
      description: "Industry professionals",
      color: "bg-purple-500",
      lightColor: "bg-purple-100",
      textColor: "text-purple-600"
    },
    {
      number: 100,
      suffix: "+",
      label: "Courses Available",
      description: "Comprehensive curriculum",
      color: "bg-emerald-500",
      lightColor: "bg-emerald-100",
      textColor: "text-emerald-600"
    },
    {
      number: 95,
      suffix: "%",
      label: "Success Rate",
      description: "Student satisfaction",
      color: "bg-orange-500",
      lightColor: "bg-orange-100",
      textColor: "text-orange-600"
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Animate counters
          stats.forEach((stat, index) => {
            let start = 0;
            const end = stat.number;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCounts((prev) => {
                  const newCounts = [...prev];
                  newCounts[index] = end;
                  return newCounts;
                });
                clearInterval(timer);
              } else {
                setCounts((prev) => {
                  const newCounts = [...prev];
                  newCounts[index] = Math.floor(start);
                  return newCounts;
                });
              }
            }, 16);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-10 sm:py-12 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Trusted by Thousands
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Join a thriving community of learners and professionals advancing their careers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group ${isVisible ? "animate-slide-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden" style={{ backgroundColor: '#3d50d5' }}>
                {/* Colored accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${stat.color}`}></div>

                {/* Icon circle */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {index === 0 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    )}
                    {index === 1 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    )}
                    {index === 2 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    )}
                    {index === 3 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </div>

                {/* Counter */}
                <div className="mb-2">
                  <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
                    {isVisible ? (
                      <>
                        {counts[index].toLocaleString()}
                        <span className="text-white/80">{stat.suffix}</span>
                      </>
                    ) : (
                      "0" + stat.suffix
                    )}
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-base font-semibold text-white mb-1">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-xs text-white/80">
                  {stat.description}
                </p>

                {/* Hover effect background */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
