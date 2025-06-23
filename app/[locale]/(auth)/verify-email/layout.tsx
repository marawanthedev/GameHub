'use client'
import { Suspense } from 'react'
import VerifyEmailSkeleton from './components/skeleton'
import ErrorBoundaryWrapper, { ERROR_BOUNDARY_FALLBACK_BUTTON_DEFAULT_CLASSES } from '@/app/components/ErrorBoundaryWrapper'
import { twMerge } from 'tailwind-merge'

export default function VerifyEmailLayout({ children }: { children: React.ReactNode }) {

    return (
        <Suspense fallback={<VerifyEmailSkeleton />}>
            <ErrorBoundaryWrapper resetButton={(reset) => (
                <button
                    onClick={() => {
                        reset()
                        window.location.href = '/'
                    }}
                    className={twMerge(ERROR_BOUNDARY_FALLBACK_BUTTON_DEFAULT_CLASSES, 'bg-black text-white')}
                >
                    Go to Home Page
                </button>
            )
            }>
                {children}
            </ErrorBoundaryWrapper >
        </Suspense >
    )
}
