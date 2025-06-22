// middleware.ts
// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    // const res = NextResponse.next()

    // const supabase = createMiddlewareClient({ req, res })
    // const { data: { session } } = await supabase.auth.getSession()

    // console.log('Middleware triggered for:', req.nextUrl.pathname)
    // console.log('Session:', session)

    // Protect /games routes
    // if (!session && req.nextUrl.pathname.startsWith('/games')) {
    //     return NextResponse.redirect(new URL('/login', req.url))
    // }

    return NextResponse.next()
}




export const config = {
    matcher: ['/games'], // 🔥 matches EVERYTHING except static files
}
