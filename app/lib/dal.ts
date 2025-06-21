import { supabase } from "./supabase/client";

type User = {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const { data, error } = await supabase
            .from('users') // Note: this must be a public user table, not the auth.users table
            .select("id, email, created_at, updated_at")
            .eq('email', email)
            .single(); // Use .single() if you expect one result

        if (error) {
            console.error("Supabase error:", error.message);
            return null;
        }

        return data ?? null;
    } catch (e) {
        console.error("Unexpected error:", e);
        return null;
    }
};
