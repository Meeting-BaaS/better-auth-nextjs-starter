import type { Metadata, Viewport } from "next"
import { Sofia_Sans } from "next/font/google"

import "@/styles/globals.css"

import type { ReactNode } from "react"
import { Providers } from "./providers"

const sofiaSans = Sofia_Sans({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"]
})

export const metadata: Metadata = {
    title: "Meeting BaaS Authentication Single Sign On App",
    description: "Sign in to the suite of applications from Meeting BaaS"
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1
}

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://images.unsplash.com" />
            </head>
            <body className={`${sofiaSans.className} antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
