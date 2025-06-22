import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma/client'

export async function POST(req: NextRequest) {
    const { token } = await req.json()

    console.log({ verifyToken: token })
    if (!token) {
        return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    const record = await prisma.verificationToken.findUnique({ where: { token } })

    console.log({ record })

    if (!record || record.expiresAt < new Date()) {
        return NextResponse.json({ error: 'Token is invalid or expired' }, { status: 400 })
    }

    await prisma.user.update({
        where: { id: record.userId },
        data: { verified: true },
    })

    await prisma.verificationToken.delete({ where: { token } })

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/verified-success`)
}
