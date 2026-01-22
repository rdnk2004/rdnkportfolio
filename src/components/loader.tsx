"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface LoaderProps {
  onFinished: () => void;
}

const initials = ["R", ".", "D", ".", "N", ".", "K"];
const tagline = "From complexity to clarity";

export default function Loader({ onFinished }: LoaderProps) {
  const [mounted, setMounted] = useState(false);
  const [fadeout, setFadeout] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fadeTimer = setTimeout(() => setFadeout(true), 3500);
    const finishTimer = setTimeout(() => onFinished(), 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinished, mounted]);

  if (!mounted) return null;

  const isLight = theme === "light";
  const textColor = isLight ? "#1B2A4A" : "#FFD6A5";
  const taglineColor = isLight ? "#6B7C99" : "#FFD6A5";
  const circleColor = isLight ? "#E6C768" : "#3B82F6"; // blue for dark mode (like your localhost version)
  const bgColor = isLight ? "#FAFBFF" : undefined;

  return (
    <>
      <style jsx global>{`
        @keyframes draw-circle {
          from { stroke-dashoffset: 251.2; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes loader-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fade-in-tagline {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <div
        className={cn(
          "fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500",
          fadeout && "opacity-0 pointer-events-none"
        )}
        style={{ backgroundColor: bgColor }}
      >
        <div className={cn("absolute inset-0 -z-10", !isLight && "bg-background")} />

        <div className="relative w-48 h-48 flex flex-col items-center justify-center">
          {/* Circle */}
          <svg
            className="w-full h-full absolute"
            viewBox="0 0 100 100"
          >
            <circle
              stroke={circleColor}
              strokeWidth="2"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset="251.2"
              style={{ animation: "draw-circle 0.8s ease-out forwards" }}
            />
          </svg>

          {/* Initials */}
          <div
            className="flex items-center justify-center text-3xl font-headline"
            style={{ color: textColor }}
          >
            {initials.map((char, i) => (
              <span
                key={i}
                className="opacity-0 inline-block"
                style={{
                  animation: `loader-fade-in 0.4s ease-out ${0.2 + i * 0.1}s forwards`,
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <div
            className="absolute -bottom-10 w-full text-center text-sm tracking-widest opacity-0"
            style={{
              color: taglineColor,
              animation: "fade-in-tagline 0.5s ease-out 0.8s forwards",
            }}
          >
            {tagline}
          </div>
        </div>
      </div>
    </>
  );
}