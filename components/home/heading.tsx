import { opacityVariant } from "@/animations/opacity"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

interface HeadingProps {
    title?: string
    description?: string | React.ReactNode
    titleContainerClassName?: string
    descriptionContainerClassName?: string
}

export const Heading = ({
    title = "Meeting BaaS Developer Hub",
    description,
    titleContainerClassName,
    descriptionContainerClassName
}: HeadingProps) => {
    return (
        <>
            <div
                className={cn(
                    "my-8 flex justify-center md:my-12 lg:my-20",
                    titleContainerClassName
                )}
            >
                <motion.h1
                    {...opacityVariant()}
                    className="scroll-m-20 text-center font-bold text-3xl tracking-tight md:text-left md:text-4xl lg:text-5xl"
                >
                    {title}
                </motion.h1>
            </div>
            {description && (
                <div
                    className={cn(
                        "mx-auto my-2 max-w-3xl text-center text-lg text-muted-foreground md:mb-4 lg:mb-6",
                        descriptionContainerClassName
                    )}
                >
                    {description}
                </div>
            )}
        </>
    )
}
