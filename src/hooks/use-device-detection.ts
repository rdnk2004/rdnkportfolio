"use client";

import { useState, useEffect } from 'react';

/**
 * Mobile breakpoint in pixels (matches Tailwind's 'md' breakpoint)
 */
const MOBILE_BREAKPOINT = 768;

/**
 * Device detection result with performance-related flags
 */
export interface DeviceDetectionResult {
    /** True if viewport width is below mobile breakpoint */
    isMobile: boolean;
    /** True if user prefers reduced motion (accessibility) */
    prefersReducedMotion: boolean;
    /** True if device has touch capability */
    isTouch: boolean;
    /** Combined flag: skip heavy animations if mobile OR reduced motion preferred */
    shouldReduceAnimations: boolean;
}

/**
 * Hook for responsive device detection with performance considerations.
 * 
 * Use this hook to conditionally disable heavy animations on mobile devices
 * while preserving the full experience on desktop.
 * 
 * @example
 * ```tsx
 * const { isMobile, shouldReduceAnimations } = useDeviceDetection();
 * 
 * // Skip expensive animations on mobile
 * if (!shouldReduceAnimations) {
 *   // Run heavy animation
 * }
 * ```
 */
export function useDeviceDetection(): DeviceDetectionResult {
    // SSR-safe default values (assume desktop, no reduced motion)
    const [result, setResult] = useState<DeviceDetectionResult>({
        isMobile: false,
        prefersReducedMotion: false,
        isTouch: false,
        shouldReduceAnimations: false,
    });

    useEffect(() => {
        // Check viewport width
        const checkMobile = () => window.innerWidth < MOBILE_BREAKPOINT;

        // Check reduced motion preference
        const checkReducedMotion = () =>
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Check touch capability
        const checkTouch = () =>
            'ontouchstart' in window || navigator.maxTouchPoints > 0;

        const updateDetection = () => {
            const isMobile = checkMobile();
            const prefersReducedMotion = checkReducedMotion();
            const isTouch = checkTouch();

            setResult({
                isMobile,
                prefersReducedMotion,
                isTouch,
                shouldReduceAnimations: isMobile || prefersReducedMotion,
            });
        };

        // Initial check
        updateDetection();

        // Listen for viewport changes
        const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        // Use addEventListener for modern browsers
        mediaQuery.addEventListener('change', updateDetection);
        motionQuery.addEventListener('change', updateDetection);

        return () => {
            mediaQuery.removeEventListener('change', updateDetection);
            motionQuery.removeEventListener('change', updateDetection);
        };
    }, []);

    return result;
}

/**
 * Simplified hook that just returns mobile status.
 * Use when you only need to check if device is mobile.
 */
export function useIsMobile(): boolean {
    const { isMobile } = useDeviceDetection();
    return isMobile;
}

/**
 * Simplified hook that returns whether to reduce animations.
 * Combines mobile detection with reduced motion preference.
 */
export function useShouldReduceAnimations(): boolean {
    const { shouldReduceAnimations } = useDeviceDetection();
    return shouldReduceAnimations;
}
