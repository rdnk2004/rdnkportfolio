"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/**
 * ThemeTransition - Cinematic wipe effect for theme changes
 * 
 * Creates an elegant left-to-right curtain sweep when switching themes.
 * Uses GPU-accelerated transforms for smooth performance.
 */
export function ThemeTransition() {
    const { resolvedTheme } = useTheme();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionTheme, setTransitionTheme] = useState<"light" | "dark">("light");
    const prevThemeRef = useRef<string | undefined>(undefined);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Detect theme change
        if (prevThemeRef.current && prevThemeRef.current !== resolvedTheme) {
            // Set the target theme for the overlay color
            setTransitionTheme(resolvedTheme as "light" | "dark");
            setIsTransitioning(true);
        }

        prevThemeRef.current = resolvedTheme;
    }, [resolvedTheme, mounted]);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div
                    className="fixed inset-0 z-[9999] pointer-events-none"
                    style={{
                        willChange: "transform",
                        background: transitionTheme === "dark"
                            ? "linear-gradient(90deg, transparent 0%, hsl(0 0% 8%) 15%, hsl(0 0% 8%) 85%, transparent 100%)"
                            : "linear-gradient(90deg, transparent 0%, hsl(30 15% 97%) 15%, hsl(30 15% 97%) 85%, transparent 100%)",
                    }}
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1], // Smooth expo-out curve
                    }}
                    onAnimationComplete={() => setIsTransitioning(false)}
                />
            )}
        </AnimatePresence>
    );
}
