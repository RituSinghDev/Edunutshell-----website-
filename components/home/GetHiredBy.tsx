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

    // Triple duplication for ultra-smooth seamless infinite scroll
    const duplicatedCompanies = [...companies, ...companies, ...companies];

    return (
        <section 
            className="relative bg-gradient-to-r from-blue-600 to-blue-700 py-8 md:py-6 -mt-4 md:mt-0 w-full overflow-hidden"
        >
            <div className="w-full overflow-hidden">
                <div className="flex items-center w-full overflow-hidden">
                    {/* Scrolling Logos Container */}
                    <div className="w-full relative flex items-center overflow-hidden">
                        {/* Gradient Overlays */}
                        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-blue-700 to-transparent"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-blue-700 to-transparent"></div>
                        
                        <div
                            className="flex gap-8 md:gap-12 items-center"
                            style={{
                                animation: "scrollInfinite 20s linear infinite",
                                width: "max-content",
                                willChange: "transform",
                                backfaceVisibility: "hidden",
                                transform: "translate3d(0, 0, 0)",
                                WebkitBackfaceVisibility: "hidden",
                                WebkitTransform: "translate3d(0, 0, 0)",
                                perspective: 1000,
                                WebkitPerspective: 1000,
                            }}
                        >
                            {duplicatedCompanies.map((company, index) => {
                                const isGovtLogo = company.name === "Startup India" || company.name === "AICTE" || company.name === "Ministry of Commerce and Industry" || company.name === "MSME" || company.name === "NASSCOM";
                                return (
                                    <div
                                        key={`${company.name}-${index}`}
                                        className="flex-shrink-0 flex items-center justify-center"
                                        style={{
                                            width: "200px",
                                            minWidth: "200px",
                                            maxWidth: "200px"
                                        }}
                                    >
                                        <div className="bg-white px-4 py-3 md:px-6 md:py-4 rounded-lg shadow-md flex items-center justify-center w-full h-[60px] md:h-[80px]">
                                            <Image
                                                src={company.logo}
                                                alt={`${company.name} logo`}
                                                width={isGovtLogo ? 200 : 120}
                                                height={isGovtLogo ? 60 : 40}
                                                className="object-contain max-h-[40px] md:max-h-[60px] w-auto"
                                                style={{ 
                                                    maxWidth: "100%",
                                                    height: "auto"
                                                }}
                                                priority={index < 6}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
