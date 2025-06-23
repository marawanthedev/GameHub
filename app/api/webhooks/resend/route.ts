import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { type, data } = body

        // this can be more secure by verifign through a secret signature but requires to move out of non edge env, will set it up later once i have time
        switch (type) {
            case 'email.delivered':
                console.log(`✅ Delivered to ${data.email}`)
                break
            case 'email.bounced':
                console.warn(`⚠️ Bounced email to ${data.email}`, data)
                break
            case 'email.complained':
                console.error(`🚫 Complaint from ${data.email}`, data)
                break
            default:
                console.log(`ℹ️ Unhandled Resend event type: ${type}`)
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('❌ Error handling resend webhook:', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}


export async function GET() {
    return NextResponse.json({ status: 'Webhook is live' })
}