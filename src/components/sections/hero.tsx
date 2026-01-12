"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { FileDown } from 'lucide-react';

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center py-12">
      <div className="grid grid-cols-1 items-center gap-16">
        <div className={cn("text-center lg:text-left space-y-6 transition-all duration-1000", isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <p className="text-primary font-medium text-lg dark:text-primary light-gradient-text">Hello, I'm</p>
          <div className="group relative h-20 sm:h-24" aria-label="R.D.N.K expands to R.D.Nikhil Krishna on hover">
            <h1 className="absolute inset-0 flex items-center justify-center lg:justify-start text-5xl sm:text-6xl lg:text-7xl font-headline tracking-widest transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-95">R.D.N.K</h1>
            <h1 className="absolute inset-0 flex items-center justify-center lg:justify-start text-5xl sm:text-6xl lg:text-7xl font-headline tracking-normal opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100">R.D.Nikhil Krishna</h1>
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium text-foreground/90">
            Data Analyst | Automation and Insights Specialist
          </h2>
          <p className="max-w-xl mx-auto lg:mx-0 text-muted-foreground leading-relaxed">
            Innovative Data Analyst transforming complex data into actionable insights and building automated solutions to drive efficiency.
          </p>
          <div className="flex flex-col items-center lg:items-start gap-4 pt-4">
            <div className="flex justify-center lg:justify-start space-x-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity">
                <a href="#projects">View My Work</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button asChild variant="outline">
                <a href="/resume.pdf" download>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
