"use client"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { Airplay, Moon, Sun } from "lucide-react"
import { motion } from "motion/react"
import { useTheme } from "next-themes"
import { type HTMLAttributes, useLayoutEffect, useState } from "react"

const themes = [
    {
        key: "light",
        icon: Sun,
        label: "Light theme"
    },
    {
        key: "dark",
        icon: Moon,
        label: "Dark theme"
    },
    {
        key: "system",
        icon: Airplay,
        label: "System theme"
    }
]

const itemVariants = cva(
    "relative size-4.5 cursor-pointer rounded-full p-1 text-fd-muted-foreground",
    {
        variants: {
            active: {
                true: "text-fd-accent-foreground",
                false: "text-fd-muted-foreground"
            }
        }
    }
)

type Theme = "light" | "dark" | "system"

export function ThemeToggle({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    const { setTheme, theme: currentTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    const container = cn(
        "relative flex items-center rounded-full p-1 ring-1 ring-border",
        className
    )

    useLayoutEffect(() => {
        setMounted(true)
    }, [])

    const handleChangeTheme = async (theme: Theme) => {
        function update() {
            setTheme(theme)
        }

        if (document.startViewTransition && theme !== resolvedTheme) {
            document.documentElement.style.viewTransitionName = "theme-transition"
            await document.startViewTransition(update).finished
            document.documentElement.style.viewTransitionName = ""
        } else {
            update()
        }
    }

    const value = mounted ? currentTheme : null

    return (
        <div className={container} {...props}>
            {themes.map(({ key, icon: Icon, label }) => {
                const isActive = value === key

                return (
                    <button
                        type="button"
                        key={key}
                        className={itemVariants({ active: isActive })}
                        onClick={() => handleChangeTheme(key as Theme)}
                        aria-label={label}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeTheme"
                                className="absolute inset-0 rounded-full bg-accent"
                                transition={{
                                    type: "spring",
                                    duration: 1
                                }}
                            />
                        )}
                        <Icon className="relative m-auto size-full" fill="currentColor" />
                    </button>
                )
            })}
        </div>
    )
}
