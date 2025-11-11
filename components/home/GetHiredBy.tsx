"use client";

import Image from "next/image";

export default function GetHiredBy() {
    const companies = [
        { name: "Startup India", logo: "/logos/startup-india.svg" },
        { name: "AICTE", logo: "/logos/aicte.svg" },
        { name: "Ministry of Commerce and Industry", logo: "/logos/ministry-commerce.svg" },
        { name: "Wipro DICE", logo: "/logos/wipro-dice.svg" },
        { name: "NASSCOM", logo: "/logos/nasscom.svg" },
        { name: "MSME", logo: "/logos/msme.svg" },
    ];

    // Duplicate for seamless infinite scroll
    const duplicatedCompanies = [...companies, ...companies];

    return (
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 py-8 md:py-6 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-8">
                    {/* Left Text */}
                    {/* <div className="flex-shrink-0 z-20 relative">
                        <h3 className="text-white text-xl md:text-2xl font-bold whitespace-nowrap">
                            Students&apos;s<br />Get Hired By
                        </h3>
                    </div> */}

                    {/* Scrolling Logos Container */}
                    <div className="flex-1 relative overflow-hidden group">
                        {/* Gradient Overlays - only on logo area */}
                        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-blue-700 to-transparent"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-blue-700 to-transparent"></div>
                        
                        <div
                            className="flex gap-12 items-center scroll-container"
                            style={{
                                animation: "scrollInfinite 30s linear infinite",
                                width: "max-content"
                            }}
                        >
                            {duplicatedCompanies.map((company, index) => {
                                const isGovtLogo = company.name === "Startup India" || company.name === "AICTE" || company.name === "Ministry of Commerce and Industry" || company.name === "MSME" || company.name === "NASSCOM";
                                return (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 flex items-center justify-center px-6"
                                    >
                                        <div className="bg-white px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                                            <Image
                                                src={company.logo}
                                                alt={`${company.name} logo`}
                                                width={isGovtLogo ? 200 : 120}
                                                height={isGovtLogo ? 60 : 40}
                                                className="object-contain"
                                                style={{ 
                                                    height: isGovtLogo ? "60px" : "40px", 
                                                    width: "auto", 
                                                    maxWidth: isGovtLogo ? "200px" : "120px" 
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scrollInfinite {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .group:hover .scroll-container {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
