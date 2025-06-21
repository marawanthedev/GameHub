
import Link from 'next/link';
import { logoutAction } from '../actions/logout';
import { supabaseServerAction } from '../lib/supabase/server';

export default async function NavBarActions() {
    const { data: { session } } = await supabaseServerAction.auth.getSession()
    const user = session?.user;

    return (
        <div className="flex items-center gap-3">
            {user ? (
                <>
                    <form action={logoutAction}>
                        <button
                            type="submit"
                            className="text-sm px-4 py-2 bg-[#21262d] text-white rounded-lg border border-[#30363d] hover:bg-[#30363d] transition"
                        >
                            Logout
                        </button>
                    </form>
                </>
            ) : (
                <>
                    <Link
                        href="/login"
                        className="text-sm px-4 py-2 text-white hover:text-blue-400 transition"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Sign up
                    </Link>
                </>
            )}
        </div>
    );
}
