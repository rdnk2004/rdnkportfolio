"use client";

import { cn } from "@/lib/utils";

/**
 * SectionDivider - Subtle visual anchor between sections
 * 
 * Three separator techniques available:
 * 
 * 1. GRADIENT FADE (variant="gradient")
 *    - A soft horizontal gradient that fades from transparent → primary/5 → transparent
 *    - Best for: Major narrative transitions (e.g., Hero → About, Skills → Education)
 * 
 * 2. DOT ACCENT (variant="dot")
 *    - A single centered dot with subtle glow
 *    - Best for: Minor transitions within a conceptual group
 * 
 * 3. LINE WHISPER (variant="line")
 *    - Ultra-thin centered line with gradient fade on edges
 *    - Best for: Between closely related sections (e.g., Certifications → Awards)
 * 
 * Placement recommendations:
 * - After Hero: gradient (signals "start of content")
 * - After Projects: gradient (major portfolio boundary)
 * - After Skills: dot (transition to credentials)
 * - After Education: line (subtle flow to certifications)
 * - After Awards: dot (before publications)
 */

interface SectionDividerProps {
    variant?: "gradient" | "dot" | "line";
    className?: string;
}

export function SectionDivider({ variant = "gradient", className }: SectionDividerProps) {
    return (
        <div
            className={cn(
                "relative w-full flex items-center justify-center py-2",
                className
            )}
            aria-hidden="true"
        >
            {variant === "gradient" && (
                <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            )}

            {variant === "dot" && (
                <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    {/* Subtle glow */}
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-primary/20 blur-sm" />
                </div>
            )}

            {variant === "line" && (
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
            )}
        </div>
    );
}
