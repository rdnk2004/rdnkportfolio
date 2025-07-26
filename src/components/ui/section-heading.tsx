import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
    children: ReactNode;
    className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
    return (
        <h2 className={cn(
            "text-4xl font-headline font-bold text-center text-primary relative pb-4",
            "after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-24 after:h-1 after:bg-secondary after:-translate-x-1/2 after:rounded-full",
            className
        )}>
            {children}
        </h2>
    )
}
