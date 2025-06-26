'use client'

import { useState, useCallback } from 'react'
import { Loader } from 'lucide-react'
import { GTM_EVENTS, GTM_EVENTS_CATEGORIES, trackEvent } from '@/app/lib/gtm'
import { API_BASE_URL } from '@/app/constants'
import { signupSchema } from '@/app/schema/signup'



export default function SignUpForm({ locale }: { locale: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ email?: string[], password?: string[], confirmPassword?: string[] }>({})
    const [generalError, setGeneralError] = useState('')
    const callbackUrl = `/${locale}/confirm-email`

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})
        setGeneralError('')

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        const validation = signupSchema.safeParse({ email, password, confirmPassword })

        if (!validation.success) {
            const fieldErrors = validation.error.flatten().fieldErrors
            setErrors(fieldErrors)
            setGeneralError('Validation failed')

            trackEvent({
                event: GTM_EVENTS.SIGNUP_FAILURE,
                category: GTM_EVENTS_CATEGORIES.AUTHENTICATION,
                reason: 'Validation failed'
            })
            setIsLoading(false)
            return
        }

        try {
            const res = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-locale': locale },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok || !data.success) {
                setGeneralError(data.error || 'Signup failed')
                trackEvent({
                    event: GTM_EVENTS.SIGNUP_FAILURE,
                    category: GTM_EVENTS_CATEGORIES.AUTHENTICATION,
                    reason: data.error,
                })
                setIsLoading(false)
                return
            }

            trackEvent({
                event: GTM_EVENTS.SIGNUP_SUCCESS,
                category: GTM_EVENTS_CATEGORIES.AUTHENTICATION,
            })

            window.location.href = callbackUrl
        } catch (err) {
            console.error((err as Error).message)
            setGeneralError('Unexpected error occurred')
            setIsLoading(false)
        }
    }

    const handleSignUpAttempt = useCallback(() => {
        trackEvent({
            event: GTM_EVENTS.SIGNUP_ATTEMPT,
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
                        required
                        className="mt-1 block w-full border border-[#30363d] bg-[#0d1117] text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.email && <p className="text-red-500 mt-1">{errors.email.join(', ')}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-gray-300">Password</label>
                    <input
                        name="password"
                        type="password"
                        required
                        className="mt-1 block w-full border border-[#30363d] bg-[#0d1117] text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.password && <p className="text-red-500 mt-1">{errors.password.join(', ')}</p>}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-gray-300">Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        required
                        className="mt-1 block w-full border border-[#30363d] bg-[#0d1117] text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.confirmPassword && <p className="text-red-500 mt-1">{errors.confirmPassword.join(', ')}</p>}
                </div>

                <button
                    type="submit"
                    onClick={handleSignUpAttempt}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex justify-center items-center gap-2"
                    disabled={isLoading}
                >
                    {isLoading && <Loader className="animate-spin h-5 w-5 text-white" />}
                    {isLoading ? 'Signing up...' : 'Sign up'}
                </button>
            </form>

            <p className="text-sm text-center text-gray-400">
                Already have an account?{' '}
                <a href="/login" className="text-blue-500 hover:underline">Sign in</a>
            </p>
        </>
    )
}
