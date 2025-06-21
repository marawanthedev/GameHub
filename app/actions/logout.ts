'use server'

import { redirect } from 'next/navigation'
import { supabaseServerAction } from '../lib/supabase/server'

export async function logoutAction() {
    await supabaseServerAction.auth.signOut()
    redirect("/")
}
