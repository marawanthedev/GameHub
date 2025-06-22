// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { prisma } from '@/app/lib/prisma/client'
import { API_BASE_URL, CLIENT_BASE_URL, JWT_SECRET } from '@/app/constants'
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

        const hashed = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: { email, password: hashed }
        })

        // Generate a verification token
        const verificationToken = crypto.randomBytes(32).toString('hex')
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 hours

        await prisma.verificationToken.create({
            data: {
                token: verificationToken,
                userId: user.id,
                expiresAt
            }
        })

        const secret = new TextEncoder().encode(JWT_SECRET)

        const token = await new SignJWT({ userId: user.id })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(secret)


        // Set cookie
        const response: NextResponse<SuccessfulApiResponse> = NextResponse.json({ success: true, message: 'Signup successful. Please check your email to verify your account.' })
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        })


        // Send verification email
        const verificationLink = `${CLIENT_BASE_URL}/verify-email?token=${verificationToken}`
        sendVerificationEmail(email, verificationLink)

        return response
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Internal server error', success: false }, { status: 500 })
    }
}
