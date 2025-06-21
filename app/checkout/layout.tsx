import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Checkout - GameHub',
    description: 'Securely complete your purchase at GameHub.',
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
