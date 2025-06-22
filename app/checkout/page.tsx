'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCartStore } from '../stores/cart'
import { toast } from 'sonner'
import { GTM_EVENTS, trackEvent } from '../lib/gtm'

export default function CheckoutPage() {
    const [loading, setLoading] = useState(true)
    const [announcement, setAnnouncement] = useState('')
    const router = useRouter()
    const cartItems = useCartStore((state) => state.items)
    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0)

    useEffect(() => {
        if (cartItems.length === 0) {
            toast.error('Your cart is empty. Please add items before checking out.')
            setTimeout(() => router.push('/games'), 1500)
        }

        const timer = setTimeout(() => setLoading(false), 1500)
        return () => clearTimeout(timer)
    }, [cartItems, router])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAnnouncement('Processing payment...');

        // Track attempt
        trackEvent({
            event: GTM_EVENTS.CHECKOUT_ATTEMPT,
            category: 'ecommerce',
            value: subtotal,
        });

        setTimeout(() => {
            const isSuccess = Math.random() > 0.4; // 60% success rate simulation

            if (isSuccess) {
                setAnnouncement('Payment complete. Thank you for your order!');
                toast.success('Payment completed successfully!');

                trackEvent({
                    event: GTM_EVENTS.CHECKOUT_SUCCESS,
                    category: 'ecommerce',
                    value: subtotal,
                    productNames: Array.from(new Set(cartItems.map(item => item.title))).join(', ')
                });
            } else {
                setAnnouncement('Payment failed. Please try again.');
                toast.error('Payment failed.');

                trackEvent({
                    event: GTM_EVENTS.CHECKOUT_FAILURE,
                    category: 'error',
                    value: subtotal,
                    reason: 'Mock failure',
                });
            }
        }, 3000);
    };

    return (
        <main className="min-h-screen bg-[#0d1117] text-white px-4 py-16">
            <section className="w-full max-w-5xl mx-auto bg-[#161b22] rounded-2xl shadow-xl overflow-hidden" aria-labelledby="checkout-heading">
                <h1 id="checkout-heading" className="sr-only">Checkout</h1>

                <div className="grid md:grid-cols-2">
                    {/* Order Summary */}
                    <article className="p-8 border-r border-[#21262d]" aria-labelledby="summary-heading">
                        <h2 id="summary-heading" className="text-2xl font-bold mb-6">Order Summary</h2>

                        <ul className="space-y-5">
                            {loading
                                ? Array.from({ length: 2 }).map((_, i) => (
                                    <li key={i} className="flex items-center gap-4 animate-pulse">
                                        <div className="w-20 h-20 bg-[#21262d] rounded-lg" />
                                        <div className="flex-1 space-y-2">
                                            <div className="w-3/4 h-4 bg-[#30363d] rounded" />
                                            <div className="w-1/3 h-4 bg-[#21262d] rounded" />
                                        </div>
                                    </li>
                                ))
                                : cartItems.map((item) => (
                                    <li key={item.id} className="flex items-center gap-4">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={80}
                                            height={80}
                                            className="rounded-lg object-cover w-20 h-20"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-base">{item.title}</h3>
                                            <p className="text-gray-400 text-sm">${item.price.toFixed(2)}</p>
                                        </div>
                                    </li>
                                ))}
                        </ul>

                        <div className="border-t border-[#21262d] mt-6 pt-4 space-y-2">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-white">
                                <span>Total</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </article>

                    {/* Payment Info */}
                    <article className="p-8" aria-labelledby="payment-heading">
                        <h2 id="payment-heading" className="text-2xl font-bold mb-6">Payment Info</h2>

                        <form className="space-y-4" onSubmit={handleSubmit} aria-describedby="payment-instructions">
                            <p id="payment-instructions" className="sr-only">Enter your payment details and submit the form.</p>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    required
                                    type="text"
                                    className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="card" className="block text-sm font-medium mb-1">Card Number</label>
                                <input
                                    id="card"
                                    name="card"
                                    type="text"
                                    required
                                    inputMode="numeric"
                                    pattern="[0-9\s]{13,19}"
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label htmlFor="expiry" className="block text-sm font-medium mb-1">Expiry</label>
                                    <input
                                        id="expiry"
                                        name="expiry"
                                        required
                                        type="text"
                                        placeholder="MM/YY"
                                        pattern="\d{2}/\d{2}"
                                        inputMode="numeric"
                                        className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="cvc" className="block text-sm font-medium mb-1">CVC</label>
                                    <input
                                        id="cvc"
                                        name="cvc"
                                        required
                                        type="text"
                                        placeholder="123"
                                        pattern="\d{3,4}"
                                        inputMode="numeric"
                                        className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label={`Pay ${subtotal.toFixed(2)} dollars`}
                            >
                                Pay ${subtotal.toFixed(2)}
                            </button>
                        </form>

                        <div
                            role="status"
                            aria-live="polite"
                            className="sr-only"
                        >
                            {announcement}
                        </div>
                    </article>
                </div>
            </section>
        </main>
    )
}

