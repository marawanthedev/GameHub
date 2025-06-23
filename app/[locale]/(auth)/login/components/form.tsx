'use client'

import { useState, useCallback } from 'react'
import { GTM_EVENTS, GTM_EVENTS_CATEGORIES, trackEvent } from '@/app/lib/gtm'
import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export default function LoginForm() {
    const [errors, setErrors] = useState<{ email?: string[]; password?: string[] }>({})
    const [generalError, setGeneralError] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setGeneralError('')
        setErrors({})

        const form = event.currentTarget
        const formData = new FormData(form)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const validation = loginSchema.safeParse({ email, password })

        if (!validation.success) {
            const fieldErrors = validation.error.flatten().fieldErrors
            setErrors(fieldErrors)
            setGeneralError('Validation failed')
            trackEvent({
                event: GTM_EVENTS.LOGIN_FAILURE,
                category: GTM_EVENTS_CATEGORIES.AUTHENTICATION,
                reason: 'Validation failed',
            })
            return
        }

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()

        if (!res.ok || !data.success) {
            setGeneralError(data.error || 'Login failed')
            trackEvent({
                event: GTM_EVENTS.LOGIN_FAILURE,
                category: GTM_EVENTS_CATEGORIES.AUTHENTICATION,
                reason: data.error,
            })
            return
        }

        // ✅ Success
        trackEvent({
            event: GTM_EVENTS.LOGIN_SUCCESS,
            category: GTM_EVENTS_CATEGORIES.AUTHENTICATION,
        })

        window.location.href = '/games';
    }

    const handleLoginAttempt = useCallback(() => {
        trackEvent({
            event: GTM_EVENTS.LOGIN_ATTEMPT,
            category: GTM_EVENTS_CATEGORIES.AUTHENTICATION,
        })
    }, [])



    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm font-medium">
                {generalError && <p className="text-red-500 text-sm">{generalError}</p>}

                <div>
                    <label htmlFor="email" className="block text-gray-300">Email</label>
                    <input
                        name="email"
                        type="email"
                        className="mt-1 block w-full border border-[#30363d] bg-[#0d1117] text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.email && <p className="text-red-500 mt-1">{errors.email.join(', ')}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-gray-300">Password</label>
                    <input
                        name="password"
                        type="password"
                        className="mt-1 block w-full border border-[#30363d] bg-[#0d1117] text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.password && <p className="text-red-500 mt-1">{errors.password.join(', ')}</p>}
                </div>

                <button
                    type="submit"
                    onClick={handleLoginAttempt}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                    Sign in
                </button>
            </form>

            <p className="text-sm text-center text-gray-400">
                Don’t have an account?{' '}
                <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
            </p>
        </>
    )
}
