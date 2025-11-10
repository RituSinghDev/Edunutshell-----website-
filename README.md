# EduNutshell - Modern Education Platform

A beautiful, modern educational website built with Next.js 15 and Tailwind CSS featuring cloud computing and machine learning courses.

## Features

- 🎨 Modern, aesthetic design with blue-white color theme
- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- 🚀 Built with Next.js 15 App Router
- 💅 Styled with Tailwind CSS
- 🎯 SEO optimized

## Pages

- **Home**: Hero section, stats, popular courses, programs, testimonials, and enquiry form
- **About**: Introduction, vision, and mission sections
- **Courses**: Course listing with filters (Cloud Computing, Machine Learning)
- **Course Details**: Individual course information pages
- **Contact**: Contact form and information

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
edu-website/
├── app/
│   ├── about/
│   ├── courses/
│   │   └── [id]/
│   ├── contact/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── PopularCourses.tsx
│   │   ├── Programs.tsx
│   │   ├── Testimonials.tsx
│   │   └── EnquiryForm.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
└── public/
    └── (logo files)
```

## Customization

### Adding Your Logo

Place your logo files in the `public/` directory and update the references in:
- `components/Navbar.tsx`
- `components/Footer.tsx`

### Color Theme

The color theme can be customized in:
- `tailwind.config.ts` - Main color palette
- `app/globals.css` - CSS variables

### Content

Update course data, testimonials, and other content directly in the component files.

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Unsplash (stock images)

## License

MIT
