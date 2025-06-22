// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '@/app/constants';
import { prisma } from '@/app/lib/prisma/client';
import { ApiResponse, SuccessfulApiResponse } from '@/app/types/api';
import { SignJWT } from 'jose';

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials', success: false }, { status: 401 });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return NextResponse.json({ error: 'Invalid credentials', success: false }, { status: 401 });
        }

        const secret = new TextEncoder().encode(JWT_SECRET)

        const token = await new SignJWT({ userId: user.id })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(secret)

        const response: NextResponse<SuccessfulApiResponse> = NextResponse.json({ success: true });


        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        return response;
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal server error', success: false, }, { status: 500 });
    }
}
