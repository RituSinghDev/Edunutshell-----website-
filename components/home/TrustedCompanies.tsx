"use client";

import { useState, useEffect, useRef } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function TrustedCompanies() {
    const [activeTab, setActiveTab] = useState<'hiring' | 'college' | 'featured'>('hiring');
    const sectionRef = useRef<HTMLElement>(null);

    // Hiring Partners - Companies that hire our students
    const hiringPartners = [
        { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
        { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
        { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
        { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png" },
        { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
        { name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
        { name: "LinkedIn", logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" },
        { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg" },
        { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
        { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
        { name: "Razorpay", logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" },
        { name: "Swiggy", logo: "https://1000logos.net/wp-content/uploads/2021/05/Swiggy-logo.png" },
    ];

    // College Collaborations - Educational institutions we partner with
    const collegePartners = [
        { name: "MIT", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg" },
        { name: "Stanford", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Seal_of_Leland_Stanford_Junior_University.svg" },
        { name: "Harvard", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Harvard_University_coat_of_arms.svg" },
        { name: "IIT Delhi", logo: "https://upload.wikimedia.org/wikipedia/en/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg" },
        { name: "IIT Bombay", logo: "https://upload.wikimedia.org/wikipedia/en/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg" },
        { name: "Berkeley", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg" },
        { name: "Oxford", logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Oxford-University-Circlet.svg" },
        { name: "Cambridge", logo: "/cambridge logo.png" },
    ];

    // Featured Partners - Media, certifications, and special partnerships
    const featuredPartners = [
        { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
        { name: "Microsoft Azure", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" },
        { name: "Google Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
        { name: "Coursera", logo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg" },
        { name: "edX", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/EdX_newer_logo.svg" },
        { name: "TechCrunch", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/TechCrunch_logo.svg" },
        { name: "Forbes", logo: "https://cdn.worldvectorlogo.com/logos/forbes-1.svg" },
        { name: "Udemy", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg" },
    ];

    // Get current partners based on active tab
    const getCurrentPartners = () => {
        switch (activeTab) {
            case 'hiring':
                return hiringPartners;
            case 'college':
                return collegePartners;
            case 'featured':
                return featuredPartners;
            default:
                return hiringPartners;
        }
    };

    const currentPartners = getCurrentPartners();
    // Triple the logos for seamless infinite scroll
    const duplicatedPartners = [...currentPartners, ...currentPartners, ...currentPartners];

    return (
        <section ref={sectionRef} className="relative bg-gray-100 mb-0 md:mb-0">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-10 right-20 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </div>

            <ContainerScroll
                titleComponent={
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4">
                            Our Partners
                        </h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-4 md:mb-8">
                            Collaborating with industry leaders, top universities, and featured organizations
                        </p>

                        {/* Tabs */}
                        <div className="flex justify-center mb-8 md:mb-6 px-4 md:px-4">
                            <div className="inline-flex bg-white rounded-xl p-1.5 shadow-lg border-2 border-gray-200 flex-wrap sm:flex-nowrap gap-1.5 sm:gap-0 justify-center max-w-full">
                                <button
                                    onClick={() => setActiveTab('hiring')}
                                    className={`px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${activeTab === 'hiring'
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="flex items-center gap-1 sm:gap-2">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="hidden xs:inline">Hiring Partners</span>
                                        <span className="xs:hidden">Hiring</span>
                                    </span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('college')}
                                    className={`px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${activeTab === 'college'
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="flex items-center gap-1 sm:gap-2">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                        </svg>
                                        <span className="hidden xs:inline">College Collaboration</span>
                                        <span className="xs:hidden">College</span>
                                    </span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('featured')}
                                    className={`px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${activeTab === 'featured'
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="flex items-center gap-1 sm:gap-2">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                        Featured
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Tab Description */}
                        <div className="text-center">
                            {/* {activeTab === 'hiring' && (
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    <span className="font-semibold text-blue-600">500+</span> companies actively hire our graduates. Join thousands of students who landed their dream jobs.
                                </p>
                            )}
                            {activeTab === 'college' && (
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    Partnered with <span className="font-semibold text-blue-600">top universities</span> worldwide to provide cutting-edge curriculum and research opportunities.
                                </p>
                            )}
                            {activeTab === 'featured' && (
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    <span className="font-semibold text-blue-600">Featured in</span> leading tech publications and certified by major cloud providers.
                                </p>
                            )} */}
                        </div>
                    </div>
                }
            >
                {/* Infinite Scroll Logos */}
                <div className="relative h-full flex items-center" data-lenis-prevent>
                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-gray-100 dark:from-zinc-900 via-gray-100/80 dark:via-zinc-900/80 to-transparent"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-gray-100 dark:from-zinc-900 via-gray-100/80 dark:via-zinc-900/80 to-transparent"></div>

                    {/* Scrolling Container */}
                    <div className="overflow-hidden py-4 md:py-8 w-full">
                        <div
                            key={activeTab}
                            className="flex gap-3 md:gap-16 items-center"
                            style={{
                                animation: "scrollInfinite 30s linear infinite",
                                width: "max-content",
                                willChange: "transform",
                                backfaceVisibility: "hidden",
                                transform: "translate3d(0, 0, 0)",
                                pointerEvents: "none"
                            }}
                        >
                            {duplicatedPartners.map((partner, index) => (
                                <div
                                    key={`${activeTab}-${index}`}
                                    className="flex-shrink-0 flex items-center justify-center w-32 md:w-[200px]"
                                >
                                    <div className={`relative flex ${activeTab === 'college' ? 'flex-col' : 'flex-row'} items-center justify-center gap-3 w-full h-full`}>
                                        <img
                                            src={partner.logo}
                                            alt={`${partner.name} logo`}
                                            className="w-auto object-contain h-6 md:h-[50px]"
                                            style={{
                                                maxWidth: '120px'
                                            }}
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement!.innerHTML = `<span class="text-gray-700 dark:text-gray-300 text-base font-bold">${partner.name}</span>`;
                                            }}
                                        />
                                        {activeTab === 'college' && (
                                            <span className="text-gray-700 dark:text-gray-300 text-xs md:text-sm font-semibold whitespace-nowrap">
                                                {partner.name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ContainerScroll>
        </section>
    );
}
