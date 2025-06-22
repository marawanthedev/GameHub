'use client'
import { ActionResponse } from "@/app/types/action"
import { useFormState } from "react-dom"
import { signupAction } from "../../../actions/auth/signup"
import { redirect } from "next/navigation"
import { GTM_EVENTS, GTM_EVENTS_CATEGORIES, trackEvent } from "@/app/lib/gtm"
import { useCallback, useEffect } from "react"


export default function SignUpForm() {
    const [state, formAction] = useFormState<ActionResponse, FormData>(
        async (_prevState, formData) => signupAction(formData),
        { success: false, message: '' }
    )

    useEffect(() => {

        if (!state.success) {
            // can include email but requires encryption to make sure we dont get sued :)
            trackEvent({
                event: GTM_EVENTS.SIGNUP_FAILURE,
                category: GTM_EVENTS_CATEGORIES.AUTHENTICATION,
                reason: state.message
            })
        }

        if (state.success) {
            trackEvent({
                event: GTM_EVENTS.SIGNUP_SUCCESS,
                category: GTM_EVENTS_CATEGORIES.AUTHENTICATION,
            })

            redirect('/confirm-email')
        }

    }, [state.message, state.success])


    const handleSignUpAttempt = useCallback(() => {
        trackEvent({
            event: GTM_EVENTS.SIGNUP_ATTEMPT,
            category: GTM_EVENTS_CATEGORIES.AUTHENTICATION,
        });
    }, [])

    return <>
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
                onClick={handleSignUpAttempt} // can still submit form bcs we dont prevent default
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
}