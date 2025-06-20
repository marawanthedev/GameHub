'use server'

import { z } from 'zod'
import { supabase } from '../lib/supabase/client'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

/**
 * Action to handle user login
 * @param formData - Form data containing email and password
 * @returns An object indicating success or failure, with appropriate messages and errors
 */
export const loginAction = async (formData: FormData): Promise<{ success: boolean; message: string; errors?: Record<string, string[]>; error?: string }> => {
    try {
        const validationOutcome = loginSchema.safeParse(Object.fromEntries(formData));

        if (!validationOutcome.success) {
            return { success: false, errors: validationOutcome.error.flatten().fieldErrors, message: 'Failed to login', error: 'Failed to login' };
        }

        const { email, password } = validationOutcome.data;

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            return { success: false, message: "Failed to login", error: error.message };
        }

        return { success: true, message: "Logged in successfully" };
    } catch (error) {
        return { success: false, message: 'An unexpected error occurred', error: 'An unexpected error occurred' };
    }
}