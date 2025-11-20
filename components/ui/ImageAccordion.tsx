"use client";

import { useState } from 'react';
import Image from 'next/image';

// --- Data for the image accordion ---
const accordionItems = [
  {
    id: 1,
    title: 'Software & Data',
    imageUrl: 'https://images.unsplash.com/photo-1638482856830-16b0e15fcf2c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Electronics Core',
    imageUrl: 'https://images.unsplash.com/photo-1550041473-d296a3a8a18a?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Mechanical & Automotive',
    imageUrl: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    title: 'Architecture & Civil',
    imageUrl: 'https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    title: 'Management + Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onMouseEnter }: {
  item: typeof accordionItems[0];
  isActive: boolean;
  onMouseEnter: () => void;
}) => {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]
        ${isActive 
          ? 'w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px]' 
          : 'w-[50px] sm:w-[60px] md:w-[65px] lg:w-[70px]'
        }`}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 300px, 400px"
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
      {/* Caption Text */}
      <span
        className={`absolute text-white font-semibold z-20 whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? 'bottom-4 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] md:text-xs lg:text-base px-1' // Active state: single line, centered, smaller text
              : 'bottom-20 sm:bottom-20 md:bottom-25 left-1/2 -translate-x-1/2 rotate-90 text-xs sm:text-sm md:text-base origin-center overflow-hidden text-ellipsis' // Inactive state: vertical
          }`}
      >
        {item.title}
      </span>
    </div>
  );
};

// --- Main ImageAccordion Component ---
export function ImageAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto p-2 sm:p-3 md:p-4">
        {accordionItems.map((item, index) => (
          <AccordionItem
            key={item.id}
            item={item}
            isActive={index === activeIndex}
            onMouseEnter={() => handleItemHover(index)}
          />
        ))}
      </div>
    </div>
  );
}
