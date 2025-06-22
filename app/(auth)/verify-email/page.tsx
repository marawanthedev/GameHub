// app/verify-email/page.tsx
'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function VerifyEmailPage() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const router = useRouter()
    // Prevents double fetch on dev (React Strict Mode)
    const hasFetched = useRef(false)

    useEffect(() => {
        if (!token || hasFetched.current) return

        hasFetched.current = true

        const verify = async () => {
            try {
                const res = await fetch(`/api/auth/verify-email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token }),
                })
                if (res.ok) {
                    setStatus('success')
                    setTimeout(() => router.push('/login'), 1000)
                } else {
                    setStatus('error')
                }
            } catch {
                setStatus('error')
            }
        }

        verify()
    }, [token])

    return (
        <div className="min-h-screen flex items-center justify-center text-white">
            {status === 'loading' && <p>Verifying your email...</p>}
            {status === 'success' && <p>Email verified ✅ Redirecting to login...</p>}
            {status === 'error' && <p>Verification failed ❌ Try signing up again.</p>}
        </div>
    )
}
