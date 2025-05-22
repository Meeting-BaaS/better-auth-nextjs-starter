import type { Metadata, Viewport } from "next"
import { Sofia_Sans } from "next/font/google"

import "@/styles/globals.css"

import { Providers } from "@/app/providers"
import type { ReactNode } from "react"

const sofiaSans = Sofia_Sans({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"]
})

export const metadata: Metadata = {
    title: "Meeting BaaS Authentication | Single Sign On",
    description: "Access the full Meeting BaaS suite of tools for meeting bots, real-time transcription, and analytics across Google Meet, Teams, and Zoom platforms",
    keywords: ["Meeting BaaS", "authentication", "single sign-on", "meeting bot", "analytics", "transcription", "Google Meet", "Teams", "Zoom"],
    authors: [{ name: "Meeting BaaS Team" }],
    openGraph: {
        type: "website",
        title: "Meeting BaaS Authentication | Single Sign On",
        description: "Deploy meeting bots in seconds, get analytics, automatic transcription, and monitoring across video conference platforms",
        siteName: "Meeting BaaS",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Meeting BaaS Authentication"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Meeting BaaS Authentication | Single Sign On",
        description: "Deploy meeting bots in seconds, get analytics, automatic transcription, and monitoring across video conference platforms",
        images: ["/og-image.png"]
    },
    category: "Video Conferencing Tools",
    applicationName: "Meeting BaaS",
    creator: "Meeting BaaS",
    publisher: "Meeting BaaS",
    referrer: "origin-when-cross-origin",
    robots: {
        index: true,
        follow: true
    }
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
