import { Resend } from "resend"
import { MagicLinkEmail } from "@/email-templates/magic-link"

interface VerificationProps {
    email: string
    url: string
}

export const sendVerificationRequest = async (params: VerificationProps) => {
    const { RESEND_KEY, RESEND_FROM } = process.env
    if (!RESEND_KEY || !RESEND_FROM) {
        throw new Error("RESEND_KEY or RESEND_FROM environment variable is not set")
    }

    const resend = new Resend(RESEND_KEY)
    const { email, url } = params

    const { error } = await resend.emails.send({
        from: RESEND_FROM as string,
        to: email,
        subject: "Sign in to Meeting baas",
        react: MagicLinkEmail({ url }),
        text: text({ url })
    })

    if (error) {
        throw new Error(`Failed to send verification email to ${email}: ${JSON.stringify(error)}`, {
            cause: error
        })
    }
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url }: { url: string }) {
    return `Sign in to Meeting Baas.\n${url}\n\n`
}
