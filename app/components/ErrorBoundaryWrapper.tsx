'use client'

import { ErrorBoundary } from 'react-error-boundary'
import type { ReactNode, ReactElement } from 'react'

type Props = {
    children: ReactNode
    fallback?: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>
    resetKey?: unknown
    onReset?: () => void
    resetButton?: (resetErrorBoundary: () => void) => ReactElement
    resetButtonLabel?: string
}

export const ERROR_BOUNDARY_FALLBACK_BUTTON_DEFAULT_CLASSES =
    'mt-2 px-4 py-2 rounded bg-blue-500 text-white'

export default function ErrorBoundaryWrapper({
    children,
    fallback,
    resetKey,
    onReset,
    resetButton,
    resetButtonLabel
}: Props) {

    return (
        <ErrorBoundary
            FallbackComponent={
                fallback ||
                (({ error, resetErrorBoundary }) => {
                    const handleReset = () => {
                        resetErrorBoundary()
                    }

                    return (
                        <div className="p-4 text-center flex-1 flex flex-col justify-center items-center">
                            <p className="text-white">Something went wrong: {error.message}</p>
                            {resetButton ? (
                                resetButton(handleReset)
                            ) : (
                                <button
                                    onClick={handleReset}
                                    className={ERROR_BOUNDARY_FALLBACK_BUTTON_DEFAULT_CLASSES}
                                >
                                    {resetButtonLabel || "Try Again"}
                                </button>
                            )
                            }
                        </ div>
                    )
                })
            }
            resetKeys={[resetKey]}
            onReset={onReset}
        >
            {children}
        </ErrorBoundary>
    )
}
