"use client"

import { toast } from "sonner"
import { useState } from "react"
import { forgetPassword } from "@/lib/auth-client"
import { motion } from "motion/react"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { genericError } from "@/lib/errors"
import { itemVariant } from "@/animations/auth/auth-forms"
import { type ForgotPasswordFormData, ForgotPasswordSchema } from "@/lib/validators"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormFields } from "@/components/auth/form-fields"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function ForgotPasswordForm() {
    const form = useForm<ForgotPasswordFormData>({
        resolver: yupResolver(ForgotPasswordSchema),
        defaultValues: {
            email: ""
        }
    })
    const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false)

    const onSubmit = async (data: ForgotPasswordFormData) => {
        if (isForgotPasswordLoading) return
        try {
            await forgetPassword(
                {
                    email: data.email,
                    redirectTo: "/reset-password"
                },
                {
                    onRequest: (_ctx) => {
                        setIsForgotPasswordLoading(true)
                    },
                    onResponse: (_ctx) => {
                        setIsForgotPasswordLoading(false)
                    },
                    onSuccess: () => {
                        toast.success("Password reset email sent")
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message || genericError)
                    }
                }
            )
        } catch (error) {
            console.error("Error sending password reset email", error)
            setIsForgotPasswordLoading(false)
            toast.error(genericError)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 pt-6">
                <FormFields loading={isForgotPasswordLoading} formType="forgot-password" />
                <motion.div className="flex flex-col gap-3" variants={itemVariant}>
                    <Button
                        type="submit"
                        disabled={isForgotPasswordLoading}
                        aria-label={isForgotPasswordLoading ? "Sending email..." : "Send email"}
                        aria-busy={isForgotPasswordLoading}
                        aria-disabled={isForgotPasswordLoading}
                    >
                        {isForgotPasswordLoading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Sending email...
                            </>
                        ) : (
                            <>Send email</>
                        )}
                    </Button>
                </motion.div>
            </form>
        </Form>
    )
}
