// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/app/lib/prisma/client'
import { CLIENT_BASE_URL, DEFAULT_LOCALE, JWT_SECRET } from '@/app/constants'
import { ApiResponse, SuccessfulApiResponse } from '@/app/types/api'
import { SignJWT } from 'jose'
import { sendVerificationEmail } from '@/app/lib/email'

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const { email, password } = await req.json()

        const existing = await prisma.user.findUnique({ where: { email } })
        if (existing) {
            return NextResponse.json({ error: 'User already exists', success: false }, { status: 400 })
        }
        const locale = req.headers.get('x-locale') ?? DEFAULT_LOCALE.value

        const hashed = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: { email, password: hashed }
        })

        const secret = new TextEncoder().encode(JWT_SECRET)

        const token = await new SignJWT({ userId: user.id })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(secret)

        const verificationTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 hours



        await prisma.verificationToken.create({
            data: {
                token: token,
                userId: user.id,
                expiresAt: verificationTokenExpiresAt
            }
        })


        const response: NextResponse<SuccessfulApiResponse> = NextResponse.json({ success: true, message: 'Signup successful. Please check your email to verify your account.' })


        // no cookie setting as we need to verify email first 

        // Send verification email
        const verificationLink = `${CLIENT_BASE_URL}/${locale}/verify-email?token=${token}`

        await sendVerificationEmail(email, verificationLink)

        return response
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Internal server error', success: false }, { status: 500 })
    }
}
