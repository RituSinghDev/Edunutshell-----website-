"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Briefcase, Users, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Testimonial {
  _id: string;
  name: string;
  message: string;
  photoURL?: string;
  socialHandle?: string;
}

interface AnimatedStat {
  value: number | string;
  label: string;
}

// Stable values defined outside or with useMemo
const targetValues = [500, 100, 50, 10];
const icons = [Users, Briefcase, Award, ArrowRight];
const labels = ["Students Placed", "Companies", "Highest Package", "Countries"];

const initialAnimatedStats: AnimatedStat[] = targetValues.map((_, i) => ({
  value: 0,
  label: labels[i],
}));

const Placements = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const fadeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRefs = useRef<(HTMLElement | null)[]>([]);
  const fetchedOnce = useRef(false);
  const [animatedStats, setAnimatedStats] = useState<AnimatedStat[]>(initialAnimatedStats);
  const animationRan = useRef(false);

  // Stable company values with reliable logos
  const companies = useMemo(
    () => [
      {
        name: "Google",
        logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
        color: "bg-red-50 border-red-200",
      },
      {
        name: "Microsoft",
        logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg",
        color: "bg-blue-50 border-blue-200",
      },
      {
        name: "Amazon",
        logo: "https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg",
        color: "bg-yellow-50 border-yellow-200",
      },
      {
        name: "Infosys",
        logo: "https://companieslogo.com/img/orig/INFY_BIG-1c0b81f5.png?t=1726507089",
        color: "bg-sky-50 border-sky-200",
      },
      {
        name: "TCS",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/320px-Tata_Consultancy_Services_Logo.svg.png",
        color: "bg-purple-50 border-purple-200",
      },
      {
        name: "Accenture",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/320px-Accenture.svg.png",
        color: "bg-indigo-50 border-indigo-200",
      },
    ],
    []
  );

  // Animate numbers only once
  useEffect(() => {
    if (animationRan.current) return;
    animationRan.current = true;

    let frameId: number;
    const start = performance.now();
    const duration = 1500;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);

      setAnimatedStats((prev) =>
        prev.map((stat, i) => ({
          ...stat,
          value:
            i === 2
              ? `${Math.floor(progress * targetValues[i])} LPA`
              : Math.floor(progress * targetValues[i]),
        }))
      );

      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Fetch testimonials once
  useEffect(() => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;

    const fetchTestimonials = async () => {
      try {
        // console.log("Fetching testimonials...");
        const res = await fetch("https://edunutshell-lms.onrender.com/api/testimonials", {
          cache: "no-cache", // Changed from force-cache to avoid cached errors
        });

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const data = await res.json();
        // console.log("Testimonials data:", data);
        setTestimonials(Array.isArray(data.testimonials) ? data.testimonials : []);
      } catch (err) {
        // console.error("Error fetching testimonials:", err);
        setTestimonials([]);
      }
    };

    void fetchTestimonials();
  }, []);

  // Debounced resize listener
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMobile(window.innerWidth < 640), 200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection fade animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.2 }
    );

    [...heroRefs.current, ...fadeRefs.current].forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Handle image errors
  const handleImageError = (imageId: string) => {
    // console.warn(`Image failed to load: ${imageId}`);
    setImageErrors(prev => new Set(prev).add(imageId));
  };

  // Check if image URL is valid and not already errored
  const isValidImage = (url: string | undefined, id: string) => {
    if (!url || url === "https://example.com/carol.jpg") return false;
    if (imageErrors.has(id)) return false;
    return true;
  };

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-blue-50 to-blue-100 py-20 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1
            ref={(el) => { heroRefs.current[0] = el; }}
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out text-5xl font-bold text-gray-900 mb-6"
          >
            Placement Highlights
          </h1>
          <p
            ref={(el) => { heroRefs.current[1] = el; }}
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out text-xl text-gray-700 mb-8"
          >
            Empowering students to launch successful careers with top global organizations.
          </p>
          <div
            ref={(el) => { heroRefs.current[2] = el; }}
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out inline-block"
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
              Explore Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {animatedStats.map((stat, index) => {
              const Icon = icons[index];
              return (
                <Card
                  key={index}
                  ref={(el) => { fadeRefs.current[index] = el; }}
                  className="p-6 text-center hover:shadow-lg opacity-0 translate-y-8 transition-all duration-700 ease-out"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                    {typeof stat.value === "number" ? "+" : ""}
                  </div>
                  <div className="text-gray-600">{labels[index]}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPANIES SECTION - FIXED INFINITE SCROLL */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Top Recruiters</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Renowned companies that have recruited our talented graduates.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-scroll">
            {[...companies, ...companies, ...companies].map((company, index) => (
              <Card
                key={`${company.name}-${index}`}
                className={`p-4 border-2 ${company.color} flex items-center justify-center hover:shadow-xl h-24 w-40 flex-shrink-0`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-10 object-contain max-w-full"
                    loading="lazy"
                    onError={(e) => {
                      // console.warn(`Failed to load logo for ${company.name}`);
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const textElement = document.createElement('span');
                      textElement.className = 'text-gray-700 font-semibold text-lg';
                      textElement.textContent = company.name;
                      target.parentNode?.appendChild(textElement);
                    }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-33.333%));
            }
          }
          .animate-scroll {
            display: flex;
            width: max-content;
            animation: scroll 30s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* TESTIMONIALS SECTION - NO WHITESPACE ABOVE IMAGES */}
      <section className="py-20 bg-gradient-to-r from-blue-400 to-indigo-600 text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold mb-12">Student Testimonials</h2>

          {testimonials.length > 0 ? (
            <div className="relative w-full overflow-hidden">
              <div
                className="flex gap-8 animate-marquee"
                style={{
                  animation: `marquee ${
                    isMobile ? testimonials.length * 8 : testimonials.length * 14
                  }s linear infinite`,
                }}
              >
                {[...testimonials, ...testimonials].map((testimonial, index) => {
                  const uniqueId = `${testimonial._id}-${index}`;
                  const shouldShowImage = isValidImage(testimonial.photoURL, uniqueId);

                  return (
                    <Card
                      key={uniqueId}
                      className="min-w-[300px] sm:min-w-[360px] md:min-w-[400px]
                        bg-white/10 border border-white/20 rounded-2xl backdrop-blur-lg
                        hover:bg-white/20 transition-all duration-300 flex flex-col overflow-hidden p-0" // Added p-0 to remove card padding
                    >
                      {shouldShowImage ? (
                        <div className="w-full h-[230px] overflow-hidden">
                          <img
                            src={testimonial.photoURL}
                            alt={testimonial.name}
                            className="w-full h-full object-cover" // Removed rounded-t-2xl from image
                            loading="lazy"
                            onError={() => handleImageError(uniqueId)}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-[230px] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                          <div className="text-6xl font-bold text-white/80">
                            {testimonial.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                      )}

                      <div className="p-6 flex flex-col justify-between flex-1">
                        <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
                        <p className="italic text-blue-100 mb-4 leading-relaxed line-clamp-3">
                          &quot;{testimonial.message}&quot;
                        </p>

                        {/* FIXED: Show ALL social handles without filtering */}
                        {testimonial.socialHandle && (
                          <a
                            href={testimonial.socialHandle}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-200 underline text-sm break-all hover:text-white transition-colors"
                          >
                            {testimonial.socialHandle}
                          </a>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-blue-100">
              <p>Loading testimonials...</p>
              <p className="text-sm mt-2">Check console for details</p>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* CTA FOOTER */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Join the Success Story</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Be a part of our growing community of achievers shaping the world&apos;s future.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
            View Placement Brochure
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Placements;
