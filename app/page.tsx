import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GameHub - Premium Game Store',
  description: 'Discover and buy premium video games for all platforms. Best deals, new releases, and classic titles.',
  openGraph: {
    title: 'GameHub - Premium Game Store',
    description: 'Browse our premium selection of games. PlayStation, Xbox, PC, and more.',
    url: 'https://gamehub.marwan-mostafa.com/',
    siteName: 'GameHub',
    type: 'website',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GameHub Homepage Preview',
      },
    ],
  },
}

export default function Home() {
  return (
    <main
      className="min-h-screen bg-[#0d1117] text-white font-sans px-4 pt-16 pb-20"
      aria-label="Homepage"
    >
      <section
        className="max-w-7xl mx-auto text-center py-20"
        aria-labelledby="homepage-heading"
      >
        <h1 id="homepage-heading" className="text-4xl sm:text-5xl font-bold mb-6">
          Discover and Buy the Best Games
        </h1>

        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Explore a curated collection of top-tier games. Track your favorites, compare platforms, and check out securely.
        </p>

        <a
          href="/games"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0d1117]"
          role="link"
          aria-label="Browse available games"
        >
          Browse Games
        </a>
      </section>
    </main>
  );
}
