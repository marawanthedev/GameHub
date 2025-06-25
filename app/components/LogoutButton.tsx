'use client'

import { useRouter } from 'next/navigation'
import { useCartStore } from '../stores/cart';
import { useState, useTransition } from 'react';

export default function LogoutButton() {
    const router = useRouter()
    const clearCart = useCartStore((state) => state.clearCart);

    const [, startTransition] = useTransition();
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)

        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        })


        startTransition(() => {
            clearCart();
        });

        router.refresh()
    }

    return (
        <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 text-white hover:text-red-400 transition"
        >
            {isLoggingOut ? '...Logging out' : 'Logout'}
        </button>
    )
}



