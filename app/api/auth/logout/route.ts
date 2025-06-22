import { SuccessfulApiResponse } from '@/app/types/api'
import { NextResponse } from 'next/server'

export async function POST(): Promise<NextResponse<SuccessfulApiResponse>> {
    const response: NextResponse<SuccessfulApiResponse> = NextResponse.json({ success: true })

    response.cookies.set({
        name: 'token',
        value: '',
        path: '/',
        maxAge: 0, // Expire immediately
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    })

    return response
}
