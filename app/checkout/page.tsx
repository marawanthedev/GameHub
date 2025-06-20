'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function CheckoutPage() {
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const cartItems: any[] = [
        {
            id: 1,
            title: 'Elden Ring',
            price: 59.99,
            image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg',
        },
        {
            id: 2,
            title: 'Cyberpunk 2077',
            price: 49.99,
            image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg',
        },
    ]

    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0)

    useEffect(() => {
        if (cartItems.length === 0) {
            alert('Your cart is empty. Redirecting to games...')
            router.push('/games')
        }

        const timer = setTimeout(() => setLoading(false), 1500)
        return () => clearTimeout(timer)
    }, [cartItems, router])

    return (
        <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-5xl bg-[#161b22] rounded-2xl shadow-xl overflow-hidden">
                <div className="grid md:grid-cols-2">
                    {/* Left - Summary */}
                    <div className="p-8 border-r border-[#21262d]">
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-5">
                            {loading
                                ? Array.from({ length: 2 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-4 animate-pulse">
                                        <div className="w-20 h-20 bg-[#21262d] rounded-lg" />
                                        <div className="flex-1 space-y-2">
                                            <div className="w-3/4 h-4 bg-[#30363d] rounded" />
                                            <div className="w-1/3 h-4 bg-[#21262d] rounded" />
                                        </div>
                                    </div>
                                ))
                                : cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={80}
                                            height={80}
                                            className="rounded-lg object-cover w-20 h-20"
                                        />
                                        <div>
                                            <h4 className="font-semibold">{item.title}</h4>
                                            <p className="text-gray-400">${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>

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
                    </div>

                    {/* Right - Payment */}
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-6">Payment Info</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="card" className="block text-sm font-medium mb-1">
                                    Card Number
                                </label>
                                <input
                                    id="card"
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                                        Expiry
                                    </label>
                                    <input
                                        id="expiry"
                                        type="text"
                                        placeholder="MM/YY"
                                        className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="cvc" className="block text-sm font-medium mb-1">
                                        CVC
                                    </label>
                                    <input
                                        id="cvc"
                                        type="text"
                                        placeholder="123"
                                        className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Pay ${subtotal.toFixed(2)}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
