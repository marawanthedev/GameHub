'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { useLocale } from '../hooks/useLocale'
import { useToastStore } from '../stores/toast'

export default function AppLink<T>({
    href,
    children,
    ...props
}: PropsWithChildren<T & { href: string }>) {
    const pathname = usePathname()
    const locale = useLocale()

    const { toastId, startTime, setToast, clearToast } = useToastStore()

    const normalizedHref = href.startsWith('/')
        ? href.startsWith(`/${locale}`) ? href : `/${locale}${href}`
        : `/${locale}/${href}`

    const handleClick = () => {
        if (normalizedHref === pathname) return

        const nextPage = normalizedHref.split('/')[2] || 'home'

        const newToastId = toast.loading(`Loading ${nextPage} page...`)
        setToast(newToastId, Date.now())
    }

    // Auto-dismiss toast when pathname changes
    useEffect(() => {
        if (toastId) {
            const elapsed = Date.now() - startTime
            const remaining = 300 - elapsed

            const timeout = setTimeout(() => {
                toast.dismiss(toastId)
                clearToast()
            }, Math.max(remaining, 0))

            return () => clearTimeout(timeout)
        }
    }, [pathname])

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
