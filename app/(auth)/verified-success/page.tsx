'use client'

import { useRouter } from 'next/navigation'

export default function VerifiedSuccessPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
            <h1 className="text-3xl font-bold mb-4">Email Verified Successfully ✅</h1>
            <p className="text-lg mb-6 text-gray-300">Your account is now verified. You can start exploring games!</p>
            <button
                onClick={() => router.push('/games')}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg shadow"
            >
                Go to Games
            </button>
        </div>
    )
}
