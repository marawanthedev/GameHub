
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google'
import Script from "next/script";
import { GTM_ID } from "./lib/gtm";


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})


export const metadata = {
  title: 'GameHub - Premium Game Store',
  description: 'Premium Game Store',
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`


  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`antialiased font-sans`}
      >
        <header>
          <Script id="gtm" strategy="beforeInteractive">
            {gtmScript}
          </Script>
        </header>
        <Navbar />
        <Toaster richColors position="bottom-center" closeButton visibleToasts={1} />

        {/* GTM NoScript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {children}
        <Footer />

      </body>
    </html>
  );
}
