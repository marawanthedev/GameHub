'use client'

import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export default function GlobalErrorListener() {
    const errorToastShown = useRef(false)
    const rejectionToastShown = useRef(false)

    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            console.error('Global error caught:', event.error || event.message)

            if (event.message?.includes('NEXT_REDIRECT')) return // ⛔️ Ignore internal Next.js redirects

            if (!errorToastShown.current) {
                toast.error(`An unexpected error occurred. Please try again.`)
                errorToastShown.current = true
            }
        }

        const handlePromiseRejection = (event: PromiseRejectionEvent) => {
            console.error('Unhandled promise rejection:', event.reason)

            if (!rejectionToastShown.current) {
                toast.error('Something went wrong. Please refresh or try again.')
                rejectionToastShown.current = true
            }
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
