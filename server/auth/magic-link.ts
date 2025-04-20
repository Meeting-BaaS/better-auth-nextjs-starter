import { Resend } from "resend"
import { MagicLinkEmail } from "@/email-templates/magic-link"

const resend = new Resend(process.env.RESEND_KEY)

interface VerificationProps {
    email: string
    url: string
}

export const sendVerificationRequest = async (params: VerificationProps) => {
    const { email, url } = params

    const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM as string,
        to: email,
        subject: "Sign in to meeting baas",
        react: MagicLinkEmail({ url }),
        text: text({ url })
    })

    if (error) {
        throw new Error(`Resend error: ${JSON.stringify(error)}`)
    }
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url }: { url: string }) {
    return `Sign in to Meeting Baas.\n${url}\n\n`
}
