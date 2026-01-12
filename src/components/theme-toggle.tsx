"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [targetTheme, setTargetTheme] = React.useState<"light" | "dark">("dark")
  const overlayRef = React.useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    if (isAnimating) return

    const newTheme = resolvedTheme === "light" ? "dark" : "light"
    setTargetTheme(newTheme)
    setIsAnimating(true)

    // Use requestAnimationFrame to ensure animation starts before theme change
    requestAnimationFrame(() => {
      // Change theme when wipe covers the center
      setTimeout(() => {
        setTheme(newTheme)
      }, 180)

      // Animation complete
      setTimeout(() => {
        setIsAnimating(false)
      }, 400)
    })
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        disabled={isAnimating}
        className="relative"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Cinematic wipe overlay - always mounted for instant response */}
      <div
        ref={overlayRef}
        className={`
          fixed inset-0 z-[9999] pointer-events-none
          ${isAnimating ? 'animate-wipe-across' : 'opacity-0 -translate-x-full'}
        `}
        style={{
          background: targetTheme === "dark"
            ? "linear-gradient(90deg, transparent 0%, hsl(0 0% 6%) 5%, hsl(0 0% 6%) 95%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, hsl(30 15% 97%) 5%, hsl(30 15% 97%) 95%, transparent 100%)",
        }}
      />

      <style jsx global>{`
        @keyframes wipe-across {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-wipe-across {
          animation: wipe-across 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform;
        }
      `}</style>
    </>
  )
}
