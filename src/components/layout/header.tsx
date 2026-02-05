"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Certifications', href: '#certifications' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  // Scroll ranges - slight travel to allow spring physics to work (0-50px)
  const SCROLL_RANGE = [0, 50];

  // Spring config - High stiffness for speed, adequate damping for no bounce
  // This balances "mechanical" 1:1 vs "laggy" float.
  const springConfig = { stiffness: 400, damping: 40, mass: 1 };

  // Transformations
  const widthPercent = useSpring(useTransform(scrollY, SCROLL_RANGE, ["100%", "85%"]), springConfig);
  // Cap max width to ensure it doesn't look too wide on ultra-wide screens when floating
  const maxWidth = useSpring(useTransform(scrollY, SCROLL_RANGE, [3000, 850]), springConfig);

  const y = useSpring(useTransform(scrollY, SCROLL_RANGE, [0, 24]), springConfig);
  const borderRadius = useSpring(useTransform(scrollY, SCROLL_RANGE, [0, 9999]), springConfig); // Pill shape

  // Glassmorphism effects
  const borderOpacity = useTransform(scrollY, SCROLL_RANGE, [0, 0.4]);
  const borderWidth = useTransform(scrollY, SCROLL_RANGE, [0, 1]);
  const bgOpacity = useTransform(scrollY, SCROLL_RANGE, [0, 0.75]); // HSL opacity
  const blurValue = useTransform(scrollY, SCROLL_RANGE, [0, 16]);
  const shadowOpacity = useTransform(scrollY, SCROLL_RANGE, [0, 0.1]);

  // Combined styles
  const navBackground = useMotionTemplate`hsl(var(--background) / ${bgOpacity})`;
  const navBorderColor = useMotionTemplate`hsl(var(--border) / ${borderOpacity})`;

  const backdropFilter = useMotionTemplate`blur(${blurValue}px) saturate(180%)`;
  const boxShadow = useMotionTemplate`0 10px 40px -10px rgba(0,0,0, ${shadowOpacity})`;

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.querySelector(link.href)).filter(Boolean);

      let currentSection = '';

      for (const section of sections) {
        if (section) {
          const sectionTop = (section as HTMLElement).offsetTop;
          if (window.scrollY >= sectionTop - 150) {
            currentSection = `#${section.id}`;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none"
        style={{ y }}
      >
        <motion.nav
          className={cn(
            "pointer-events-auto flex flex-col md:flex-row items-center justify-start md:justify-between px-6 lg:px-8",
            mobileMenuOpen ? "bg-background/95 backdrop-blur-xl" : ""
          )}
          style={{
            width: mobileMenuOpen ? "90%" : widthPercent, // On mobile open, go almost full width but keep it floating
            maxWidth: mobileMenuOpen ? "500px" : maxWidth, // Cap width on mobile open
            borderRadius: mobileMenuOpen ? 32 : borderRadius,
            backgroundColor: mobileMenuOpen ? "hsl(var(--background))" : navBackground,
            borderWidth: mobileMenuOpen ? 1 : borderWidth,
            borderStyle: 'solid',
            borderColor: mobileMenuOpen ? 'rgba(var(--foreground), 0.1)' : navBorderColor,
            backdropFilter: mobileMenuOpen ? 'none' : backdropFilter,
            boxShadow: mobileMenuOpen ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : boxShadow,
            height: "auto", // Let it grow
            paddingTop: mobileMenuOpen ? "24px" : "14px",
            paddingBottom: mobileMenuOpen ? "24px" : "14px",
            gap: mobileMenuOpen ? "0px" : "0px", // Flex gap control
          }}
        >
          {/* Top Row: Logo and Toggle */}
          <div className="w-full flex items-center justify-between z-50">
            {/* Logo Container */}
            <div className="flex-shrink-0">
              <a
                href="#hero"
                className="flex items-center hover:opacity-80 transition-opacity"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                }}
              >
                <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                  <Image
                    src="/indigo.png"
                    alt="RDNK Logo"
                    fill
                    className="object-contain block dark:hidden"
                    priority
                    sizes="(max-width: 768px) 48px, 64px"
                    style={{ objectFit: 'contain' }}
                  />
                  <Image
                    src="/electricblue.png"
                    alt="RDNK Logo"
                    fill
                    className="object-contain hidden dark:block"
                    priority
                    sizes="(max-width: 768px) 48px, 64px"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </a>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="flex items-center md:hidden gap-4">
              <AnimatePresence>
                {/* Theme toggle moves here inside the island when open */}
                {!mobileMenuOpen && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ThemeToggle />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -mr-2 text-foreground hover:text-primary transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>


          {/* Desktop Navigation - Unchanged */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <ul className="flex items-center space-x-1 lg:space-x-2 bg-transparent p-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200",
                      "hover:text-primary hover:bg-primary/10",
                      activeSection === link.href
                        ? 'text-primary bg-primary/10 md:bg-transparent md:text-primary md:font-semibold'
                        : 'text-muted-foreground'
                    )}
                  >
                    {link.name}
                    {/* Active indicator dot for extra flair */}
                    {activeSection === link.href && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute inset-0 rounded-full bg-primary/10 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pl-4 ml-4 border-l border-border/40">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Content - Vertical Expansion */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="w-full flex flex-col items-center justify-start space-y-2 md:hidden overflow-hidden"
              >
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }}
                    className={cn(
                      "w-full text-center py-3 rounded-xl text-lg font-medium tracking-tight hover:bg-primary/5 transition-colors",
                      activeSection === link.href ? 'text-primary bg-primary/10' : 'text-foreground/80'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.3 } }}
                  className="pt-4 pb-2"
                >
                  <ThemeToggle />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.nav>
      </motion.header>
    </>
  );
}
