"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DarkModeLoaderProps {
    onFinished: () => void;
}

export default function DarkModeLoader({ onFinished }: DarkModeLoaderProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const exitTimer = setTimeout(() => setVisible(false), 2600);
        const finishTimer = setTimeout(onFinished, 3200);

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(finishTimer);
        };
    }, [onFinished]);

    const letters = ["R", ".", "D", ".", "N", ".", "K"];

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="dark-loader-spotlight"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505] overflow-hidden"
                >
                    {/* Subtle Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] opacity-80 pointer-events-none" />

                    {/* Ambient Glow */}
                    <motion.div
                        className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: [0.5, 1.2, 1], opacity: [0, 0.8, 0.4] }}
                        transition={{ duration: 2.2, ease: "easeOut" }}
                    />

                    {/* Text Container */}
                    <div className="relative font-cinzel text-[#E0D8C0] tracking-[0.4em] sm:tracking-[0.5em] text-3xl sm:text-4xl lg:text-5xl font-medium flex items-center gap-2 sm:gap-4">
                        {letters.map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2 + index * 0.15,
                                    ease: "easeOut"
                                }}
                                className={char === "." ? "text-sm opacity-50 px-0.5" : "inline-block"}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
