'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

export default function GlobalErrorListener() {
    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            console.error('Global error caught:', event.error || event.message)
            toast.error('An unexpected error occurred. Please try again.')
        }

        const handlePromiseRejection = (event: PromiseRejectionEvent) => {
            console.error('Unhandled promise rejection:', event.reason)
            toast.error('Something went wrong. Please refresh or try again.')
        }

        window.addEventListener('error', handleError)
        window.addEventListener('unhandledrejection', handlePromiseRejection)

        return () => {
            window.removeEventListener('error', handleError)
            window.removeEventListener('unhandledrejection', handlePromiseRejection)
        }
    }, [])

    return null
}
