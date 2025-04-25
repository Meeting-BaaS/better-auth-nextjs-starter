import * as motion from "motion/react-client"

export const Heading = () => {
    return (
        <div className="my-8 flex justify-center md:my-12 lg:my-20">
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    ease: "easeInOut",
                    duration: 0.25
                }}
                className="scroll-m-20 font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl"
            >
                Our AI-Powered Meeting BaaS Toolkit
            </motion.h1>
        </div>
    )
}
