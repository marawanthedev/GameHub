
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google'


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

  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`antialiased font-sans`}
      >
        <Navbar />
        <Toaster richColors position="bottom-center" closeButton visibleToasts={1} />
        {children}
        <Footer />

      </body>
    </html>
  );
}
