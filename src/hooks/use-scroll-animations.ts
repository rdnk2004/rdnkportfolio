"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeInOnScroll, staggerOnScroll, slideInOnScroll } from '@/lib/scroll-animations';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook to apply scroll-triggered fade-in animation
 */
export function useScrollFadeIn(options = {}) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;

        const animation = fadeInOnScroll(element, options);

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return ref;
}

/**
 * Hook to apply scroll-triggered stagger animation to children
 */
export function useScrollStagger(selector: string, options = {}) {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const elements = Array.from(container.querySelectorAll(selector)) as HTMLElement[];

        if (elements.length === 0) return;

        const animation = staggerOnScroll(elements, { 
            trigger: container,
            ...options 
        });

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, [selector]);

    return containerRef;
}

/**
 * Hook to apply scroll-triggered slide animation
 */
export function useScrollSlide(direction: 'left' | 'right' | 'up' = 'up', options = {}) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;
        const libDirection = direction === 'up' ? 'bottom' : direction;

        const animation = slideInOnScroll(element, libDirection, options);

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [direction]);

    return ref;
}

/**
 * Hook to apply batch scroll animations for multiple similar elements
 */
export function useScrollBatch(selector: string, options = {}) {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        ScrollTrigger.batch(container.querySelectorAll(selector), {
            onEnter: (elements) => {
                gsap.fromTo(
                    elements,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out',
                    }
                );
            },
            start: 'top 85%',
            ...options,
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                const triggerElement = trigger.trigger as HTMLElement;
                if (container.contains(triggerElement)) {
                    trigger.kill();
                }
            });
        };
    }, [selector]);

    return containerRef;
}
