/**
 * Motion Configuration
 * 
 * Standardized animation presets for consistent, subtle motion.
 * 
 * RULES:
 * - No parallax
 * - No large transforms (max translateY: 16px)
 * - No bouncing or flashy easing
 * - Fade + slight Y-axis translate only
 * 
 * DURATION GUIDE:
 * - Fast: 300ms - micro-interactions, hovers
 * - Normal: 400ms - card reveals, fade-ins
 * - Slow: 600ms - section headers, hero elements
 * 
 * EASING:
 * - [0.25, 0.1, 0.25, 1] - CSS ease equivalent, smooth deceleration
 * 
 * SECTIONS TO ANIMATE:
 * ✓ About (principle cards) - staggered reveal
 * ✓ Experience (timeline cards) - staggered reveal  
 * ✓ Projects (project cards) - already animated
 * ✓ Skills (skill cards) - already animated
 * ✓ Education (timeline items) - fade in
 * ✓ Certifications (credential cards) - staggered reveal
 * ✓ Awards (award cards) - staggered reveal
 * 
 * SECTIONS TO KEEP STATIC:
 * ✗ Hero - has its own mount animation
 * ✗ Publications - single card, text-heavy
 * ✗ Contact - simple, no distraction needed
 */

import { Variants } from "framer-motion";

// Easing curve: smooth deceleration (equivalent to CSS ease)
export const EASE_SMOOTH = [0.25, 0.1, 0.25, 1] as const;

// Duration in seconds
export const DURATION = {
    fast: 0.3,
    normal: 0.4,
    slow: 0.6,
} as const;

// Stagger delay between items (in seconds)
export const STAGGER = {
    fast: 0.05,
    normal: 0.08,
    slow: 0.12,
} as const;

/**
 * Fade + slight upward translate
 * Use for: cards, list items, content blocks
 */
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 16,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: DURATION.normal,
            ease: EASE_SMOOTH,
        },
    },
};

/**
 * Simple fade (no translate)
 * Use for: text blocks, subtle reveals
 */
export const fadeIn: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: DURATION.normal,
            ease: EASE_SMOOTH,
        },
    },
};

/**
 * Container for staggered children
 * Use with animate="visible" initial="hidden" on parent
 */
export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: STAGGER.normal,
            delayChildren: 0.1,
        },
    },
};

/**
 * Fast stagger for dense grids
 */
export const staggerContainerFast: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: STAGGER.fast,
            delayChildren: 0.05,
        },
    },
};

/**
 * Hover elevation preset (very soft)
 * Use with whileHover on card containers
 */
export const hoverElevation = {
    y: -4,
    transition: {
        duration: DURATION.fast,
        ease: EASE_SMOOTH,
    },
};

/**
 * Viewport trigger config
 * Triggers when 20% of element is visible, only once
 */
export const viewportConfig = {
    once: true,
    margin: "-50px" as const,
    amount: 0.2 as const,
};
