"use client";

import { useState, useEffect, useRef } from "react";

export default function Programs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const programs = [
    {
      number: "01",
      title: "CSE / IT SOFTWARE & DATA",
      courses: [
        "Web Development",
        "Python with Machine Learning",
        "Python with Data Science",
        "Artificial Intelligence",
        "Android Development",
        "Cloud Computing (Azure, AWS)",
        "Cyber Security with Ethical Hacking",
        "Augmented Reality / Virtual Reality",
        "WEB 3.0",
        "Graphic Designing",
        "Data Analytics",
        "Python Full Stack",
        "UI / UX",
        "Blockchain/Bitcoin",
        "Metaverse",
      ],
      icon: "💻",
      bgColor: "from-orange-50 to-orange-100",
    },
    {
      number: "02",
      title: "ECE / EEE ELECTRONICS CORE",
      courses: [
        "VLSI",
        "Internet of Things (IoT)",
        "Robotics",
        "Cyber Security",
        "Embedded Systems",
        "Cloud Computing (Azure, AWS)",
        "AR/VR",
        "Drone Technology",
        "Hybrid Electric vehicles",
      ],
      icon: "⚡",
      bgColor: "from-green-50 to-green-100",
    },
    {
      number: "03",
      title: "MECHANICAL & AUTOMOTIVE",
      courses: [
        "Hybrid Electric Vehicle",
        "Car Design",
        "Solid Edge 2D / 3D",
        "AutoCAD",
        "3Ds Max",
        "Photoshop",
        "Graphic Designing",
      ],
      icon: "⚙️",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      number: "04",
      title: "ARCHITECTURE & CIVIL",
      courses: [
        "AutoCAD with Structural Planning",
        "Solid Edge",
        "Solid Edge 2D / 3D",
        "Construction Planning and Management",
        "3Ds Max",
        "Photoshop",
        "Revit",
        "Sketch UP",
      ],
      icon: "🏗️",
      bgColor: "from-purple-50 to-purple-100",
    },
    {
      number: "05",
      title: "MANAGEMENT, MARKETING & FINANCE",
      courses: [
        "Finance",
        "Investment Banking with Finance",
        "Digital Marketing",
        "Marketing Management",
        "Social Media Marketing",
        "Human Resource",
        "Entrepreneurship",
        "Stock Market",
        "Graphic Designing",
      ],
      icon: "📈",
      bgColor: "from-pink-50 to-pink-100",
    },
    {
      number: "06",
      title: "MEDICAL & LIFE SCIENCES",
      courses: [
        "Genetic Engineering",
        "Molecular Biology",
        "Microbiology",
        "Bioinformatics",
        "Bio Statistics",
        "Nano Technology",
        "Medical Coding",
      ],
      icon: "🧬",
      bgColor: "from-teal-50 to-teal-100",
    },
  ];

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

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-10 sm:mb-14 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 px-4">
            Our Programs
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Comprehensive training programs tailored for different disciplines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`group ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
                
                {/* Number badge and icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{program.icon}</span>
                  </div>
                  <div className="text-5xl font-bold text-gray-200 group-hover:text-gray-300 transition-colors">
                    {program.number}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-5 leading-tight group-hover:text-blue-600 transition-colors">
                  {program.title}
                </h3>

                {/* Courses list */}
                <ul className="space-y-2">
                  {program.courses.map((course, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start text-gray-700 text-sm group-hover:text-gray-900 transition-colors"
                    >
                      <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{course}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
