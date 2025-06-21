import type { Metadata } from 'next'
import GamesClientLayout from './client-layout'

export const metadata: Metadata = {
    title: 'Games - GameHub',
    description: 'Explore our premium collection of video games. Filter by platform, genre, and more.',
    openGraph: {
        title: 'Games - GameHub',
        description: 'Browse and discover premium video games from various platforms.',
        url: 'https://gamehub.marwan-mostafa.com/games',
        siteName: 'GameHub',
        type: 'website',
    },
}

export default function GamesLayout({ children }: { children: React.ReactNode }) {
    return <GamesClientLayout>{children}</GamesClientLayout>
}
