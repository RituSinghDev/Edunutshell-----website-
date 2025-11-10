"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4">
      <div
        className={`max-w-7xl mx-auto transition-all duration-300 ease-in-out rounded-2xl lg:rounded-full ${scrolled
            ? "bg-white shadow-lg"
            : "bg-white/80 backdrop-blur-lg shadow-md"
          }`}
      >
        <div className="flex justify-between items-center h-16 px-6 sm:px-8">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <Image
              src="/edunutshell-logo.png"
              alt="EduNutshell"
              width={240}
              height={50}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${isActive("/")
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${isActive("/about")
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              About
            </Link>
            <Link
              href="/courses"
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${isActive("/courses")
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Courses
            </Link>
            <Link
              href="/blog"
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${isActive("/blog")
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${isActive("/contact")
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Contact
            </Link>

            <div className="ml-3 pl-3 border-l border-gray-200">
              <a
                href="https://learn.edunutshell.com/#/home"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
              >
                Login to LMS
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Menu"
          >
            <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                  className="animate-in fade-in duration-200"
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16"
                  className="animate-in fade-in duration-200"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-100 py-4 px-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`px-5 py-3 text-base font-medium rounded-lg transition-all duration-200 transform ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                } ${
                  isActive("/")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                style={{ transitionDelay: isOpen ? "50ms" : "0ms" }}
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className={`px-5 py-3 text-base font-medium rounded-lg transition-all duration-200 transform ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                } ${
                  isActive("/about")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                style={{ transitionDelay: isOpen ? "100ms" : "0ms" }}
              >
                About
              </Link>
              <Link
                href="/courses"
                onClick={() => setIsOpen(false)}
                className={`px-5 py-3 text-base font-medium rounded-lg transition-all duration-200 transform ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                } ${
                  isActive("/courses")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                style={{ transitionDelay: isOpen ? "150ms" : "0ms" }}
              >
                Courses
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                className={`px-5 py-3 text-base font-medium rounded-lg transition-all duration-200 transform ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                } ${
                  isActive("/blog")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                style={{ transitionDelay: isOpen ? "200ms" : "0ms" }}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={`px-5 py-3 text-base font-medium rounded-lg transition-all duration-200 transform ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                } ${
                  isActive("/contact")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                style={{ transitionDelay: isOpen ? "250ms" : "0ms" }}
              >
                Contact
              </Link>
              <div className={`pt-3 border-t border-gray-100 transition-all duration-200 transform ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: isOpen ? "300ms" : "0ms" }}
              >
                <a
                  href="https://learn.edunutshell.com/#/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-5 py-3 bg-gray-900 text-white text-base font-medium text-center rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Login to LMS
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
