"use client";

import { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { AnimatePresence } from "framer-motion";
import Loader from '@/components/loader';
import DarkModeLoader from '@/components/dark-mode-loader';
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
  const [showDarkLoader, setShowDarkLoader] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { theme } = useTheme();
  // Track previous theme to detect switches
  const [prevTheme, setPrevTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsClient(true);
    // Initial Load Logic
    if (theme === 'dark') {
      setShowDarkLoader(true);
      setLoading(false); // Disable standard loader logic effectively for dark mode
    } else {
      // Standard Light Mode Loader
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []); // Run once on mount

  // Watch for Theme Switch (Light -> Dark)
  useEffect(() => {
    if (!isClient) return;

    // Only trigger if we are switching FROM light TO dark
    // And it's not the initial mount (handled above)
    if (prevTheme === 'light' && theme === 'dark') {
      setShowDarkLoader(true);
    }

    setPrevTheme(theme);
  }, [theme, isClient, prevTheme]);


  if (!isClient) {
    return <Loader onFinished={() => { }} />;
  }

  return (
    <>
      {/* Dark Mode Loader Overlay */}
      <AnimatePresence>
        {showDarkLoader && (
          <div className="fixed inset-0 z-[200]">
            <DarkModeLoader onFinished={() => setShowDarkLoader(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* Standard Loader (Light Mode only) */}
      {loading && theme !== 'dark' ? (
        <Loader onFinished={() => setLoading(false)} />
      ) : (
        <MainContent />
      )}
    </>
  );
}

