import { opacityVariant } from "@/animations/opacity"
import * as motion from "motion/react-client"

export const Heading = ({ text = "Meeting BaaS Developer Hub" }: { text?: string }) => {
    return (
        <div className="my-8 flex justify-center md:my-12 lg:my-20">
            <motion.h1
                {...opacityVariant()}
                className="scroll-m-20 text-center font-bold text-3xl tracking-tight md:text-left md:text-4xl lg:text-5xl"
            >
                {text}
            </motion.h1>
        </div>
    )
}
