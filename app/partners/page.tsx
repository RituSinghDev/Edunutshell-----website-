"use client";

import { useEffect, useRef, useState } from "react";
import {
  Building2,
  GraduationCap,
  Users,
  CheckCircle,
  ArrowRight,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CollegeMoUForm from "@/components/CollegeMoUForm";

const Partners = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const fadeRefs = useRef<(HTMLElement | null)[]>([]);
  const heroRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
            
            // Animate numbers if data-count is present
            const numEl = entry.target.querySelector("[data-count]") as HTMLElement;
            if (numEl && !numEl.classList.contains("counted")) {
              numEl.classList.add("counted");
              const end = parseInt(numEl.dataset.target || "0");
              const suffix = numEl.dataset.suffix || "";
              let start = 0;
              const duration = 2000;
              const stepTime = Math.max(10, Math.floor(duration / end));
              const step = Math.ceil(end / (duration / stepTime));
              
              const timer = setInterval(() => {
                start += step;
                if (start >= end) {
                  start = end;
                  clearInterval(timer);
                }
                numEl.textContent = start.toLocaleString() + suffix;
              }, stepTime);
            }
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    heroRefs.current.forEach((el, i) => {
      if (el) {
        (el as HTMLElement).style.transitionDelay = `${i * 150}ms`;
        observer.observe(el);
      }
    });

    fadeRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const partners = [
    {
      name: "Stanford University",
      type: "Research Collaboration",
      description: "Joint research initiatives in AI and machine learning, providing students access to cutting-edge labs and mentorship programs.",
      benefits: ["Research opportunities", "Faculty exchange", "Student internships"],
      logo: "S",
      color: "bg-red-50 border-red-200"
    },
    {
      name: "MIT",
      type: "Academic Partnership",
      description: "Collaborative programs in engineering and technology, offering dual certification and advanced coursework opportunities.",
      benefits: ["Dual certification", "Advanced courses", "Workshop access"],
      logo: "M",
      color: "bg-blue-50 border-blue-200"
    },
    {
      name: "Harvard Business School",
      type: "Business Innovation",
      description: "Strategic alliance for entrepreneurship programs, case study development, and startup incubation support.",
      benefits: ["Case studies", "Startup incubation", "Guest lectures"],
      logo: "H",
      color: "bg-purple-50 border-purple-200"
    },
    {
      name: "Oxford University",
      type: "Global Exchange",
      description: "Student and faculty exchange programs, joint publications, and collaborative seminars in humanities and sciences.",
      benefits: ["Student exchange", "Joint publications", "Collaborative seminars"],
      logo: "O",
      color: "bg-indigo-50 border-indigo-200"
    },
    {
      name: "Cambridge University",
      type: "Research Excellence",
      description: "Partnership focused on groundbreaking research in sciences, technology, and mathematics with shared resources.",
      benefits: ["Shared research facilities", "Joint grants", "Ph.D. programs"],
      logo: "C",
      color: "bg-green-50 border-green-200"
    },
    {
      name: "UC Berkeley",
      type: "Innovation Hub",
      description: "Collaboration on innovation projects, technology transfer, and entrepreneurship development for students and faculty.",
      benefits: ["Innovation projects", "Tech transfer", "Entrepreneurship support"],
      logo: "B",
      color: "bg-orange-50 border-orange-200"
    }
  ];

  const stats = [
    { value: "50+", label: "Partner Institutions", icon: Building2 },
    { value: "10,000+", label: "Students Benefited", icon: Users },
    { value: "200+", label: "Joint Programs", icon: GraduationCap },
    { value: "15+", label: "Countries", icon: Globe }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-blue-100 py-20 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1
            ref={(el) => { heroRefs.current[0] = el; }}
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out text-5xl font-bold text-gray-900 mb-6"
          >
            Our Academic Partners
          </h1>
          <p
            ref={(el) => { heroRefs.current[1] = el; }}
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out text-xl text-gray-700 mb-8"
          >
            Building bridges with world-class institutions to provide exceptional learning experiences
            and global opportunities for our students.
          </p>
          <div
            ref={(el) => { heroRefs.current[2] = el; }}
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out inline-block"
          >
            <Button 
              onClick={() => setIsFormOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              Become a Partner
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                ref={(el) => { fadeRefs.current[index] = el; }}
                className="p-6 text-center hover:shadow-lg opacity-0 translate-y-8 transition-all duration-700 ease-out"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div
                  data-count
                  data-target={stat.value.replace(/\D/g, "")}
                  data-suffix={stat.value.match(/\D+$/)?.[0] || ""}
                  className="text-4xl font-bold text-gray-900 mb-2"
                >
                  0
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div
            ref={(el) => { fadeRefs.current[stats.length] = el; }}
            className="text-center mb-12 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted Collaborations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We partner with leading institutions worldwide to enhance educational excellence
              and create opportunities for our academic community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <Card
                key={index}
                ref={(el) => { fadeRefs.current[stats.length + 1 + index] = el; }}
                className={`overflow-hidden border-2 ${partner.color} opacity-0 translate-y-2 transition-all duration-700 ease-out hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="p-6 border-b-2">
                  <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full mx-auto mb-4 shadow-md">
                    <span className="text-3xl font-bold text-blue-600">
                      {partner.logo}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                    {partner.name}
                  </h3>
                  <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {partner.type}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {partner.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Key Benefits:
                    </h4>
                    {partner.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-800 text-center">
        <div
          ref={(el) => { fadeRefs.current[stats.length + partners.length + 2] = el; }}
          className="container mx-auto px-4 opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Interested in Partnering With Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our network of prestigious institutions and create meaningful educational
            opportunities for students worldwide.
          </p>
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
          >
            Get In Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* MoU Form Modal */}
      <CollegeMoUForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default Partners;
