import NavBarActions from './NavBarActions';
import NavbarShoppingCart from './NavbarShoppingCart';
import AppLink from './AppLink';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
    locale: string;
}

export async function Navbar({ locale }: NavbarProps) {
    return (
        <nav className="w-full bg-[#0d1117] text-white border-b border-[#30363d] sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-6">
                        <AppLink href={`/${locale}`} className="text-xl font-bold text-white hover:text-blue-500 transition">
                            GameHub
                        </AppLink>
                        <AppLink href={`/${locale}/games`} className="hover:text-blue-400 transition text-sm">
                            Games
                        </AppLink>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* two level of prop passing  but should be fine as i wanetd to move it one level down for it to be client and no need for context for this */}
                        <LanguageSwitcher locale={locale} />
                        <NavBarActions />
                        <NavbarShoppingCart />
                    </div>
                </div>
            </div>
        </nav>
    );
}
