'use client'

import { loginAction } from '../actions'
import { useFormState } from 'react-dom'
import { redirect } from 'next/navigation'
import { ActionResponse } from '@/app/types/action'

export default function LoginForm() {
    const [state, formAction] = useFormState<ActionResponse, FormData>(
        (_prevState, formData) => loginAction(formData),
        { success: false, message: '' }
    )

    if (state.success) {
        redirect('/games')
    }

    return (
        <>
            <form action={formAction} className="space-y-4 text-sm font-medium">
                <div>
                    <label htmlFor="email" className="block text-gray-300">Email</label>
                    <input
                        name="email"
                        type="email"
                        className="mt-1 block w-full border border-[#30363d] bg-[#0d1117] text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {state.errors?.email && (
                        <p className="text-sm text-red-500 mt-1">{state.errors.email}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-gray-300">Password</label>
                    <input
                        name="password"
                        type="password"
                        className="mt-1 block w-full border border-[#30363d] bg-[#0d1117] text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {state.errors?.password && (
                        <p className="text-sm text-red-500 mt-1">{state.errors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
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
