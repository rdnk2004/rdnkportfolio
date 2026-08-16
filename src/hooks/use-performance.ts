"use client";

import { useEffect, useState } from 'react';

// Safe localStorage access helper for Firefox Strict Privacy & Private Browsing
function safeGetStorage(key: string): string | null {
    try {
        return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    } catch {
        return null;
    }
}

function safeSetStorage(key: string, value: string): void {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, value);
        }
    } catch {
        // Ignore storage write errors in strict/sandboxed modes
    }
}

function safeGetSessionStorage(key: string): string | null {
    try {
        return typeof window !== 'undefined' ? sessionStorage.getItem(key) : null;
    } catch {
        return null;
    }
}

function safeSetSessionStorage(key: string, value: string): void {
    try {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem(key, value);
        }
    } catch {
        // Ignore session storage errors
    }
}

/**
 * Hook to detect if this is the first visit
 * Returns true on first visit, false on subsequent visits
 */
export function useFirstVisit() {
    const [isFirstVisit, setIsFirstVisit] = useState(true);

    useEffect(() => {
        const hasVisited = safeGetStorage('has_visited');

        if (hasVisited) {
            setIsFirstVisit(false);
        } else {
            safeSetStorage('has_visited', 'true');
            setIsFirstVisit(true);
        }
    }, []);

    return isFirstVisit;
}

/**
 * Hook to prefetch critical resources safely
 */
export function usePrefetchResources() {
    useEffect(() => {
        if (typeof document === 'undefined') return;

        const images = [
            '/image.png',
        ];

        images.forEach(src => {
            try {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
            } catch {
                // Ignore prefetch errors
            }
        });
    }, []);
}

/**
 * Hook to implement progressive loading
 */
export function useProgressiveLoad(delay = 100) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return isReady;
}

/**
 * Hook to warm up browser cache with critical assets safely
 */
export function useWarmCache() {
    useEffect(() => {
        if (safeGetSessionStorage('cache_warmed')) return;

        const criticalPaths = [
            '/resume.pdf',
        ];

        criticalPaths.forEach(path => {
            try {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = path;
                document.head.appendChild(link);
            } catch {
                // Ignore prefetch errors
            }
        });

        safeSetSessionStorage('cache_warmed', 'true');
    }, []);
}
