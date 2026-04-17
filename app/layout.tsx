import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ConvexClientProvider from '@/components/ConvexClientProvider';
import AuthSyncProvider from '@/components/auth/AuthSyncProvider';
import { ClerkProvider, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Souled Store Clone',
  description: 'Indian pop-culture fashion brand clone',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: '#111827' } }}>
      <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
        <body suppressHydrationWarning className="font-sans antialiased min-h-screen flex flex-col text-foreground bg-background">
          <ThemeProvider>
            <ConvexClientProvider>
              <AuthSyncProvider>
                <AnnouncementBar />
                <TooltipProvider>
                  <Navbar />

                  <main className="flex-1">
                    <ClerkLoading>
                      <div className="h-[60vh] flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-secondary border-t-foreground rounded-full animate-spin" />
                      </div>
                    </ClerkLoading>
                    <ClerkLoaded>
                      {children}
                    </ClerkLoaded>
                  </main>
                  <Footer />
                  <Toaster position="bottom-right" richColors />
                </TooltipProvider>
              </AuthSyncProvider>
            </ConvexClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
