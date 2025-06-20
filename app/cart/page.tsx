'use client'

import { useEffect, useState } from 'react'

export default function CartPage() {
    const [loading, setLoading] = useState(true)

    const cartItems = [
        {
            id: 1,
            title: 'Cyberpunk 2077',
            price: 59.99,
            image:
                'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg',
        },
        {
            id: 2,
            title: 'The Witcher 3',
            price: 39.99,
            image:
                'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg',
        },
    ]

    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="min-h-screen bg-[#f5f6f8] flex items-start justify-center py-12 px-6">
            <div className="w-full max-w-7xl bg-white shadow-lg rounded-2xl p-10 flex flex-col md:flex-row gap-12">
                {/* Left Side: Cart Items */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-8 text-gray-900">Your Cart</h2>

                    <div className="space-y-8">
                        {loading
                            ? Array.from({ length: 2 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-6 animate-pulse border-b pb-6"
                                >
                                    <div className="w-24 h-24 bg-gray-300 rounded-xl" />
                                    <div className="flex-1 space-y-3">
                                        <div className="h-6 w-1/2 bg-gray-300 rounded" />
                                        <div className="h-4 w-1/3 bg-gray-200 rounded" />
                                    </div>
                                    <div className="w-16 h-4 bg-gray-300 rounded" />
                                </div>
                            ))
                            : cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-6 border-b pb-6"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-24 h-24 object-cover rounded-xl"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold text-gray-800">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-500 mt-1">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <button className="text-sm text-red-500 hover:underline">
                                        Remove
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Right Side: Summary */}
                <div className="w-full md:w-80 shrink-0 bg-[#f7f9fc] rounded-xl p-6 space-y-6 border">
                    <h3 className="text-xl font-semibold text-gray-900">Summary</h3>

                    <div className="flex justify-between text-gray-700">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between font-semibold text-gray-900 border-t pt-4">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <button
                        type="button"
                        className="w-full py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}
