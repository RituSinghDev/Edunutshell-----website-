'use client'

import { useEffect, memo } from "react";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import AIMentor from "@/components/home/AIMentor";
import PopularCourses from "@/components/home/PopularCourses";
import TrustedCompanies from "@/components/home/TrustedCompanies";
import GetHiredBy from "@/components/home/GetHiredBy";
import Testimonials from "@/components/home/Testimonials";
import EnquiryForm from "@/components/home/EnquiryForm";
import SectionTransition from "@/components/SectionTransition";

function Home() {
  useEffect(() => {
    // Ensure page starts at the top
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <SectionTransition id="hero">
        <Hero />
      </SectionTransition>
      
      <SectionTransition id="stats">
        <Stats />
      </SectionTransition>
      
      <SectionTransition id="ai-mentor">
        <AIMentor />
      </SectionTransition>
      
      <SectionTransition id="our-programs">
        <PopularCourses />
      </SectionTransition>
      
      <div id="trusted-companies">
        <TrustedCompanies />
      </div>
      
      <div id="get-hired-by">
        <GetHiredBy />
      </div>
      
      <div id="testimonials">
        <Testimonials />
      </div>
      
      <div id="enquiry-form">
        <EnquiryForm />
      </div>
    </main>
  );
}

export default memo(Home)
