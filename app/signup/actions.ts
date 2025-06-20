'use server'

import { z } from 'zod'
import { supabase } from '../lib/supabase/client'
import { ActionResponse } from "../types/action"

// Zod schema for validation
export const signupSchema = z
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


        if (!validationOutCome.success) {
            return { success: false, errors: validationOutCome.error.flatten().fieldErrors, message: 'Faild To Signup', error: 'Faild to signup' }
        }

        const { email, password } = validationOutCome.data;

        const { error } = await supabase.auth.signUp({ email, password })
        if (error) {
            return { success: false, message: "Failed to signup", }
        }

        return { success: true, message: "Signedup successfully" };
    }
    catch (error) {
        return { success: false, message: 'An unexpected error occurred', error: 'An unexpected error occurred' }
    }

}