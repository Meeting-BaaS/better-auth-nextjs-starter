import type { Metadata } from "next"
import FormWrapper from "@/components/auth/form-wrapper"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ForgotPasswordForm from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
    title: "Forgot Password | Meeting BaaS",
    description: "Forgot Password to Meeting BaaS"
}

export default function ForgotPasswordPage() {
    return (
        <FormWrapper
            key="forgot-password"
            title="Forgot Password"
            subtitle="Please enter your email address. We will send you an email to reset your password."
            redirectLink={
                <Button variant="link" asChild className="h-auto p-0">
                    <Link href="/sign-in">Back to Sign in</Link>
                </Button>
            }
        >
            <ForgotPasswordForm />
        </FormWrapper>
    )
}
