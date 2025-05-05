import type { Metadata } from "next"
import FormWrapper from "@/components/auth/form-wrapper"
import SignInForm from "@/components/auth/sign-in-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Login",
    description: "Login to Meeting BaaS"
}

export default async function SignInPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const params = await searchParams
    const { redirectTo, error } = params

    let redirectionHref = "/sign-up"
    if (redirectTo) redirectionHref = `${redirectionHref}?redirectTo=${redirectTo}`

    return (
        <FormWrapper
            key="sign-in"
            title="Welcome Back"
            subtitle="Log in to Meeting BaaS"
            redirectLink={
                <>
                    Don&apos;t have an account yet?{" "}
                    <Button
                        variant="link"
                        asChild
                        className="h-auto p-0 text-inherit underline hover:text-primary"
                    >
                        <Link href={redirectionHref}>Sign up</Link>
                    </Button>
                </>
            }
        >
            <SignInForm redirectTo={redirectTo} error={error} />
        </FormWrapper>
    )
}
