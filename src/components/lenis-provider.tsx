"use client";

import { ReactNode, useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface LenisProviderProps {
    children: ReactNode;
}

/**
 * Mobile breakpoint - devices below this width use native scroll
 */
const MOBILE_BREAKPOINT = 768;

/**
 * LenisProvider - Smooth scrolling for desktop, native scroll for mobile.
 * 
 * On mobile devices:
 * - Uses native scroll (already smooth on iOS/Android)
 * - Reduces main thread work significantly
 * - Still supports GSAP ScrollTrigger for scroll-based animations
 * 
 * On desktop:
 * - Full Lenis smooth scrolling experience
 * - GSAP ScrollTrigger integration
 * - Smooth anchor link navigation
 */
export default function LenisProvider({ children }: LenisProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Check if we're on desktop
        const checkDesktop = () => {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const isWideScreen = window.innerWidth >= MOBILE_BREAKPOINT;
            return isWideScreen && !prefersReducedMotion;
        };

        const shouldUseLenis = checkDesktop();
        setIsDesktop(shouldUseLenis);

        // Mobile: Just set up ScrollTrigger without Lenis
        if (!shouldUseLenis) {
            // ScrollTrigger works fine with native scroll
            ScrollTrigger.refresh();
            return;
        }

        // Desktop: Initialize Lenis with optimal settings
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 2.0,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Integrate Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Convert to milliseconds
        });

        gsap.ticker.lagSmoothing(0);

        // Smooth scroll to anchor links (desktop only)
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]');

            if (anchor) {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                if (href && href !== '#') {
                    const element = document.querySelector(href);
                    if (element) {
                        lenis.scrollTo(element as HTMLElement, {
                            offset: -80, // Account for fixed header
                            duration: 1.5,
                        });
                    }
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        // Handle resize - switch between Lenis and native scroll
        const handleResize = () => {
            const shouldNowUseLenis = checkDesktop();
            if (!shouldNowUseLenis && lenisRef.current) {
                // Switched to mobile - destroy Lenis
                lenisRef.current.destroy();
                lenisRef.current = null;
                setIsDesktop(false);
                ScrollTrigger.refresh();
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
            gsap.ticker.remove((time) => {
                if (lenisRef.current) {
                    lenisRef.current.raf(time * 1000);
                }
            });
            document.removeEventListener('click', handleAnchorClick);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <>{children}</>;
}
