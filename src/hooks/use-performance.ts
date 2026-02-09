"use client";

import { useEffect, useState } from 'react';

/**
 * Hook to detect if this is the first visit
 * Returns true on first visit, false on subsequent visits
 */
export function useFirstVisit() {
    const [isFirstVisit, setIsFirstVisit] = useState(true);

    useEffect(() => {
        const hasVisited = localStorage.getItem('has_visited');

        if (hasVisited) {
            setIsFirstVisit(false);
        } else {
            // Mark as visited
            localStorage.setItem('has_visited', 'true');
            setIsFirstVisit(true);
        }
    }, []);

    return isFirstVisit;
}

/**
 * Hook to prefetch critical resources
 */
export function usePrefetchResources() {
    useEffect(() => {
        // Prefetch critical images
        const images = [
            '/electricblue.png',
            '/indigo.png',
            '/image.png',
        ];

        images.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });

        // Prefetch fonts (they should already be loaded, but ensure they're cached)
        const fontLink = document.createElement('link');
        fontLink.rel = 'prefetch';
        fontLink.as = 'font';
        fontLink.crossOrigin = 'anonymous';
        document.head.appendChild(fontLink);
    }, []);
}

/**
 * Hook to implement progressive loading
 * Only show content when it's ready to avoid jank
 */
export function useProgressiveLoad(delay = 100) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Small delay to ensure fonts and critical CSS are loaded
        const timer = setTimeout(() => setIsReady(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return isReady;
}

/**
 * Hook to warm up browser cache with critical assets
 */
export function useWarmCache() {
    useEffect(() => {
        // Only run once per session
        if (sessionStorage.getItem('cache_warmed')) return;

        // Warm up cache by preloading critical routes
        const criticalPaths = [
            // These will be prefetched in the background
            '/resume.pdf',
        ];

        criticalPaths.forEach(path => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = path;
            document.head.appendChild(link);
        });

        sessionStorage.setItem('cache_warmed', 'true');
    }, []);
}
