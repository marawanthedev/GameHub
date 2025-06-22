import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Your Cart - GameHub',
    description: 'View and manage the items in your GameHub cart.',
    robots: {
        index: false, // Prevents search engines from indexing this page
        follow: false,
    },
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
