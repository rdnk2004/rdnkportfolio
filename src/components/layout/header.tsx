"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);

      const sections = navLinks.map(link => {
        const elem = document.querySelector(link.href);
        return elem ? elem : null;
      }).filter(Boolean);

      let currentSection = '';

      for (const section of sections) {
        if (section) {
          const sectionTop = (section as HTMLElement).offsetTop;
          if (window.scrollY >= sectionTop - 100) {
            currentSection = `#${section.id}`;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      hasScrolled ? "py-4 bg-background/80 backdrop-blur-md shadow-lg shadow-black/20" : "py-6"
    )}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#hero" className="flex items-center hover:opacity-80 transition-opacity">
          <div className="relative h-16 w-16">
            <Image
              src="/indigo.png"
              alt="RDNK Logo"
              fill
              className="object-contain block dark:hidden"
              priority
              sizes="64px"
            />
            <Image
              src="/electricblue.png"
              alt="RDNK Logo"
              fill
              className="object-contain hidden dark:block"
              priority
              sizes="64px"
            />
          </div>
        </a>
        <div className="flex items-center space-x-4 md:space-x-8">
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "text-foreground hover:text-primary transition-colors",
                    activeSection === link.href ? 'text-primary font-semibold' : ''
                  )}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
