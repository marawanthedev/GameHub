'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CartPage() {
    const [loading, setLoading] = useState(true)

    const cartItems = [
        {
            id: 1,
            title: 'Cyberpunk 2077',
            price: 59.99,
            image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg',
        },
        {
            id: 2,
            title: 'The Witcher 3',
            price: 39.99,
            image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg',
        },
    ]

    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="min-h-screen bg-[#0d1117] text-white py-12 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
                {/* Cart Items */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-8">Your Cart</h2>

                    <div className="space-y-6">
                        {loading
                            ? Array.from({ length: 2 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-6 animate-pulse border-b border-gray-800 pb-6">
                                    <div className="w-24 h-24 bg-[#21262d] rounded-xl" />
                                    <div className="flex-1 space-y-3">
                                        <div className="h-6 w-1/2 bg-[#30363d] rounded" />
                                        <div className="h-4 w-1/3 bg-[#21262d] rounded" />
                                    </div>
                                    <div className="w-16 h-4 bg-[#21262d] rounded" />
                                </div>
                            ))
                            : cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-6 border-b border-gray-800 pb-6">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={96}
                                        height={96}
                                        className="w-24 h-24 object-cover rounded-xl"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold">{item.title}</h4>
                                        <p className="text-gray-400 mt-1">${item.price.toFixed(2)}</p>
                                    </div>
                                    <button className="text-sm text-red-400 hover:underline">Remove</button>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="w-full md:w-80 bg-[#161b22] border border-gray-800 rounded-xl p-6 space-y-6 shadow-md">
                    <h3 className="text-xl font-semibold">Summary</h3>

                    <div className="flex justify-between text-gray-300">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between font-semibold text-white border-t border-gray-700 pt-4">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <Link
                        href="/checkout"
                        className="inline-flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    )
}
