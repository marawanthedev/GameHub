// app/lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(to: string, link: string) {
    try {
        console.log('🚀 Sending email to:', to)
        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: to,
            subject: 'Verify your email address',
            html: `<p>Click to verify: <a href="${link}">${link}</a></p>`
        })

        console.log('🚀 Email sent:', response)

        return response

    } catch (error) {
        console.error('❌ Email failed:', error)
        throw new Error('Email sending failed')
    }
}
