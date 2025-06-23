'use client'
import Link from "next/link";
import { SUPPORTED_LOCALES } from "../constants";
import { usePathname, useSearchParams } from 'next/navigation';

export default function LanguageSwitcher({ locale }: { locale: string }) {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <div className="flex items-center space-x-2 text-sm">
            {SUPPORTED_LOCALES.map(({ label, value }) => {
                const segments = pathname.split('/');
                segments[1] = value;
                const newPath = segments.join('/') || '/';

                const queryString = searchParams.toString();
                const fullHref = queryString ? `${newPath}?${queryString}` : newPath;

                return (
                    <Link
                        key={value}
                        href={fullHref}
                        className={`hover:underline ${value === locale ? 'text-blue-400' : 'text-gray-400'}`}
                    >
                        {label.toUpperCase()}
                    </Link>
                );
            })}
        </div>
    );
}