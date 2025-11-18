"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";

const ImageAccordion = dynamic(() => import("@/components/ui/ImageAccordion"), {
  ssr: false,
});

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
    <section className="relative min-h-[400px] lg:min-h-[550px] pt-24 lg:pt-20 pb-4 lg:pb-12 overflow-hidden w-full" style={{ background: 'linear-gradient(135deg, #000046 0%, #3d50d5 100%)' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-6 lg:px-8 py-4 lg:py-10 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center h-full min-h-[350px] lg:min-h-[450px]">
          
          {/* Left Column - Content */}
          <div className="space-y-4 lg:space-y-8 z-10">
            <div className="flex gap-8 flex-col">
              <div className="flex gap-6 flex-col">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tighter font-regular break-words">
                  <span className="text-white">Education that&apos;s</span>
                  <span className="relative flex w-full justify-start overflow-hidden md:pb-4 md:pt-1">
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
                <p className="text-lg md:text-xl leading-relaxed tracking-tight text-gray-100 break-words max-w-xl">
                  Build on a simple belief, learning should be effortless. Explore interactive lessons,
                  connect with mentors, and experience growth like never before.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/courses">
                  <Button size="lg" className="gap-4 w-full sm:w-auto font-semibold bg-white text-blue-900 hover:bg-gray-100">
                    Explore Courses <MoveRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Animation */}
          <div className="relative h-[400px] lg:h-[450px] w-full">
            <ImageAccordion />
          </div>

        </div>
      </div>
    </section>
  );
}
