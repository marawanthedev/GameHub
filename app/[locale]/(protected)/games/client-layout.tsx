'use client'

import { useState, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function GamesClientLayout({ children }: { children: ReactNode }) {
    const [client] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}
