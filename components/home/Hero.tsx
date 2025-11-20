"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ImageAccordion } from "@/components/ui/ImageAccordion";

export default function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["innovative", "transformative", "empowering", "cutting-edge", "dynamic"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="relative min-h-[550px] sm:min-h-[600px] lg:min-h-[650px] pt-20 lg:pt-16 pb-6 lg:pb-10 overflow-hidden w-full" style={{ background: 'linear-gradient(135deg, #000046 0%, #3d50d5 100%)' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-10 w-full h-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12 h-full">
          
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 space-y-4 lg:space-y-6 z-10 text-center md:text-left">
            <div className="flex gap-4 md:gap-6 flex-col">
              <div className="flex gap-3 md:gap-4 flex-col">
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tighter font-regular break-words">
                  <span className="text-white">Education that&apos;s</span>
                  <span className="relative flex w-full justify-center md:justify-start overflow-hidden md:pb-4 md:pt-1">
                    &nbsp;
                    {titles.map((title, index) => (
                      <motion.span
                        key={index}
                        className="absolute font-semibold text-blue-400"
                        initial={{ opacity: 0, y: "-100" }}
                        transition={{ type: "spring", stiffness: 50 }}
                        animate={
                          titleNumber === index
                            ? {
                              y: 0,
                              opacity: 1,
                            }
                            : {
                              y: titleNumber > index ? -150 : 150,
                              opacity: 0,
                            }
                        }
                      >
                        {title}
                      </motion.span>
                    ))}
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-base lg:text-lg leading-relaxed tracking-tight text-gray-100 break-words mx-auto md:mx-0 max-w-xl">
                  Build on a simple belief, learning should be effortless. Explore interactive lessons,
                  connect with mentors, and experience growth like never before.
                </p>
              </div>
              {/* Button - visible on desktop only */}
              <div className="hidden md:flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/courses">
                  <Button size="lg" className="gap-4 w-full sm:w-auto font-semibold bg-white text-blue-900 hover:bg-gray-100">
                    Explore Courses <MoveRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Image Accordion - Side by side from tablet up */}
          <div className="w-full md:w-1/2">
            <ImageAccordion />
          </div>

          {/* Button - visible on mobile only, below accordion */}
          <div className="flex md:hidden w-full justify-center">
            <Link href="/courses">
              <Button size="lg" className="gap-4 w-full sm:w-auto font-semibold bg-white text-blue-900 hover:bg-gray-100">
                Explore Courses <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
