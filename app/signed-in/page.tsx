import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import Image from "next/image"

export const metadata: Metadata = {
    title: "Login successful",
    description: "Successfully logged in to Meeting BaaS"
}

export default async function HomePage() {
    const sessionData = await auth.api.getSession({ headers: await headers() })

    if (!sessionData) {
        redirect("/sign-in")
    }

    return (
        <div className="mx-auto flex min-h-svh flex-col items-center justify-center gap-4 px-4">
            <Image
                src="/logo.svg"
                alt="Meeting baaS logo"
                priority
                width={50}
                height={50}
                className="h-12 w-12"
            />
            You have successfully logged in! You can safely close this tab.
        </div>
    )
}
