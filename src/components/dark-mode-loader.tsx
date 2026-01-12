"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DarkModeLoaderProps {
    onFinished: () => void;
}

export default function DarkModeLoader({ onFinished }: DarkModeLoaderProps) {
    const [phase, setPhase] = useState<"silence" | "spotlight-in" | "moving" | "expand" | "exit">("silence");

    useEffect(() => {
        // Phase 1: Spotlight In (0.5s)
        const t1 = setTimeout(() => setPhase("spotlight-in"), 500);
        // Phase 2: Moving (Starts at 1.1s)
        const t2 = setTimeout(() => setPhase("moving"), 1100);
        // Phase 3: Expand (Starts at 3.1s)
        const t3 = setTimeout(() => setPhase("expand"), 3100);
        // Phase 4: Exit (Starts at 3.7s)
        const t4 = setTimeout(() => setPhase("exit"), 3700);
        // Finish (4.5s)
        const t5 = setTimeout(onFinished, 4500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t5);
        };
    }, [onFinished]);

    return (
        <AnimatePresence>
            {phase !== "exit" && (
                <motion.div
                    key="dark-loader-spotlight"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505] overflow-hidden"
                >
                    {/* Subtle Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] opacity-80 pointer-events-none" />

                    {/* Text Container with Mask */}
                    <div className="relative font-cinzel text-[#E0D8C0] tracking-[0.5em] text-2xl md:text-4xl lg:text-5xl font-medium flex items-center gap-4 md:gap-8">
                        {/* The Text Itself - We only show it where the mask allows */}
                        <motion.div
                            className="flex items-center gap-4"
                            initial={{
                                WebkitMaskImage: "radial-gradient(circle at -20% 50%, black 0%, transparent 0%)",
                                maskImage: "radial-gradient(circle at -20% 50%, black 0%, transparent 0%)"
                            } as any}
                            animate={
                                phase === "silence" ? {
                                    WebkitMaskImage: "radial-gradient(circle at -20% 50%, black 0%, transparent 0%)",
                                    maskImage: "radial-gradient(circle at -20% 50%, black 0%, transparent 0%)"
                                } as any :
                                    phase === "spotlight-in" ? {
                                        // Fade in at start position (left)
                                        WebkitMaskImage: "radial-gradient(circle at 0% 50%, black 10%, transparent 40%)",
                                        maskImage: "radial-gradient(circle at 0% 50%, black 10%, transparent 40%)"
                                    } as any :
                                        phase === "moving" ? {
                                            // Move to end position (right)
                                            WebkitMaskImage: "radial-gradient(circle at 100% 50%, black 10%, transparent 40%)",
                                            maskImage: "radial-gradient(circle at 100% 50%, black 10%, transparent 40%)",
                                            transition: { duration: 2.0, ease: "linear" }
                                        } as any :
                                            phase === "expand" ? {
                                                // Expand to cover everything centered
                                                WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 100%, transparent 100%)",
                                                maskImage: "radial-gradient(circle at 50% 50%, black 100%, transparent 100%)",
                                                transition: { duration: 0.6, ease: "easeOut" }
                                            } as any : {}
                            }
                            transition={{ duration: 0.6 }} // Default transition for non-moving phases
                        >
                            <span>R</span>
                            <span className="text-sm opacity-50">.</span>
                            <span>D</span>
                            <span className="text-sm opacity-50">.</span>
                            <span>N</span>
                            <span className="text-sm opacity-50">.</span>
                            <span>K</span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
