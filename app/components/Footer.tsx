import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-[#0d1117] text-gray-400 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-white">About</Link></li>
                            <li><Link href="#" className="hover:text-white">Careers</Link></li>
                            <li><Link href="#" className="hover:text-white">Press</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-white">Blog</Link></li>
                            <li><Link href="#" className="hover:text-white">Support</Link></li>
                            <li><Link href="#" className="hover:text-white">API</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-white">Terms</Link></li>
                            <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                            <li><Link href="#" className="hover:text-white">Cookies</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <h4 className="text-white text-sm font-semibold mb-4">Stay Updated</h4>
                        <p className="text-sm mb-4">Get the latest game news, deals, and updates.</p>
                        <form className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full sm:w-auto px-3 py-2 rounded-md bg-[#161b22] text-white placeholder-gray-500 border border-[#30363d] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 border-t border-[#30363d] pt-6 text-center text-sm text-gray-100">
                    © {new Date().getFullYear()} GameHub. All rights reserved.
                </div>
            </div>
        </footer>
    )
}