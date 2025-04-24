"use client"

import { motion } from "motion/react"
import Image from "next/image"
import SignInForm from "./sign-in-form"

export const containerVariant = {
    hidden: { opacity: 0, y: "5%" },
    visible: {
        opacity: 1,
        y: "0%",
        transition: {
            type: "spring",
            ease: "easeIn",
            stiffness: 80,
            damping: 20,
            duration: 1.5,
            delay: 0.5,
            staggerChildren: 0.15
        }
    }
}

export const itemVariant = {
    hidden: { opacity: 0, y: 5 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.25
        }
    }
}

export default function SignIn({
    redirectTo,
    error
}: { redirectTo: string | undefined; error: string | undefined }) {
    return (
        <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className="p-4 lg:col-span-2 lg:p-8"
        >
            <div className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <motion.div
                        variants={itemVariant}
                        className="flex items-center justify-center gap-2"
                    >
                        <Image
                            src="/logo.svg"
                            alt="Meeting baaS logo"
                            priority
                            width={30}
                            height={30}
                            className="h-9 w-9"
                        />
                    </motion.div>
                    <motion.h1
                        variants={itemVariant}
                        className="font-semibold text-2xl tracking-tight"
                    >
                        Welcome
                    </motion.h1>
                    <motion.p variants={itemVariant} className="text-muted-foreground text-sm">
                        Unlock all the features of Meeting BaaS
                    </motion.p>
                    <SignInForm redirectTo={redirectTo} error={error} />
                </div>
            </div>
        </motion.div>
    )
}
