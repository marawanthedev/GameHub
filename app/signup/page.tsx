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
        <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-[#161b22] shadow-xl rounded-2xl p-8 space-y-6 border border-[#30363d]">
                <h2 className="text-3xl font-semibold text-center text-white">
                    {loading ? (
                        <div className="h-8 w-2/3 mx-auto bg-[#21262d] rounded animate-pulse" />
                    ) : (
                        'Create your account'
                    )}
                </h2>

                {loading ? (
                    <div className="space-y-4 animate-pulse text-sm font-medium">
                        {[...Array(3)].map((_, i) => (
                            <div key={i}>
                                <div className="h-4 w-24 bg-[#21262d] rounded mb-2" />
                                <div className="h-10 bg-[#21262d] rounded" />
                            </div>
                        ))}
                        <div className="h-10 bg-[#30363d] rounded" />
                    </div>
                ) : (
                    <>
                        <form action={formAction} className="space-y-4 text-sm font-medium">
                            <div>
                                <label htmlFor="email" className="block text-gray-300">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    className="mt-1 block w-full border border-[#30363d] bg-[#0d1117] text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {state?.errors?.email?.[0] && (
                                    <p className="text-sm text-red-500 mt-1">{state.errors.email[0]}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-gray-300">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="mt-1 block w-full border border-[#30363d] bg-[#0d1117] text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {state?.errors?.password?.[0] && (
                                    <p className="text-sm text-red-500 mt-1">{state.errors.password[0]}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-gray-300">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    className="mt-1 block w-full border border-[#30363d] bg-[#0d1117] text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {state?.errors?.confirmPassword?.[0] && (
                                    <p className="text-sm text-red-500 mt-1">{state.errors.confirmPassword[0]}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                            >
                                Sign up
                            </button>
                        </form>

                        <p className="text-sm text-center text-gray-400">
                            Already have an account?{' '}
                            <a href="/login" className="text-blue-500 hover:underline">Sign in</a>
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}
