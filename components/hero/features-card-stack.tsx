"use client"

import { cardContainerVariant, cardItemVariant } from "@/animations/auth/auth-card-stacks"
import { Code, Library, MessageSquare, Server } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import { useEffect, useState } from "react"

const MotionImage = motion.create(Image)

export const FeaturesCardStack = () => {
    const [currentCard, setCurrentCard] = useState(0)
    const totalCards = 5

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCard((prev) => (prev + 1) % totalCards)
        }, 6000) // Change card every 6 seconds

        return () => clearInterval(interval)
    }, [])

    const cards = [
        // Card 1 - Maximum Customisation
        <motion.div
            key="card-0"
            variants={cardContainerVariant("0%", 0.3)}
            initial={currentCard === 0 ? "visible" : "hidden"}
            animate={currentCard === 0 ? "visible" : "hidden"}
            className="flex h-full w-full flex-col justify-between gap-3 rounded-2xl bg-primary p-4 text-primary-foreground"
        >
            <div>
                <motion.div variants={cardItemVariant()} className="font-semibold text-xl">
                    Maximum Customisation
                </motion.div>
                <motion.div variants={cardItemVariant()} className="text-sm opacity-80">
                    Built for developers, structured for open source contributions and easy self
                    hosting
                </motion.div>
            </div>
            <motion.div variants={cardItemVariant()} className="flex justify-end">
                <Code className="h-10 w-10 rounded-full bg-white/20 p-2 backdrop-blur-md" />
            </motion.div>
        </motion.div>,

        // Card 2 - Detailed Documentation
        <motion.div
            key="card-1"
            variants={cardContainerVariant("0%", 0.3)}
            initial={currentCard === 1 ? "visible" : "hidden"}
            animate={currentCard === 1 ? "visible" : "hidden"}
            className="flex h-full w-full flex-col justify-between gap-3 rounded-2xl bg-primary p-4 text-primary-foreground"
        >
            <MotionImage
                src="/search-snippet.png"
                alt="Search box snippet"
                width={250}
                height={150}
                variants={cardItemVariant()}
                className="w-full"
                priority
            />

            <motion.div variants={cardItemVariant()}>
                <div className="font-medium text-xl">Detailed Documentation</div>
                <div className="text-primary-foreground text-sm opacity-80">
                    Easily integrate with APIs and SDKs using our extensive docs
                </div>
            </motion.div>
        </motion.div>,

        // Card 3 - MCP Servers & Tools
        <motion.div
            key="card-2"
            variants={cardContainerVariant("0%", 0.3)}
            initial={currentCard === 2 ? "visible" : "hidden"}
            animate={currentCard === 2 ? "visible" : "hidden"}
            className="flex h-full w-full flex-col justify-between gap-3 rounded-2xl bg-primary p-4 text-primary-foreground"
        >
            <div>
                <motion.div variants={cardItemVariant()} className="font-semibold text-xl">
                    MCP Servers & Tools
                </motion.div>
                <motion.div variants={cardItemVariant()} className="text-sm opacity-80">
                    Model Context Protocol for AI assistants with pre-generated tools for easy integration
                </motion.div>
            </div>
            <motion.div variants={cardItemVariant()} className="flex justify-end">
                <Server className="h-10 w-10 rounded-full bg-white/20 p-2 backdrop-blur-md" />
            </motion.div>
        </motion.div>,

        // Card 4 - Speaking Bots
        <motion.div
            key="card-3"
            variants={cardContainerVariant("0%", 0.3)}
            initial={currentCard === 3 ? "visible" : "hidden"}
            animate={currentCard === 3 ? "visible" : "hidden"}
            className="flex h-full w-full flex-col justify-between gap-3 rounded-2xl bg-primary p-4 text-primary-foreground"
        >
            <div>
                <motion.div variants={cardItemVariant()} className="font-semibold text-xl">
                    Speaking Bots
                </motion.div>
                <motion.div variants={cardItemVariant()} className="text-sm opacity-80">
                    AI-powered agents that join and participate in video meetings with custom personas
                </motion.div>
            </div>
            <motion.div variants={cardItemVariant()} className="flex justify-end">
                <MessageSquare className="h-10 w-10 rounded-full bg-white/20 p-2 backdrop-blur-md" />
            </motion.div>
        </motion.div>,

        // Card 5 - TypeScript SDK
        <motion.div
            key="card-4"
            variants={cardContainerVariant("0%", 0.3)}
            initial={currentCard === 4 ? "visible" : "hidden"}
            animate={currentCard === 4 ? "visible" : "hidden"}
            className="flex h-full w-full flex-col justify-between gap-3 rounded-2xl bg-primary p-4 text-primary-foreground"
        >
            <div>
                <motion.div variants={cardItemVariant()} className="font-semibold text-xl">
                    TypeScript SDK
                </motion.div>
                <motion.div variants={cardItemVariant()} className="text-sm opacity-80">
                    Complete type safety with comprehensive TypeScript definitions for all Meeting BaaS APIs
                </motion.div>
            </div>
            <motion.div variants={cardItemVariant()} className="flex justify-end">
                <Library className="h-10 w-10 rounded-full bg-white/20 p-2 backdrop-blur-md" />
            </motion.div>
        </motion.div>
    ]

    return (
        <>
            {cards}
        </>
    )
}
