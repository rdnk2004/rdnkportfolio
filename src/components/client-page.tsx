"use client";

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
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
import { SectionDivider } from '@/components/ui/section-divider';
import { usePrefetchResources, useWarmCache } from '@/hooks/use-performance';

// Lazy load below-the-fold sections for better performance
const Education = lazy(() => import('@/components/sections/education'));
const Skills = lazy(() => import('@/components/sections/skills'));
const Projects = lazy(() => import('@/components/sections/projects'));
const Publications = lazy(() => import('@/components/sections/publications'));
const Contact = lazy(() => import('@/components/sections/contact'));
const Certifications = lazy(() => import('@/components/sections/certifications'));
const Awards = lazy(() => import('@/components/sections/awards'));

function MainContent() {
  // Warm cache and prefetch resources for better subsequent visits
  usePrefetchResources();
  useWarmCache();

  return (
    <>
      <StarryBackground />
      <Header />
      <div className="relative z-10">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          {/* Gradient: Signals "start of real content" */}
          <SectionDivider variant="gradient" />
          <About />
          <Experience />

          {/* Below-the-fold sections with Suspense */}
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <Projects />
          </Suspense>

          {/* Gradient: Major portfolio boundary → Skills */}
          <SectionDivider variant="gradient" />

          <Suspense fallback={<div className="min-h-[300px]" />}>
            <Skills />
          </Suspense>

          {/* Dot: Transition to credentials section */}
          <SectionDivider variant="dot" />

          <Suspense fallback={<div className="min-h-[300px]" />}>
            <Education />
          </Suspense>

          {/* Line: Subtle flow within credentials */}
          <SectionDivider variant="line" />

          <Suspense fallback={<div className="min-h-[300px]" />}>
            <Certifications />
            <Awards />
          </Suspense>

          {/* Dot: Before publications */}
          <SectionDivider variant="dot" />

          <Suspense fallback={<div className="min-h-[300px]" />}>
            <Publications />
            <Contact />
          </Suspense>
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

  // Track if dark loader has been shown (persists across re-renders, doesn't trigger re-render)
  const darkLoaderShownRef = useRef(false);
  // Track previous theme for detecting changes
  const prevThemeRef = useRef<string | undefined>(undefined);

  // Initial load - show light mode loader
  useEffect(() => {
    setIsClient(true);
    // Always start with light mode loader (since defaultTheme is light)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Watch for theme changes
  useEffect(() => {
    if (!isClient || loading) return;

    // Only show dark loader on FIRST switch to dark mode
    if (prevThemeRef.current === 'light' && theme === 'dark' && !darkLoaderShownRef.current) {
      setShowDarkLoader(true);
      darkLoaderShownRef.current = true; // Mark as shown - won't show again
    }

    prevThemeRef.current = theme;
  }, [theme, isClient, loading]);

  if (!isClient) {
    return <Loader onFinished={() => { }} />;
  }

  return (
    <>
      {/* Dark Mode Loader Overlay - Only shows once */}
      <AnimatePresence>
        {showDarkLoader && (
          <div className="fixed inset-0 z-[200]">
            <DarkModeLoader onFinished={() => setShowDarkLoader(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* Standard Loader (Light Mode - initial load only) */}
      {loading ? (
        <Loader onFinished={() => setLoading(false)} />
      ) : (
        <MainContent />
      )}
    </>
  );
}

