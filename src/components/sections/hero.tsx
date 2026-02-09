"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { FileText, ArrowUpRight, Github, Linkedin, Mail, Sparkles, Gamepad2, MessageSquare, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShouldReduceAnimations } from '@/hooks/use-device-detection';

// ============================================================================
// BENTO GRID HERO - v4
// Updated: Resume button, Currently card with rotating content
// ============================================================================

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.05 } // Reduced stagger for faster initial render
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 8 }, // Reduced distance for smoother animation
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3, // Faster animation
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
        }
    }
};

// Currently working on items
const currentlyItems = [
    {
        icon: Sparkles,
        title: "Building NLP systems with LLMs & RAG",
        subtitle: "Leading a small team on applied NLP and retrieval-augmented projects",
        highlight: null
    },
    {
        icon: Gamepad2,
        title: "CyberArcade",
        subtitle: "A cyberpunk reimagining of classic games like Snake, Tetris, and Pong",
        highlight: "cyber" // Special styling for this
    },
    {
        icon: Wallet,
        title: "Developing a expense tracker app",
        subtitle: "To learn Svelte framework and to help tracking my monthly expenses",
        highlight: null
    }
];

// Bento Card wrapper
// hasGlow: shows animated gradient glow on desktop, disabled on mobile for performance
// reduceAnimations: passed from parent to conditionally disable expensive effects
function BentoCard({
    children,
    className,
    hasGlow = false,
    reduceAnimations = false
}: {
    children: React.ReactNode;
    className?: string;
    hasGlow?: boolean;
    reduceAnimations?: boolean;
}) {
    // Show glow only on desktop (when animations are not reduced)
    const showGlow = hasGlow && !reduceAnimations;

    return (
        <motion.div
            variants={itemVariants}
            className={cn(
                "rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm",
                "p-4 relative overflow-hidden",
                "transition-all duration-300 hover:border-primary/20 hover:bg-card/60",
                className
            )}
        >
            {showGlow && (
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-full blur-3xl"
                        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-secondary/5 via-transparent to-transparent rounded-full blur-3xl"
                        animate={{ x: [0, -30, 0], y: [0, -50, 0] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            )}
            <div className="relative z-10 h-full">{children}</div>
        </motion.div>
    );
}

// Social link
function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-3 sm:p-4 rounded-lg bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
            aria-label={label}
        >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </a>
    );
}

// Currently Card with rotating items
function CurrentlyCard() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % currentlyItems.length);
        }, 4000); // Rotate every 4 seconds
        return () => clearInterval(interval);
    }, []);

    const item = currentlyItems[currentIndex];
    const Icon = item.icon;

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Currently</h3>
            <div className="flex-1 flex items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start gap-3"
                    >
                        <div className={cn(
                            "p-2 rounded-lg shrink-0",
                            item.highlight === "cyber"
                                ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-400"
                                : "bg-primary/10 text-primary"
                        )}>
                            <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                            {item.highlight === "cyber" ? (
                                <p className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                                    {item.title}
                                </p>
                            ) : (
                                <p className="text-sm font-medium text-foreground">{item.title}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.subtitle}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            {/* Progress dots */}
            <div className="flex gap-1.5 mt-2">
                {currentlyItems.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={cn(
                            "h-1 rounded-full transition-all duration-300",
                            idx === currentIndex ? "w-4 bg-primary" : "w-1 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// MAIN HERO
// ============================================================================

export default function Hero() {
    const [isMounted, setIsMounted] = useState(false);
    const shouldReduceAnimations = useShouldReduceAnimations();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section id="hero" className="flex items-center pt-32 pb-8 lg:pt-40 lg:pb-12">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isMounted ? "visible" : "hidden"}
                className="w-full grid grid-cols-2 lg:grid-cols-12 gap-3"
            >
                {/* ===== Main Name Card ===== */}
                <BentoCard className="col-span-2 lg:col-span-8 lg:row-span-2 flex flex-col justify-between" hasGlow reduceAnimations={shouldReduceAnimations}>
                    <div>
                        {/* Status */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs text-muted-foreground tracking-wide">Open to opportunities</span>
                        </div>

                        {/* Name - Original CSS hover effect */}
                        <div
                            className="group relative h-16 sm:h-20 lg:h-24"
                            aria-label="R.D.N.K expands to R.D.Nikhil Krishna on hover"
                        >
                            <h1 className="absolute inset-0 flex items-center text-5xl sm:text-6xl lg:text-7xl font-headline tracking-widest transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-95">
                                R.D.N.K
                            </h1>
                            <h1 className="absolute inset-0 flex items-center text-[2.6rem] sm:text-6xl lg:text-7xl font-headline tracking-tight sm:tracking-normal opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100">
                                R.D.Nikhil Krishna
                            </h1>
                        </div>
                    </div>

                    {/* Role & Description */}
                    <div className="mt-3 space-y-2">
                        <h2 className="text-lg sm:text-xl font-medium text-foreground/90">
                            Data Analyst & Automation Specialist
                        </h2>
                        <p className="text-muted-foreground leading-relaxed max-w-lg text-sm">
                            Transforming complex data into actionable insights. Building automated solutions that drive efficiency.
                        </p>
                    </div>
                </BentoCard>

                {/* ===== Currently Card (Rotating) ===== */}
                <BentoCard className="col-span-2 lg:col-span-4 p-3 sm:p-4">
                    <CurrentlyCard />
                </BentoCard>

                {/* ===== CTA Card ===== */}
                <BentoCard className="col-span-1 lg:col-span-4 flex flex-col justify-center h-full">
                    {/* Mobile View: Row of Icons */}
                    <div className="flex lg:hidden flex-row items-center justify-between gap-2 w-full h-full p-1">
                        <Button asChild size="icon" className="flex-1 h-full max-h-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm">
                            <a href="#projects" aria-label="View My Work">
                                <ArrowUpRight className="h-5 w-5" />
                            </a>
                        </Button>
                        <Button asChild variant="outline" size="icon" className="flex-1 h-full max-h-12 bg-muted/30 border-muted-foreground/20 hover:border-primary hover:text-primary transition-colors">
                            <a href="#contact" aria-label="Contact">
                                <MessageSquare className="h-5 w-5" />
                            </a>
                        </Button>
                        <Button asChild variant="outline" size="icon" className="flex-1 h-full max-h-12 bg-muted/30 border-muted-foreground/20 hover:border-primary hover:text-primary transition-colors">
                            <a href="/resume.pdf" download aria-label="Resume">
                                <FileText className="h-5 w-5" />
                            </a>
                        </Button>
                    </div>

                    {/* Desktop View: Original Text Layout */}
                    <div className="hidden lg:flex flex-col gap-2 w-full">
                        <Button asChild size="sm" className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity group">
                            <a href="#projects" className="flex items-center justify-center gap-2">
                                View My Work
                                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </Button>
                        <div className="flex gap-2">
                            <Button asChild variant="outline" size="sm" className="flex-1">
                                <a href="#contact">Contact</a>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="flex-1 hover:border-primary hover:text-primary">
                                <a href="/resume.pdf" download className="flex items-center justify-center gap-1.5">
                                    <FileText className="h-3.5 w-3.5" />
                                    Resume
                                </a>
                            </Button>
                        </div>
                    </div>
                </BentoCard>

                {/* ===== Social Links Card ===== */}
                <BentoCard className="col-span-1 lg:col-span-4 flex items-center">
                    <div className="w-full">
                        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3">Connect</h3>
                        <div className="flex gap-2 sm:gap-3 justify-between sm:justify-start">
                            <SocialLink href="https://github.com/rdnk2004" icon={Github} label="GitHub" />
                            <SocialLink href="https://linkedin.com/in/nikhil-krishna-r-d-773b84259" icon={Linkedin} label="LinkedIn" />
                            <SocialLink href="mailto:rdnkpersonal2004@gmail.com" icon={Mail} label="Email" />
                        </div>
                    </div>
                </BentoCard>

                {/* ===== Quote Card ===== */}
                <BentoCard className="col-span-1 lg:col-span-4 flex items-center">
                    <div className="w-full">
                        <p className="text-sm sm:text-lg font-headline italic text-foreground/80 leading-tight">
                            "From complexity to clarity"
                        </p>
                        <p className="text-[10px] sm:text-sm text-muted-foreground mt-1.5">— My approach</p>
                    </div>
                </BentoCard>

                {/* ===== Working Principles Card ===== */}
                <BentoCard className="col-span-1 lg:col-span-4 flex items-center">
                    <div className="w-full">
                        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3">Principles</h3>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 text-sm sm:text-lg font-headline text-foreground/90">
                            <span>Clarity</span>
                            <span className="hidden sm:inline text-primary/40">·</span>
                            <span>Ownership</span>
                            <span className="hidden sm:inline text-primary/40">·</span>
                            <span>Reliability</span>
                        </div>
                    </div>
                </BentoCard>
            </motion.div>
        </section>
    );
}
