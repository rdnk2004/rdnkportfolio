import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
    children: ReactNode;
    className?: string;
}

/**
 * Standardized Section Header Component
 * 
 * SPEC:
 * - Font: font-headline (Playfair Display)
 * - Weight: font-semibold (better readability than bold)
 * - Size: text-3xl (30px) — reduced from 4xl for tighter hierarchy
 * - Color: text-foreground (high contrast) — not primary, for better hierarchy
 * - Underline: w-16 h-0.5 bg-primary/60 — thinner, subtler accent
 * - Container spacing: mb-8 (32px below header)
 * 
 * Tailwind Classes Summary:
 * - Title: text-3xl font-headline font-semibold text-foreground tracking-tight
 * - Underline: w-16 h-0.5 bg-primary/60 rounded-full
 * - Container: text-center relative pb-3 mb-8
 */
export function SectionHeading({ children, className }: SectionHeadingProps) {
    return (
        <h2 className={cn(
            // Title styling
            "text-3xl font-headline font-semibold text-foreground tracking-tight",
            // Container & positioning
            "text-center relative pb-3 mb-6",
            // Underline (pseudo-element)
            "after:content-[''] after:absolute after:left-1/2 after:bottom-0",
            "after:w-16 after:h-0.5 after:bg-primary/60 after:-translate-x-1/2 after:rounded-full",
            className
        )}>
            {children}
        </h2>
    )
}
