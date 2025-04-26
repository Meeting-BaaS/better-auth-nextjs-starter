"use client"

import { toast } from "sonner"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"
import { AlertCircle } from "lucide-react"
import { signIn } from "@/lib/auth-client"
import { motion } from "motion/react"
import { itemVariant } from "./sign-in"
import { SocialButton } from "./social-button"
import { primaryProvider, providers } from "./providers"
import type { ProviderName } from "./providers"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import type { InferType } from "yup"
import Link from "next/link"
import { SignInSchema } from "@/lib/validators"

type SignInFormType = InferType<typeof SignInSchema>

export default function SignInForm({
    redirectTo,
    error
}: { redirectTo: string | undefined; error: string | undefined }) {
    const form = useForm<SignInFormType>({
        resolver: yupResolver(SignInSchema),
        defaultValues: {
            termsOfUse: false,
            privacyPolicy: false
        }
    })
    const [socialLoading, setSocialLoading] = useState<string | undefined>(undefined)
    const [callbackError, setCallbackError] = useState(error)
    const loading = Boolean(socialLoading)
    const callbackURL = redirectTo || "/home"

    const onProviderSignIn = async (provider: ProviderName) => {
        await signIn.social(
            {
                provider,
                callbackURL
            },
            {
                onRequest: (ctx) => {
                    setSocialLoading(provider)
                    setCallbackError(undefined)
                },
                onResponse: (ctx) => {
                    setSocialLoading(undefined)
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                }
            }
        )
    }

    const onSubmit = (data: SignInFormType, event?: React.BaseSyntheticEvent) => {
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
                                            href="https://meetingbaas.com/terms-and-conditions"
                                            target="_blank"
                                            rel="noreferrer noopener"
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
                                            href="https://meetingbaas.com/privacy"
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        >
                                            to the privacy policy of Meeting BaaS
                                        </Link>
                                    </Button>
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                </motion.div>
                {callbackError && (
                    <Alert variant="destructive">
                        <AlertCircle size={16} />
                        <AlertTitle className="mb-0 text-left leading-normal">
                            There was an error, please try again.
                        </AlertTitle>
                    </Alert>
                )}
                <motion.div className="flex flex-col gap-3" variants={itemVariant}>
                    <SocialButton
                        {...primaryProvider}
                        loading={loading}
                        socialLoading={socialLoading}
                    />
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
                </motion.div>
            </form>
        </Form>
    )
}
