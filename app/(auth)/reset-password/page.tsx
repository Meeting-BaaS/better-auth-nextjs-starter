import type { Metadata } from "next"
import FormWrapper from "@/components/auth/form-wrapper"
import ResetPasswordForm from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
    title: "Reset Password | Meeting BaaS",
    description: "Reset Password to Meeting BaaS"
}

export default async function ResetPasswordPage() {
    return (
        <FormWrapper
            key="reset-password"
            title="Reset Password"
            subtitle="Please enter your new password."
        >
            <ResetPasswordForm />
        </FormWrapper>
    )
}
