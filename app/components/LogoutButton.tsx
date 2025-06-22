'use client'

import { useRouter } from 'next/navigation'
import { useCartStore } from '../stores/cart';
import { useTransition } from 'react';

export default function LogoutButton() {
    const router = useRouter()
    const clearCart = useCartStore((state) => state.clearCart);

    const [isPending, startTransition] = useTransition();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        })


        startTransition(() => {
            clearCart();
        });
        router.refresh() // refreshes to reflect logout state
    }

    return (
        <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 text-white hover:text-red-400 transition"
        >
            {isPending ? '...Logging out' : 'Logout'}
        </button>
    )
}



