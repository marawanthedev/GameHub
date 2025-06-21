
import Link from 'next/link'
import NavBarActions from './NavBarActions'
import NavbarShoppingCart from './NavbarShoppingCart';

export async function Navbar() {

    return (
        <nav className="w-full bg-[#0d1117] text-white border-b border-[#30363d] sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-6">
                        <Link href="/" className="text-xl font-bold text-white hover:text-blue-500 transition">
                            GameHub
                        </Link>
                        <Link href="/games" className="hover:text-blue-400 transition text-sm">
                            Games
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <NavBarActions />
                        <NavbarShoppingCart />
                    </div>
                </div>
            </div>
        </nav>
    )
}
