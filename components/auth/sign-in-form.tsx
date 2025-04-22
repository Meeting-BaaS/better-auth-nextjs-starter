"use client"

import { toast } from "sonner"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"
import { AlertCircle } from "lucide-react"
import { signIn } from "@/lib/auth-client"
import { motion } from "motion/react"
import { itemVariant } from "./sign-in"
import { SocialButton } from "./social-button"
import { providers } from "./providers"

export default function SignInForm({
    redirectTo,
    error
}: { redirectTo: string | undefined; error: string | undefined }) {
    const [socialLoading, setSocialLoading] = useState<string | undefined>(undefined)
    const [callbackError, setCallbackError] = useState(error)
    const loading = Boolean(socialLoading)
    const callbackURL = redirectTo || "/signed-in"

    const onProviderSignIn = async (
        provider: "google" | "microsoft" | "github" | "gitlab" | "zoom"
    ) => {
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

    return (
        <div className="grid gap-6 pt-6">
            {callbackError && (
                <Alert variant="destructive">
                    <AlertCircle size={16} />
                    <AlertTitle className="mb-0 text-left leading-normal">
                        There was an error, please try again.
                    </AlertTitle>
                </Alert>
            )}
            <motion.div className="flex flex-col gap-3" variants={itemVariant}>
                {providers.map((provider) => (
                    <SocialButton
                        key={provider.name}
                        name={provider.name}
                        title={provider.title}
                        logo={provider.logo}
                        primary={provider.primary}
                        loading={loading}
                        socialLoading={socialLoading}
                        onClick={() => onProviderSignIn(provider.name)}
                    />
                ))}
            </motion.div>
        </div>
    )
}
