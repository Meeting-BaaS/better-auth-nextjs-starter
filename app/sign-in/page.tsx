import type { Metadata } from "next"
import SignIn from "@/components/auth/sign-in"
import { GitHubRepoButton } from "@/components/header/github-repo-button"
import * as motion from "motion/react-client"
import HeroSection from "@/components/hero"

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

    return (
        <>
            <div className="container relative mx-auto grid h-dvh grid-cols-1 flex-col items-center justify-center lg:max-w-none lg:grid-cols-5 lg:px-0">
                <SignIn redirectTo={redirectTo} error={error} />
                <HeroSection />
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-0 left-0 m-4"
            >
                <GitHubRepoButton />
            </motion.div>
        </>
    )
}
