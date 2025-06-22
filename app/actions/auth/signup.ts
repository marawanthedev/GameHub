'use server'

import { z } from 'zod'
import { ActionResponse } from '../../types/action'
import { API_BASE_URL } from '@/app/constants'
import { SuccessfulApiResponse, UnSuccessfulApiReponse } from '@/app/types/api'

const signupSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    })

type AuthRequestBody = {
    email: string
    password: string
}


export const signupAction = async (
    formData: FormData
): Promise<ActionResponse> => {
    try {
        const validationOutcome = signupSchema.safeParse(
            Object.fromEntries(formData)
        )

        if (!validationOutcome.success) {
            return {
                success: false,
                message: 'Validation Failed',
                error: validationOutcome.error.message,
            }
        }

        const { email, password } = validationOutcome.data

        const body: AuthRequestBody = { email, password }

        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            credentials: 'include',
            cache: 'no-store',
        })

        const data: SuccessfulApiResponse | UnSuccessfulApiReponse = await response.json()

        if (!data.success) {
            return {
                success: false,
                message: (data as UnSuccessfulApiReponse).error || 'Signup failed',
                error: (data as UnSuccessfulApiReponse).error,
            }
        }

        return {
            success: true,
            message: 'Signed up successfully',
        }
    } catch (error) {
        return {
            success: false,
            message: 'An unexpected error occurred',
            error: (error as Error).message,
        }
    }
}
