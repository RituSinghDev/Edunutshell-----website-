'use client'

import { useEffect } from "react";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import AIMentor from "@/components/home/AIMentor";
import PopularCourses from "@/components/home/PopularCourses";
import TrustedCompanies from "@/components/home/TrustedCompanies";
import GetHiredBy from "@/components/home/GetHiredBy";
import Testimonials from "@/components/home/Testimonials";
import EnquiryForm from "@/components/home/EnquiryForm";
import SectionTransition from "@/components/SectionTransition";

export default function Home() {
  useEffect(() => {
    // Ensure page starts at the top
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
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
      
      <SectionTransition id="trusted-companies">
        <TrustedCompanies />
      </SectionTransition>
      
      <SectionTransition id="get-hired-by">
        <GetHiredBy />
      </SectionTransition>
      
      <SectionTransition id="testimonials">
        <Testimonials />
      </SectionTransition>
      
      <SectionTransition id="enquiry-form">
        <EnquiryForm />
      </SectionTransition>
    </main>
  );
}
