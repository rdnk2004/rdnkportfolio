
"use client";

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface LoaderProps {
  onFinished: () => void;
}

const initials = ["R", ".", "D", ".", "N", ".", "K"];

export default function Loader({ onFinished }: LoaderProps) {
  const [fadeout, setFadeout] = useState(false);
  const [textColor, setTextColor] = useState('#FFD6A5'); // Default to dark mode color
  const { theme } = useTheme();

  useEffect(() => {
    // Set the correct color on the client after mount
    setTextColor(theme === 'light' ? '#0D1452' : '#FFD6A5');

    const timer = setTimeout(() => {
      setFadeout(true);
    }, 2000); // Start fade out after 2s

    const finishTimer = setTimeout(() => {
      onFinished();
    }, 2500); // Fully finished after 2.5s

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinished, theme]);

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500",
      fadeout ? "opacity-0" : "opacity-100"
    )}>
      <div className="relative w-48 h-48">
        <svg className="w-full h-full" viewBox="0 0 100 100">
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
            style={{ animation: 'draw-circle 1s ease-out forwards' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-headline" style={{ color: textColor }}>
          {initials.map((char, i) => (
            <span
              key={i}
              className="opacity-0"
              style={{ animation: `fade-in 0.5s ease-out ${0.8 + i * 0.15}s forwards` }}
            >
              {char}
            </span>
          ))}
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
      `}</style>
    </div>
  );
}
