import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import LenisProvider from '@/components/lenis-provider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'RDNK | Built with Intent',
  description: 'The personal portfolio of Nikhil Krishna R D, an ML Engineer and Automation Specialist.',
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
        {/* Preconnect and Load Fonts asynchronously */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="https://vercel.live" />
      </head>
      <body className="font-body bg-background text-foreground antialiased" suppressHydrationWarning>
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
