import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import Header from "@/components/header"
import Home from "@/components/home"
import Footer from "@/components/footer"

export const metadata: Metadata = {
    title: "Meeting BaaS Authentication Dashboard",
    description:
        "Access Meeting BaaS tools, integrations, and utilities from one central dashboard."
}

export default async function HomePage() {
    const sessionData = await auth.api.getSession({ headers: await headers() })

    if (!sessionData) {
        redirect("/sign-in")
    }

    const { user } = sessionData

    return (
        <>
            <Header user={user} />
            <Home />
            <Footer />
        </>
    )
}
