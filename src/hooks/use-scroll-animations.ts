"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

        const animation = gsap.fromTo(
            element,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    end: 'top 60%',
                    toggleActions: 'play none none reverse',
                    ...options,
                },
            }
        );

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
        const elements = container.querySelectorAll(selector);

        if (elements.length === 0) return;

        const animation = gsap.fromTo(
            elements,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    ...options,
                },
            }
        );

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
        const fromVars: any = { opacity: 0 };

        switch (direction) {
            case 'left':
                fromVars.x = -50;
                break;
            case 'right':
                fromVars.x = 50;
                break;
            case 'up':
                fromVars.y = 50;
                break;
        }

        const animation = gsap.fromTo(
            element,
            fromVars,
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    ...options,
                },
            }
        );

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
