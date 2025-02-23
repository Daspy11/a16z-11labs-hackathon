import type { Metadata } from 'next';

import { getApiKey } from '@/app/actions';
import { AppSidebar } from '@/components/app-sidebar';
import { Byline } from '@/components/by-line';
import { KeyProvider } from '@/components/key-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Card } from '@/components/ui/card';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


export const metadata: Metadata = {
  title: {
    default: 'ElevenLabs Next.js Playground',
    template: '%s | ElevenLabs Next.js',
  },
  icons: {
    icon: '/favicon.png',
  },
  metadataBase: new URL('https://elevenlabs-playground.vercel.app'),
  description: 'A Next.JS playground to explore ElevenLabs capabilities.',
  openGraph: {
    title: 'ElevenLabs Next.js Playground',
    description: 'A playground to explore ElevenLabs capabilities.',
    images: [`/api/og?title=ElevenLabs Next.js Playground`],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const apiKeyResult = await getApiKey();
  const apiKey = apiKeyResult.ok ? apiKeyResult.value : null;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
          disableTransitionOnChange
        >
          <KeyProvider apiKey={apiKey}>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="background-gradient">
                <header className="relative flex h-[60px] shrink-0 items-center justify-center bg-white ">
                  <SidebarTrigger className="absolute left-3" />
                </header>
                {children}
              </SidebarInset>
            </SidebarProvider>
          </KeyProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
