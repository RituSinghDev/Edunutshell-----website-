"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChromeGrid } from "@/components/ui/chrome-grid";

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
    <section className="relative flex items-center justify-center min-h-[600px] pt-20 sm:pt-16 pb-10 sm:pb-12 overflow-hidden">
      {/* Chrome Grid Background */}
      <div className="absolute inset-0 w-full h-full">
        <ChromeGrid />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full">
          <div className="flex items-center justify-center text-center">
            <div className="space-y-8 max-w-4xl">
              <div className="flex gap-8 flex-col">
                <div className="flex gap-6 flex-col">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tighter font-regular">
                    <span className="text-white">Education that&apos;s</span>
                  <span className="relative flex w-full justify-center overflow-hidden md:pb-4 md:pt-1">
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
                  <p className="text-xl md:text-2xl leading-relaxed tracking-tight text-gray-100">
                    Build on a smiple belief, learning should be effortless. Explore interctive lessons,
                    connect with mentors, and experience growth like never before.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/courses">
                    <Button size="lg" className="gap-4 w-full sm:w-auto font-semibold bg-white text-black hover:bg-gray-100">
                      Explore Courses <MoveRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
