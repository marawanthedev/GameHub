import { cookies, headers } from 'next/headers'
import { prisma } from '@/app/lib/prisma/client'
import { jwtVerify } from 'jose'
import { redirect } from 'next/navigation'
import { normalizeHrefWithLocale } from '@/app/util/normalizeHref'

export default async function ProtectedLayout({
    children, params
}: {
    children: React.ReactNode,
    params: { locale: string }
}) {
    const token = cookies().get('token')?.value
    const pathname = headers().get('x-pathname') || '/'
    const locale = params.locale
    const normalizedCallbackUrl = normalizeHrefWithLocale(pathname, locale)
    const loginHref = normalizeHrefWithLocale("/login", locale)
    const emailNotConfirmedHref = normalizeHrefWithLocale("/email-not-verified'", locale)

    if (!token) {
        redirect(`${loginHref}?callbackUrl=${encodeURIComponent(normalizedCallbackUrl)}`)
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    let payload

    try {
        const verified = await jwtVerify(token, secret)
        payload = verified.payload
    } catch (err) {
        console.error((err as Error).message)
        redirect(`${loginHref}?callbackUrl=${encodeURIComponent(normalizedCallbackUrl)}`)
    }

    const userId = payload.userId as string

    const user = await prisma.user.findUnique({
        where: { id: userId },
    })

    if (!user) {
        redirect(`${loginHref}?callbackUrl=${encodeURIComponent(normalizedCallbackUrl)}`)
    }

    if (user?.verified === false) {
        console.error('shall redirect to confirm email')
        redirect(emailNotConfirmedHref)
    }

    return <>{children}</>
}
