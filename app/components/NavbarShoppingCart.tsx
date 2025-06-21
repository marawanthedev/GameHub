'use client'
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCartStore } from '@/app/stores/cart';
import { useEffect, useState } from 'react';

export default function NavbarShoppingCart() {
    const cartItems = useCartStore((state) => state.items);
    const itemCount = cartItems.length;

    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        if (itemCount > 0) {
            setAnimate(true);
            const timer = setTimeout(() => setAnimate(false), 300);
            return () => clearTimeout(timer);
        }
    }, [itemCount]);

    return (<Link href="/cart" className="relative hover:text-blue-400 transition ml-2">
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
            <span
                className={`absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center ${animate ? 'scale-110 transition-transform duration-200 ease-out' : ''
                    }`}
                aria-label={`${itemCount} items in cart`}
            >
                {itemCount}
            </span>
        )}
    </Link>)
}