"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { signIn } from "@/lib/auth-client"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { motion } from "motion/react"
import { MagicLinkSchema } from "@/lib/validators"
import { GoogleLogo } from "@/components/icons/google"
import type { MagicLink } from "@/lib/validators"
import { itemVariant } from "./sign-in"

const MotionButton = motion.create(Button)

export default function SignInForm({
    redirectTo,
    error
}: { redirectTo: string | undefined; error: string | undefined }) {
    const form = useForm<MagicLink>({
        resolver: zodResolver(MagicLinkSchema),
        defaultValues: {
            email: ""
        }
    })

    const [magicLinkLoading, setMagicLinkLoading] = useState(false)
    const [magicLinkSent, setMagicLinkSent] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [callbackError, setCallbackError] = useState(error)
    const loading = magicLinkLoading || googleLoading
    const callbackURL = redirectTo || "/signed-in"

    const onSubmit = async (values: MagicLink) => {
        await signIn.magicLink(
            {
                email: values.email,
                callbackURL
            },
            {
                onRequest: (ctx) => {
                    setMagicLinkSent(false)
                    setMagicLinkLoading(true)
                    setCallbackError(undefined)
                },
                onSuccess: (ctx) => {
                    setMagicLinkSent(true)
                },
                onResponse: (ctx) => {
                    setMagicLinkLoading(false)
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                }
            }
        )
    }

    const onGoogleSignIn = async () => {
        await signIn.social(
            {
                provider: "google",
                callbackURL
            },
            {
                onRequest: (ctx) => {
                    setMagicLinkSent(false)
                    setGoogleLoading(true)
                    setCallbackError(undefined)
                },
                onResponse: (ctx) => {
                    setGoogleLoading(false)
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                }
            }
        )
    }

    return (
        <div className="grid gap-6 pt-6">
            <Form {...form}>
                <motion.form
                    variants={itemVariant}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                    noValidate
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={loading}
                                        placeholder="Email address"
                                        type="email"
                                        autoFocus
                                        autoComplete="email"
                                    />
                                </FormControl>
                                <FormMessage className="text-left" />
                            </FormItem>
                        )}
                    />
                    {magicLinkSent && (
                        <Alert className="border-emerald-500/15 bg-emerald-500/15 p-3 text-left text-emerald-500">
                            <CheckCircle size={16} />
                            <AlertTitle className="mb-0 text-left leading-normal">
                                Confirmation email has been sent!
                            </AlertTitle>
                        </Alert>
                    )}
                    {callbackError && (
                        <Alert variant="destructive">
                            <AlertCircle size={16} />
                            <AlertTitle className="mb-0 text-left leading-normal">
                                There was an error, please try again.
                            </AlertTitle>
                        </Alert>
                    )}
                    <Button disabled={loading} type="submit" className="w-full">
                        {magicLinkLoading && <Loader2 className="size-4 animate-spin" />}
                        Continue with Email
                    </Button>
                </motion.form>
            </Form>
            <motion.div variants={itemVariant} className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
            </motion.div>
            <MotionButton
                size="lg"
                className="flex w-full flex-row items-center justify-center gap-2 shadow-sm"
                variant="outline"
                disabled={loading}
                onClick={onGoogleSignIn}
                variants={itemVariant}
            >
                {googleLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    <GoogleLogo size={20} />
                )}

                <span className="font-medium text-muted-foreground">Continue with Google</span>
            </MotionButton>
        </div>
    )
}
