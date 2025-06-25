import { cookies } from 'next/headers'
import { jwtVerify, JWTPayload } from 'jose'
import { JWT_SECRET } from '../constants'

export type JWTUserPayload = JWTPayload & {
    userId: string
}

export async function getCurrentUser(): Promise<JWTUserPayload | null> {
    const token = cookies().get('token')?.value
    if (!token) return null

    try {
        const secret = new TextEncoder().encode(JWT_SECRET)
        console.log({ token })

        const { payload } = await jwtVerify(token, secret)

        return {
            userId: (payload as JWTUserPayload).userId
        }
    } catch (err) {
        console.error('Invalid token', err)
        return null
    }
}
