import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    switch (body.type) {
        case 'email.delivered':
            console.log('✅ Delivered to', body.data.email);
            break;
        case 'email.bounced':
            console.warn('❌ Bounce:', body.data.email);
            break;
        case 'email.complained':
            console.warn('⚠️ Spam complaint:', body.data.email);
            break;
    }

    return NextResponse.json({ success: true });
}
