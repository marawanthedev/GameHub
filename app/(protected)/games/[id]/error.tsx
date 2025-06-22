'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#0d1117] text-center px-4">
            <h2 className="text-2xl font-semibold mb-4">{error.message || 'unkown error occured'}</h2>
            {/* <p className="mb-6 text-gray-400">{error.message} || We couldn't load the game details.</p> */}
            <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => reset()}
            >
                Try Again
            </button>
        </div>
    )
}
