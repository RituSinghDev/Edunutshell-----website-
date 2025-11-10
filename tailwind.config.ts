import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px)',
            opacity: '1'
          },
          '50%': { 
            transform: 'translateY(-25px) translateX(5px)',
            opacity: '0.9'
          },
        },
        'float-x': {
          '0%, 100%': { 
            transform: 'translateX(0px) translateY(0px)',
          },
          '50%': { 
            transform: 'translateX(15px) translateY(-10px)',
          },
        },
        'float-diagonal': {
          '0%, 100%': { 
            transform: 'translate(0px, 0px) rotate(0deg)',
          },
          '33%': { 
            transform: 'translate(10px, -15px) rotate(5deg)',
          },
          '66%': { 
            transform: 'translate(-5px, -20px) rotate(-5deg)',
          },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '0.6',
            transform: 'scale(1)',
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.05)',
          },
        },
        'bounce-smooth': {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-15px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out 1.5s infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-x': 'float-x 5s ease-in-out infinite',
        'float-diagonal': 'float-diagonal 7s ease-in-out infinite',
        'spin-slow': 'spin-slow 25s linear infinite',
        'spin-slow-reverse': 'spin-slow 25s linear infinite reverse',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'bounce-smooth': 'bounce-smooth 2s infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
