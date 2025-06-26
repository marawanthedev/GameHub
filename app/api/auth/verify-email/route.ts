import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma/client'
import { DEFAULT_LOCALE } from '@/app/constants'

export async function POST(req: NextRequest) {
    const { token } = await req.json()
    const locale = req.headers.get('x-locale') ?? DEFAULT_LOCALE.value

    if (!token) {
        return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    const record = await prisma.verificationToken.findUnique({ where: { token } })


    if (!record || record.expiresAt < new Date()) {
        console.log('invalid token')
        return NextResponse.json({ error: 'Token is invalid or expired' }, { status: 400 })
    }

    await prisma.user.update({
        where: { id: record.userId },
        data: { verified: true },
    })

    await prisma.verificationToken.delete({ where: { token } })


    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/${locale}/verified-success`)
}
