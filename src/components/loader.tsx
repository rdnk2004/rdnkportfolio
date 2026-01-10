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
  const [fadeout, setFadeout] = useState(false);
  const [textColor, setTextColor] = useState("#FFD6A5"); // dark mode default
  const { theme } = useTheme();

  useEffect(() => {
    // Set theme-aware text color on client
    setTextColor(theme === "light" ? "#0D1452" : "#FFD6A5");

    const fadeTimer = setTimeout(() => {
      setFadeout(true);
    }, 3000); // start fade out (gives tagline ~1.2s visibility)

    const finishTimer = setTimeout(() => {
      onFinished();
    }, 3500); // loader fully done

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinished, theme]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500",
        fadeout ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="relative w-48 h-48 flex flex-col items-center justify-center">
        {/* Circle */}
        <svg className="w-full h-full absolute" viewBox="0 0 100 100">
          <circle
            className="text-primary"
            stroke="currentColor"
            strokeWidth="2"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeDasharray="251.2"
            strokeDashoffset="251.2"
            style={{ animation: "draw-circle 1s ease-out forwards" }}
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
              className="opacity-0"
              style={{
                animation: `fade-in 0.5s ease-out ${0.8 + i * 0.15}s forwards`,
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
            color: textColor,
            animation: "fade-in-tagline 0.6s ease-out 1.8s forwards",
          }}
        >
          {tagline}
        </div>
      </div>

      <style jsx>{`
        @keyframes draw-circle {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fade-in {
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-tagline {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 0.75;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
