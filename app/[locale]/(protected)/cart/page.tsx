'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/app/stores/cart';
import { GTM_EVENTS, trackEvent } from '../../../lib/gtm';
import AppLink from '@/app/components/AppLink';

export default function CartPage() {
    const [loading, setLoading] = useState(true);
    const cartItems = useCartStore((state) => state.items);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const [removeFromCartAnnouncement, setRemoveFromCartAnnouncement] = useState('');

    // bad candidate for memoizing
    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);


    // bad candidate for memoizing
    const handleRemoveFromCart = (id: number, title: string) => {
        const removedItem = cartItems.find(item => item.id === id);

        removeFromCart(id);
        setRemoveFromCartAnnouncement(`${title} has been removed from your cart.`);

        if (removedItem) {
            trackEvent({
                event: GTM_EVENTS.REMOVE_FROM_CART,
                category: 'ecommerce',
                label: removedItem.title,
                productName: removedItem.title,
                value: removedItem.price,
            });
        }
    };

    if (!cartItems && !loading) {
        return (
            <main className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
                <p className="text-gray-400">Your cart is empty.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0d1117] text-white py-12 px-4" aria-labelledby="cart-title">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
                {/* Cart Items Section */}
                <section className="flex-1" aria-labelledby="cart-title">
                    <h1 id="cart-title" className="text-3xl font-bold mb-8">Your Cart</h1>

                    <ul className="space-y-6" aria-live="polite">
                        {cartItems.map((item) => (
                            <li key={item.id}>
                                <article className="flex items-center gap-6 border-b border-gray-800 pb-6" aria-labelledby={`item-${item.id}-title`}>
                                    <Image
                                        src={item.image}
                                        alt={`Cover of ${item.title}`}
                                        width={96}
                                        height={96}
                                        className="w-24 h-24 object-cover rounded-xl"
                                    />

                                    <div className="flex-1">
                                        <h2 id={`item-${item.id}-title`} className="text-lg font-semibold">
                                            {item.title}
                                        </h2>
                                        <p className="text-gray-400 mt-1">${item.price.toFixed(2)}</p>
                                    </div>

                                    <button
                                        className="text-sm text-red-400 hover:underline"
                                        onClick={() => handleRemoveFromCart(item.id, item.title)}
                                        aria-label={`Remove ${item.title} from cart`}
                                    >
                                        Remove
                                    </button>
                                </article>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Summary Section */}
                <aside
                    className="w-full md:w-80 bg-[#161b22] border border-gray-800 rounded-xl p-6 space-y-6 shadow-md"
                    aria-label="Cart Summary"
                >
                    <h2 className="text-xl font-semibold">Summary</h2>

                    <div className="flex justify-between text-gray-300">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between font-semibold text-white border-t border-gray-700 pt-4">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <AppLink

                        href="/checkout"
                        className="inline-flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label="Proceed to checkout"
                    >
                        Proceed to Checkout
                    </AppLink>
                </aside>
            </div>

            {/* ARIA live region for announcements */}
            <span
                id="cart-announcement"
                className="sr-only"
                role="status"
                aria-live="polite"
                aria-atomic="true"
            >
                {removeFromCartAnnouncement}
            </span>
        </main>
    );
}
