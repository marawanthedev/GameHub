'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export function Navbar() {
    return (
        <nav className="w-full bg-[#0d1117] text-white border-b border-[#30363d] sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left: Logo + Links */}
                    <div className="flex items-center space-x-6">
                        <Link href="/" className="text-xl font-bold text-white hover:text-blue-500 transition">GameHub</Link>
                        <Link href="/games" className="hover:text-blue-400 transition text-sm">Games</Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-4">
                        <Link href="/login" className="text-sm hover:text-blue-400 transition">Login</Link>
                        <Link
                            href="/signup"
                            className="text-sm bg-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
                        >
                            Sign up
                        </Link>
                        <Link href="/cart" className="hover:text-blue-400 transition">
                            <ShoppingCart className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
