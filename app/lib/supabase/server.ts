import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const supabaseServerAction = createServerActionClient({ cookies }) 
