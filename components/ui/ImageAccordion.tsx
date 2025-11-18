"use client";

import { useState } from "react";

interface AccordionItem {
  id: number;
  image: string;
  title: string;
}

const accordionItems: AccordionItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1638482856830-16b0e15fcf2c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Software & Data",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1550041473-d296a3a8a18a?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Electronics Core",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Mechanical & Automotive",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Architecture & Civil",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Management + Marketing",
  },
];

export default function ImageAccordion() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="flex flex-row items-center justify-center gap-2 lg:gap-4 h-[300px] lg:h-[450px] w-full lg:w-auto">
        {accordionItems.map((item, index) => {
          const isExpanded = hoveredIndex === index;

          return (
            <div
              key={item.id}
              className={`relative rounded-xl lg:rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out h-[300px] lg:h-[450px] ${
                isExpanded ? "w-[200px] lg:w-[400px]" : "w-[40px] lg:w-[40px]"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => setHoveredIndex(index)}
              onTouchStart={() => setHoveredIndex(index)}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Title */}
              <span
                className={`absolute text-white font-semibold whitespace-nowrap transition-all duration-300 ease-in-out z-10 ${
                  isExpanded
                    ? "text-[10px] lg:text-base bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 rotate-0 text-center px-2 lg:px-0"
                    : "text-xs lg:text-sm w-auto text-left bottom-1/2 translate-y-1/2 lg:bottom-24 lg:translate-y-0 left-1/2 -translate-x-1/2 rotate-90"
                }`}
              >
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
