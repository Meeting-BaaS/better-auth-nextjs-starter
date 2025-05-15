"use client"

import { toast } from "sonner"
import { useEffect, useState } from "react"
import { signIn } from "@/lib/auth-client"
import { motion } from "motion/react"
import { SocialButton } from "@/components/auth/social-button"
import { primaryProvider, providers } from "@/components/auth/providers"
import type { ProviderName } from "@/components/auth/providers"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { genericError, type errorDescription } from "@/lib/errors"
import { CallbackError } from "@/components/auth/callback-error"
import { itemVariant } from "@/animations/auth/auth-forms"

export default function SignInForm({
    redirectTo,
    error
}: { redirectTo: string | undefined; error: string | undefined }) {
    const form = useForm()
    const [socialLoading, setSocialLoading] = useState<string | undefined>(undefined)
    const [callbackError, setCallbackError] = useState(error)

    useEffect(() => setCallbackError(error), [error])
    const loading = Boolean(socialLoading)
    const callbackURL = redirectTo || "/home"

    const onProviderSignIn = async (provider: ProviderName) => {
        if (socialLoading) return
        try {
            await signIn.social(
                {
                    provider,
                    callbackURL,
                    errorCallbackURL: "/sign-in"
                },
                {
                    onRequest: (_ctx) => {
                        setSocialLoading(provider)
                        setCallbackError(undefined)
                    },
                    onResponse: (_ctx) => {
                        setSocialLoading(undefined)
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message)
                    }
                }
            )
        } catch {
            setSocialLoading(undefined)
            toast.error(genericError)
        }
    }

    const onSubmit = (_data: object, event?: React.BaseSyntheticEvent) => {
        const submitter = (event?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement
        const provider = submitter?.value as ProviderName

        if (provider) {
            onProviderSignIn(provider)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 pt-6">
                <CallbackError error={callbackError as keyof typeof errorDescription} />
                <motion.div className="flex flex-col gap-3" variants={itemVariant}>
                    <SocialButton
                        {...primaryProvider}
                        loading={loading}
                        socialLoading={socialLoading}
                    />
                    {providers.length > 0 && (
                        <div className="flex gap-2">
                            {providers.map((provider) => (
                                <SocialButton
                                    key={provider.name}
                                    {...provider}
                                    loading={loading}
                                    socialLoading={socialLoading}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            </form>
        </Form>
    )
}
