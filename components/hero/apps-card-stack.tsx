"use client"

import { cardContainerVariant, cardItemVariant } from "@/animations/auth/auth-card-stacks"
import { GLADIA_URL } from "@/lib/external-urls"
import { Check, MessageSquare } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"

export const AppsCardStack = () => {
    const [currentCard, setCurrentCard] = useState(0)
    const totalCards = 2

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCard((prev) => (prev + 1) % totalCards)
        }, 6000) // Change card every 6 seconds

        return () => clearInterval(interval)
    }, [])

    const cards = [
        // Card 1 - AI Chat
        <motion.div
            key="app-card-0"
            variants={cardContainerVariant("0%", 0.3)}
            initial={currentCard === 0 ? "visible" : "hidden"}
            animate={currentCard === 0 ? "visible" : "hidden"}
            className="flex h-full w-full flex-col justify-between gap-3 rounded-2xl bg-background p-4"
        >
            <div className="flex flex-col items-center gap-3">
                <motion.div
                    variants={cardItemVariant(0.6)}
                    className="flex max-w-48 items-center gap-2 rounded-full bg-foreground px-3 py-2 font-medium text-primary-foreground text-sm opacity-50"
                >
                    <MessageSquare size={16} /> LLM Agnostic
                </motion.div>
                <motion.div
                    variants={cardItemVariant()}
                    className="flex min-w-52 items-center justify-center gap-2 rounded-full bg-foreground px-3 py-2 font-medium text-primary-foreground text-sm"
                >
                    <Check size={16} /> Meeting BaaS integrated
                </motion.div>
            </div>
            <motion.div variants={cardItemVariant()}>
                <div className="font-medium text-xl">AI Chat</div>
                <div className="text-muted-foreground text-sm">
                    Send bot to meetings in seconds
                </div>
            </motion.div>
        </motion.div>,

        // Card 2 - Transcript Viewer
        <motion.div
            key="app-card-1"
            variants={cardContainerVariant("0%", 0.3)}
            initial={currentCard === 1 ? "visible" : "hidden"}
            animate={currentCard === 1 ? "visible" : "hidden"}
            className="flex h-full w-full flex-col justify-between gap-3 rounded-2xl bg-baas-neutral-400 p-4 text-primary"
        >
            <motion.div variants={cardItemVariant()}>
                <div className="font-semibold text-xl">Transcript Viewer</div>
                <div className="text-sm opacity-80">
                    Transcription playground, powered by{" "}
                    <Button
                        variant="link"
                        className="h-auto p-0 font-semibold text-primary"
                        asChild
                    >
                        <Link
                            href={GLADIA_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit Gladia website (opens in new tab)"
                        >
                            Gladia
                        </Link>
                    </Button>
                </div>
            </motion.div>
            <motion.div variants={cardItemVariant()}>
                <svg
                    width="12em"
                    height="2.5em"
                    viewBox="0 0 181 39"
                    fill="none"
                    className="fill-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Transcript visualization"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <title>Transcript visualisation</title>
                    <rect
                        x="0.00976562"
                        y="0.376953"
                        width="46.2077"
                        height="9.06034"
                        rx="4.53017"
                    />
                    <rect
                        x="61.6201"
                        y="0.376953"
                        width="91.5094"
                        height="9.06034"
                        rx="4.53017"
                    />
                    <rect
                        x="168.532"
                        y="0.376953"
                        width="11.7784"
                        height="9.06034"
                        rx="4.53017"
                    />
                    <rect
                        x="0.00976562"
                        y="14.873"
                        width="66.1405"
                        height="9.06034"
                        rx="4.53017"
                    />
                    <rect
                        x="81.5527"
                        y="14.873"
                        width="97.8516"
                        height="9.06034"
                        rx="4.53017"
                    />
                    <rect
                        x="0.00976562"
                        y="29.3691"
                        width="104.194"
                        height="9.06034"
                        rx="4.53017"
                    />
                </svg>
            </motion.div>
        </motion.div>
    ]

    return (
        <>
            {cards}
        </>
    )
}
