'use client'

import { useLocale } from '@/app/hooks/useLocale'
import { normalizeHrefWithLocale } from '@/app/util/normalizeHref'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function VerifyEmailPage() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const router = useRouter()
    // Prevents double fetch on dev (React Strict Mode)
    const hasFetched = useRef(false)
    const locale = useLocale()
    const loginNormalizedHref = normalizeHrefWithLocale('/login', locale)

    if (!token) {
        throw new Error('Couldnt find verification token')
    }

    useEffect(() => {
        if (hasFetched.current) return

        hasFetched.current = true

        const verify = async () => {
            try {
                const res = await fetch(`/api/auth/verify-email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-locale': locale },
                    body: JSON.stringify({ token }),
                })

                if (res.ok) {
                    setStatus('success')
                    router.replace(loginNormalizedHref)
                } else {
                    setStatus('error')
                }
            } catch {
                setStatus('error')
            }
        }

        verify()
    }, [token, router, locale])

    return (
        <div className="min-h-screen flex items-center justify-center text-white">
            {status === 'loading' && <p>Verifying your email...</p>}
            {status === 'success' && <p>Email verified ✅ Redirecting to login...</p>}
            {status === 'error' && <p>Verification failed ❌ Try signing up again.</p>}
        </div>
    )
}
