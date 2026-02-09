import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fade in element on scroll
 */
export const fadeInOnScroll = (element: string | HTMLElement, options = {}) => {
    return gsap.fromTo(
        element,
        {
            opacity: 0,
            y: 30,
        },
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
};

/**
 * Slide in from direction on scroll
 */
export const slideInOnScroll = (
    element: string | HTMLElement,
    direction: 'left' | 'right' | 'bottom' = 'bottom',
    options = {}
) => {
    const fromVars: any = { opacity: 0 };

    switch (direction) {
        case 'left':
            fromVars.x = -50;
            break;
        case 'right':
            fromVars.x = 50;
            break;
        case 'bottom':
            fromVars.y = 50;
            break;
    }

    return gsap.fromTo(
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
};

/**
 * Stagger animation for multiple elements
 */
export const staggerOnScroll = (
    elements: string | HTMLElement[],
    options = {}
) => {
    return gsap.fromTo(
        elements,
        {
            opacity: 0,
            y: 30,
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: typeof elements === 'string' ? elements : elements[0],
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                ...options,
            },
        }
    );
};

/**
 * Parallax effect for background elements
 */
export const parallaxOnScroll = (
    element: string | HTMLElement,
    speed: number = 0.5,
    options = {}
) => {
    return gsap.to(element, {
        y: () => -window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            ...options,
        },
    });
};

/**
 * Scale on scroll
 */
export const scaleOnScroll = (element: string | HTMLElement, options = {}) => {
    return gsap.fromTo(
        element,
        {
            scale: 0.9,
            opacity: 0,
        },
        {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.2)',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                ...options,
            },
        }
    );
};

/**
 * Reveal animation (like a curtain)
 */
export const revealOnScroll = (element: string | HTMLElement, options = {}) => {
    return gsap.fromTo(
        element,
        {
            clipPath: 'inset(0 0 100% 0)',
        },
        {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.0,
            ease: 'power3.inOut',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
                ...options,
            },
        }
    );
};

/**
 * Batch animation for better performance
 */
export const batchAnimation = (selector: string, options = {}) => {
    ScrollTrigger.batch(selector, {
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
};
