import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (
        pathname.startsWith('/api') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    if (pathname.startsWith('/en-US') || pathname.startsWith('/de')) {
        return NextResponse.next();
    }

    if (pathname === '/') {
        return NextResponse.redirect(new URL('/en-US', req.url));
    }

    return NextResponse.next();
}
