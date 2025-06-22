import LogoutButton from './LogoutButton';
import { cookies } from 'next/headers';
import { JWT_SECRET } from '@/app/constants';
import { jwtVerify } from 'jose';
import Link from 'next/link';

export default async function NavBarActions() {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    let isAuthenticated = false;

    if (token) {
        const secret = new TextEncoder().encode(JWT_SECRET)
        jwtVerify(token, secret)
        isAuthenticated = true
    }

    return (
        <div className="flex items-center gap-3">
            {isAuthenticated ? (
                <LogoutButton />
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