'use client'

import { useTransition } from 'react';
import { logoutAction } from '../actions/logout';
import { useCartStore } from '../stores/cart';

export default function LogoutButton() {
    const clearCart = useCartStore((state) => state.clearCart);
    const [isPending, startTransition] = useTransition();

    const handleLogout = async () => {
        await logoutAction();

        startTransition(() => {
            clearCart();
        });
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isPending}
            className="text-sm px-4 py-2 bg-[#21262d] text-white rounded-lg border border-[#30363d] hover:bg-[#30363d] transition"
        >
            {isPending ? 'Logging out...' : 'Logout'}
        </button>
    );
}
