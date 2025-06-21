import { supabase } from "./supabase/client";
// { email: string, password: string, id: string }
export const getUserByEmail = async (email: string): Promise<null | any> => {

    try {
        const { data, error } = await supabase
            .from('users') // ← This does NOT work for auth users
            .select("id,email,created_at,updated_at")
            .eq('email', email)


        if (!data || data.length === 0) {
            return null
        }

        if (!error) {
            return null
        }

        return data;
    } catch (e) {
        console.error(e)
        return null
    }
}