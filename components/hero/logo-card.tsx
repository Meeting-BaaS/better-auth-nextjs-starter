"use client"

import { motion } from "motion/react"
import { cardContainerVariant, cardItemVariant } from "./apps-card-stack"
import Image from "next/image"

const MotionImage = motion.create(Image)

export default function LogoCard() {
    return (
        <>
            <motion.div
                variants={cardContainerVariant("0%", 7)}
                initial="hidden"
                animate="visible"
                className="relative flex h-full w-full flex-col justify-between gap-3 rounded-2xl bg-baas-black p-4"
            >
                <MotionImage
                    src="/logo.svg"
                    alt="Meeting baas logo"
                    variants={cardItemVariant()}
                    priority
                    fill
                />
            </motion.div>
        </>
    )
}
