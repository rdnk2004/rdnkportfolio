import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cinzel } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import LenisProvider from '@/components/lenis-provider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

// Optimized font loading - only load needed weights
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'], // Reduced from all weights
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Only load needed weights
  variable: '--font-playfair-display',
  display: 'swap',
  preload: true,
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'], // Only load needed weights
  variable: '--font-cinzel',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'RDNK | Built with Intent',
  description: 'The personal portfolio of Nikhil Krishna R D, a Data Analyst and Automation Specialist.',
  icons: {
    icon: '/image.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />

        {/* Removed hero image preload - causing warning since it's in lazy viewport */}
      </head>
      <body className={cn('font-body bg-background text-foreground antialiased', inter.variable, playfairDisplay.variable, cinzel.variable)} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
        >
          <LenisProvider>
            {children}
            <Toaster />
          </LenisProvider>
          {/* Defer analytics - only load in production to avoid 404s locally */}
          {process.env.NODE_ENV === 'production' && (
            <>
              <SpeedInsights />
              <Analytics />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
