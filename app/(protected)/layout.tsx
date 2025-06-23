import { cookies, headers } from 'next/headers'
import { prisma } from '@/app/lib/prisma/client'
import { jwtVerify } from 'jose'
import { redirect } from 'next/navigation'

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const token = cookies().get('token')?.value
    const pathname = headers().get('x-pathname') || '/'

    if (!token) {
        redirect(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    let payload

    try {
        const verified = await jwtVerify(token, secret)
        payload = verified.payload
    } catch (err) {
        console.error((err as Error).message)
        redirect(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
    }

    const userId = payload.userId as string

    const user = await prisma.user.findUnique({
        where: { id: userId },
    })

    if (!user) {
        redirect(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
    }

    if (user?.verified === false) {
        console.log('shall redirect to confirm email')
        redirect('/email-not-verified')
    }

    return <>{children}</>
}
