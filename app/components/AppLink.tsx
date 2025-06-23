'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { useLocale } from '../hooks/useLocale'

export default function AppLink<T>({
    href,
    children,
    ...props
}: PropsWithChildren<T & { href: string }>) {
    const pathname = usePathname()
    const toastIdRef = useRef<string | number | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const startTimeRef = useRef<number>(0)
    const lastPathRef = useRef(pathname)
    const locale = useLocale()

    function removeLoader() {
        if (!toastIdRef.current) return
        toast.dismiss(toastIdRef.current)
        toastIdRef.current = null
    }

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }

        removeLoader()
    }, [pathname])

    const handleClick = () => {
        if (lastPathRef.current === pathname) return

        const nextPageName = href !== '/' ? href.split('/')[1] : "landing"
        startTimeRef.current = Date.now()

        timeoutRef.current = setTimeout(() => {
            toastIdRef.current = toast.loading(`Loading ${nextPageName} page...`)
        }, 100)
    }

    const normalizedHref = href.startsWith(`/${locale}`) ? href : `/${locale}${href}`;

    return (
        <Link
            href={normalizedHref}
            onClick={handleClick}
            {...props}
        >
            {children}
        </Link>
    )
}
