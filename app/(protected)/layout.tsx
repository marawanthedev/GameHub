// app/(protected)/layout.tsx
import { cookies } from 'next/headers'
import { prisma } from '@/app/lib/prisma/client'
import { jwtVerify } from 'jose'
import { redirect } from 'next/navigation'

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const token = cookies().get('token')?.value

    if (!token) redirect('/login')

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    try {
        const { payload } = await jwtVerify(token, secret)
        const userId = payload.userId as string

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { verified: true },
        })

        if (!user?.verified) {
            redirect('/confirm-email')
        }

        return <>{children}</>
    } catch (err) {
        console.error('Auth error:', err)
        redirect('/login')
    }
}
