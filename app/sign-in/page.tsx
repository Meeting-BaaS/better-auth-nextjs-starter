import type { Metadata } from "next"
import HeroSection from "@/components/hero/section"
import SignIn from "@/components/auth/sign-in"

export const metadata: Metadata = {
    title: "Login",
    description: "Login to Meeting Baas"
}

export default async function SignInPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const params = await searchParams
    const { redirectTo, error } = params

    return (
        <div className="container relative mx-auto grid h-dvh grid-cols-1 flex-col items-center justify-center lg:max-w-none lg:grid-cols-5 lg:px-0">
            <SignIn redirectTo={redirectTo} error={error} />
            <HeroSection />
        </div>
    )
}
