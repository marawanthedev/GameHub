'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthCallbackPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [confirmed, setConfirmed] = useState(false)

    useEffect(() => {
        const code = searchParams.get('code')

        if (code) {
            setConfirmed(true)
        }
    }, [searchParams])

    return (
        <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center px-4 text-white text-center">
            {confirmed ? (
                <>
                    <h1 className="text-2xl font-semibold mb-2">Your email has been confirmed! ✅</h1>
                    <p className="text-gray-400 mb-6">You can now log in to your account.</p>
                    <button
                        onClick={() => router.push('/login')}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition"
                    >
                        Go to Login
                    </button>
                </>
            ) : (
                <p className="text-lg text-gray-400">Verifying confirmation token...</p>
            )}
        </div>
    )
}
