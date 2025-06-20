'use client'

import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { signupAction } from './actions'
import { ActionResponse } from '../types/action'

export default function SignupPage() {
    const [loading, setLoading] = useState(true)

    const [state, formAction] = useFormState<ActionResponse, FormData>(
        async (_prevState, formData) => signupAction(formData),
        { success: false, message: '' }
    )

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white shadow-md rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 text-center">
                    {loading ? (
                        <div className="h-6 w-2/3 mx-auto bg-gray-200 rounded animate-pulse" />
                    ) : (
                        'Create your account'
                    )}
                </h2>

                {loading ? (
                    <div className="space-y-4 animate-pulse text-black text-sm font-medium">
                        {[...Array(3)].map((_, i) => (
                            <div key={i}>
                                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                                <div className="h-10 bg-gray-200 rounded" />
                            </div>
                        ))}
                        <div className="h-10 bg-blue-300 rounded" />
                    </div>
                ) : (
                    <>
                        <form action={formAction} className="space-y-4 text-black text-sm font-medium">
                            <div>
                                <label htmlFor="email" className="block">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {state?.errors?.email?.[0] && (
                                    <p className="text-sm text-red-500 mt-1">{state.errors.email[0]}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {state?.errors?.password?.[0] && (
                                    <p className="text-sm text-red-500 mt-1">{state.errors.password[0]}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {state?.errors?.confirmPassword?.[0] && (
                                    <p className="text-sm text-red-500 mt-1">{state.errors.confirmPassword[0]}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Sign up
                            </button>
                        </form>

                        <p className="text-sm text-center text-gray-500">
                            Already have an account?{' '}
                            <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}
