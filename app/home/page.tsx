import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import Header from "@/components/header"
import Home from "@/components/home"
import Footer from "@/components/footer"
import { fetchUserTokens } from "@/lib/server-api"

export const metadata: Metadata = {
    title: "Developer Hub | Meeting BaaS",
    description:
        "Access Meeting BaaS tools, integrations, and utilities from one central dashboard."
}

export default async function HomePage() {
    const [requestHeaders, requestCookies] = await Promise.all([headers(), cookies()])
    const jwt = requestCookies.get("jwt")?.value || ""
    const [sessionData, userTokens] = await Promise.all([
        auth.api.getSession({ headers: requestHeaders }),
        fetchUserTokens(jwt)
    ])

    if (!sessionData) {
        redirect("/sign-in")
    }

    return (
        <>
            <Header initialSession={sessionData} />
            <Home />
            <Footer />
        </>
    )
}
