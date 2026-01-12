/**
 * Design Tokens - Visual Style Standards
 * 
 * This file defines the unified visual language for the portfolio.
 * Use these tokens consistently across all components.
 * 
 * ============================================
 * CONFLICTS IDENTIFIED & RESOLVED
 * ============================================
 * 
 * BORDER RADIUS (was: rounded-lg, rounded-xl, rounded-md, rounded-2xl)
 * → Now: rounded-lg (default), rounded-xl (modals/featured)
 * 
 * SHADOWS (was: shadow-sm, shadow-md, shadow-lg, shadow-2xl, shadow-primary/5, shadow-primary/10)
 * → Now: shadow-sm (rest), shadow-lg shadow-primary/5 (hover)
 * 
 * BACKGROUND OPACITY (was: /40, /50, /60, /70, /80)
 * → Now: /50 (base cards), /60 (hover), /80 (overlays)
 * 
 * BORDER OPACITY (was: white/5, white/10, border/50, border/60, secondary/20)
 * → Now: border/40 (rest), primary/30 (hover)
 * 
 * ============================================
 * DESIGN TOKEN REFERENCE
 * ============================================
 */

// ─────────────────────────────────────────────
// ACCENT COLORS
// ─────────────────────────────────────────────

export const ACCENTS = {
    /** Primary accent - for borders, highlights, interactive states */
    primary: "primary",
    /** Secondary accent - for badges, tags, subtle emphasis */
    secondary: "secondary",
} as const;

// Usage:
// - Primary: text-primary, border-primary/30, bg-primary/10
// - Secondary: text-secondary, bg-secondary/15, border-secondary/20

// ─────────────────────────────────────────────
// BORDER RADIUS
// ─────────────────────────────────────────────

export const RADIUS = {
    /** Small elements: badges, tags, buttons */
    sm: "rounded-md",
    /** Default cards, inputs */
    default: "rounded-lg",
    /** Featured cards, modals, large containers */
    lg: "rounded-xl",
} as const;

// ─────────────────────────────────────────────
// SHADOWS
// ─────────────────────────────────────────────

export const SHADOWS = {
    /** Rest state - very subtle */
    rest: "shadow-sm",
    /** Hover state - elevated with primary tint */
    hover: "shadow-lg shadow-primary/5",
    /** Modal/overlay - strong elevation */
    elevated: "shadow-2xl",
} as const;

// ─────────────────────────────────────────────
// BACKGROUND OPACITY (for glass/blur effects)
// ─────────────────────────────────────────────

export const BG_OPACITY = {
    /** Base card background */
    card: "bg-card/50",
    /** Hover state */
    cardHover: "bg-card/60",
    /** Overlays and backdrops */
    overlay: "bg-background/80",
} as const;

// ─────────────────────────────────────────────
// BORDER STYLES
// ─────────────────────────────────────────────

export const BORDERS = {
    /** Default border */
    default: "border border-border/40",
    /** Hover border - primary accent */
    hover: "hover:border-primary/30",
    /** Active/focus border */
    active: "border-primary/50",
} as const;

// ─────────────────────────────────────────────
// COMPLETE CARD PRESETS
// ─────────────────────────────────────────────

export const CARD_STYLES = {
    /** Standard card - use for most content cards */
    standard: `
    rounded-lg 
    border border-border/40 
    bg-card/50 
    backdrop-blur-sm 
    shadow-sm 
    transition-all duration-300 
    hover:border-primary/30 
    hover:shadow-lg hover:shadow-primary/5
  `,

    /** Featured card - for awards, highlighted content */
    featured: `
    rounded-xl 
    border border-border/40 
    bg-card/50 
    backdrop-blur-md 
    shadow-sm 
    transition-all duration-300 
    hover:border-primary/30 
    hover:shadow-lg hover:shadow-primary/5 
    hover:-translate-y-1
  `,

    /** Subtle card - for dense lists, credentials */
    subtle: `
    rounded-lg 
    border border-border/30 
    bg-card/40 
    transition-all duration-300 
    hover:bg-card/60 
    hover:border-primary/20
  `,
} as const;

// ─────────────────────────────────────────────
// TAILWIND CLASS REFERENCE (Copy-Paste Ready)
// ─────────────────────────────────────────────

/*
STANDARD CARD:
className="rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"

FEATURED CARD:
className="rounded-xl border border-border/40 bg-card/50 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"

SUBTLE CARD:
className="rounded-lg border border-border/30 bg-card/40 transition-all duration-300 hover:bg-card/60 hover:border-primary/20"

BADGE/TAG:
className="rounded-md px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20"

SECONDARY BADGE:
className="rounded-md px-2 py-0.5 text-xs font-medium bg-secondary/15 text-secondary border border-secondary/20"
*/
