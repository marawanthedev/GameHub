'use server'

import { z } from 'zod'
import { ActionResponse } from "../../types/action"
import { getUserByEmail } from '../../lib/dal'
import { supabaseServerAction } from '../../lib/supabase/server'

// Zod schema for validation
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


export const signupAction = async (formData: FormData): Promise<ActionResponse> => {
    try {
        const validationOutCome = signupSchema.safeParse(Object.fromEntries(formData))

        const existingUser = await getUserByEmail(formData.get('email') as string)


        if (existingUser) {
            return { success: false, message: "User Already exists" }
        }

        if (!validationOutCome.success) {
            return { success: false, message: "Validation Failed", error: validationOutCome.error.message }
        }

        const { email, password } = validationOutCome.data;

        const { error } = await supabaseServerAction.auth.signUp({ email, password })

        if (error) {
            return {
                success: false, message: (error as Error).message, error: (error as Error).message
            }
        }

        return { success: true, message: "Signedup successfully" };
    }
    catch (error) {
        return { success: false, message: 'An unexpected error occurred', error: (error as Error).message }
    }

}