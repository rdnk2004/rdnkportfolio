"use client";

import { useState, useEffect } from 'react';
import Loader from '@/components/loader';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import StarryBackground from '@/components/layout/starry-background';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Experience from '@/components/sections/experience';
import Education from '@/components/sections/education';
import Skills from '@/components/sections/skills';
import Projects from '@/components/sections/projects';
import Publications from '@/components/sections/publications';
import Contact from '@/components/sections/contact';
import Certifications from '@/components/sections/certifications';
import Awards from '@/components/sections/awards';
import { Inter, Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair-display' });

function MainContent() {
  return (
    <>
      <StarryBackground />
      <Header />
      <div className="relative z-10">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Certifications />
          <Awards />
          <Publications />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default function ClientPage() {
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Matches the duration of the loading animation

    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    // Render a static loader on the server to prevent hydration mismatch
    // And to prevent rendering the whole app on the server.
    return <Loader onFinished={() => {}} />;
  }

  return (
    <>
      {loading ? (
        <Loader onFinished={() => setLoading(false)} />
      ) : (
        <MainContent />
      )}
    </>
  );
}

