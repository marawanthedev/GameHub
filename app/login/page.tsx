'use client'

import { useFormState } from 'react-dom'
import { useEffect, useState } from 'react'
import { loginAction } from './actions'

export default function LoginPage() {
    const [loading, setLoading] = useState(true)
    const [state, formAction] = useFormState<any, FormData>(
        loginAction,
        { errors: {} }
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
                        <div className="h-6 w-1/2 mx-auto bg-gray-200 rounded animate-pulse" />
                    ) : (
                        'Welcome back'
                    )}
                </h2>

                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        <div>
                            <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                            <div className="h-10 bg-gray-200 rounded" />
                        </div>
                        <div>
                            <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                            <div className="h-10 bg-gray-200 rounded" />
                        </div>
                        <div className="h-10 bg-gray-300 rounded" />
                    </div>
                ) : (
                    <>
                        <form action={formAction} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {state.errors?.email && (
                                    <p className="text-sm text-red-500 mt-1">{state.errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {state.errors?.password && (
                                    <p className="text-sm text-red-500 mt-1">{state.errors.password}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Sign in
                            </button>
                        </form>

                        <p className="text-sm text-center text-gray-500">
                            Don’t have an account?{' '}
                            <a href="/signup" className="text-blue-600 hover:underline">
                                Sign up
                            </a>
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}
