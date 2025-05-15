"use client"

import { toast } from "sonner"
import { useEffect, useState } from "react"
import { signIn } from "@/lib/auth-client"
import { motion } from "motion/react"
import { SocialButton } from "@/components/auth/social-button"
import { primaryProvider, providers } from "@/components/auth/providers"
import type { ProviderName } from "@/components/auth/providers"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { type SignUpFormData, SignUpSchema } from "@/lib/validators"
import { CallbackError } from "@/components/auth/callback-error"
import { genericError, type errorDescription } from "@/lib/errors"
import { PRIVACY_POLICY_URL, TERMS_AND_CONDITIONS_URL } from "@/lib/external-urls"
import { itemVariant } from "@/animations/auth/auth-forms"

export default function SignUpForm({
    redirectTo,
    error
}: { redirectTo: string | undefined; error: string | undefined }) {
    const form = useForm<SignUpFormData>({
        resolver: yupResolver(SignUpSchema),
        defaultValues: {
            termsOfUse: false,
            privacyPolicy: false
        }
    })
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
                    errorCallbackURL: "/sign-up",
                    requestSignUp: true
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

    const onSubmit = (_data: SignUpFormData, event?: React.BaseSyntheticEvent) => {
        const submitter = (event?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement
        const provider = submitter?.value as ProviderName

        if (provider) {
            onProviderSignIn(provider)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 pt-6">
                <motion.div className="flex flex-col gap-3" variants={itemVariant}>
                    <FormField
                        control={form.control}
                        name="termsOfUse"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-1">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormLabel className="flex-wrap gap-1">
                                    I agree
                                    <Button
                                        variant="link"
                                        asChild
                                        className="h-auto p-0 text-inherit underline transition-none hover:text-primary"
                                    >
                                        <Link
                                            href={TERMS_AND_CONDITIONS_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            to the terms of use of Meeting BaaS
                                        </Link>
                                    </Button>
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="privacyPolicy"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-1">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormLabel className="flex-wrap gap-1">
                                    I consent
                                    <Button
                                        variant="link"
                                        asChild
                                        className="h-auto p-0 text-inherit underline transition-none hover:text-primary"
                                    >
                                        <Link
                                            href={PRIVACY_POLICY_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            to the privacy policy of Meeting BaaS
                                        </Link>
                                    </Button>
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                </motion.div>
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
