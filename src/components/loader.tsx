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
  const [textColor, setTextColor] = useState("#FFD6A5"); // dark mode default
  const [taglineColor, setTaglineColor] = useState("#FFD6A5");
  const [circleColor, setCircleColor] = useState("currentColor");
  const [bgColor, setBgColor] = useState("bg-background");
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Set theme-aware colors on client
    if (theme === "light") {
      setTextColor("#1B2A4A");
      setTaglineColor("#6B7C99");
      setCircleColor("#E6C768"); // Soft Luminous Gold for natural glow
      setBgColor("#FAFBFF");
    } else {
      setTextColor("#FFD6A5");
      setTaglineColor("#FFD6A5"); // Keep same as text for dark mode or adjust if needed
      setCircleColor("currentColor"); // Default primary behavior for dark
      setBgColor("bg-background");
    }

    const fadeTimer = setTimeout(() => {
      setFadeout(true);
    }, 3500); // start fade out

    const finishTimer = setTimeout(() => {
      onFinished();
    }, 4000); // loader fully done

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinished, theme, mounted]);

  // Prevent hydration mismatch by returning null or consistent server-render state until mounted.
  // Since this is a loader, we render a default state that matches the server (usually dark/default).
  const effectiveTheme = mounted ? theme : undefined;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500",
        fadeout ? "opacity-0" : "opacity-100"
      )}
      style={{ backgroundColor: effectiveTheme === "light" ? bgColor : undefined }}
    >
      {/* Use a separate div for dark mode background class if not overridden, or just rely on inline style for light mode */}
      <div className={cn("absolute inset-0 -z-10", effectiveTheme !== "light" && "bg-background")} />

      <div className="relative w-48 h-48 flex flex-col items-center justify-center">
        {/* Circle */}
        <svg className="w-full h-full absolute" viewBox="0 0 100 100">
          <circle
            className={effectiveTheme !== "light" ? "text-primary" : ""}
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
              className="opacity-0"
              style={{
                animation: `fade-in 0.4s ease-out ${0.2 + i * 0.1}s forwards`,
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
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
