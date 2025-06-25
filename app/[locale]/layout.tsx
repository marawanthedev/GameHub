
import "../globals.css";
import { Navbar } from "../components/Navbar";
import { MemoizedFooter } from "../components/Footer";
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google'
import { GTMConsentHandler } from "../components/GtmConsentHandler";
import { ConsentBanner } from "../components/ConsentBanner";
import * as Sentry from '@sentry/nextjs';
import type { Metadata } from 'next';
import GlobalErrorListener from "../components/GlobalErrorListner";

export function generateMetadata(): Metadata {
  return {
    title: 'GameHub - Premium Game Store',
    description: 'Premium Game Store',
    other: {
      ...Sentry.getTraceData()
    }
  };
}
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})


export default function RootLayout({ children, params }: { children: React.ReactNode, params: { locale: string } }) {


  return (
    <html lang={params.locale} className={inter.variable}>
      <body
        className={`antialiased font-sans`}
      >
        <Toaster richColors position="bottom-center" closeButton visibleToasts={1} />
        <GTMConsentHandler />
        <ConsentBanner />
        {/* to allow error boundary takes remaining space to avoid buggy layout */}
        <div className="flex flex-col align-between min-h-screen">
          <Navbar locale={params.locale} />
          {children}
          <MemoizedFooter />
        </div>
        <GlobalErrorListener />
      </body>
    </html>
  );
}
