import { abstractImages } from "@/lib/images"
import AppsCardStack from "@/components/hero/apps-card-stack"
import FeaturesCardStack from "@/components/hero/features-card-stack"
import LogoCard from "./logo-card"
import * as motion from "motion/react-client"

export default function HeroSection() {
    const image = abstractImages[Math.floor(Math.random() * abstractImages.length)]

    const overlays: Record<number, React.ReactNode> = {
        1: <FeaturesCardStack />,
        4: <AppsCardStack />,
        5: <LogoCard />,
        8: (
            <div className="absolute bottom-0 w-full rounded-b-2xl bg-accent/40 px-2 py-1 text-foreground text-sm backdrop-blur-xs">
                <p>
                    Credit:{" "}
                    <a
                        href={image.author.url}
                        className="underline underline-offset-4 "
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        {image.author.name}
                    </a>
                </p>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: "-5%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{
                type: "spring",
                ease: "easeIn",
                stiffness: 80,
                damping: 20,
                duration: 1.5,
                delay: 0.5
            }}
            className="relative col-span-3 hidden h-full overflow-hidden rounded-2xl lg:block"
        >
            <div className="absolute inset-1 grid grid-cols-3 grid-rows-3 gap-4 rounded-2xl bg-background p-4">
                {Array.from({ length: 9 }).map((_, index) => {
                    const col = index % 3
                    const row = Math.floor(index / 3)

                    return (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-2xl bg-cover bg-transparent bg-no-repeat"
                            style={{
                                backgroundImage: `url('${image.url}')`,
                                backgroundSize: "300% 300%",
                                backgroundPosition: `${col * 50}% ${row * 50}%`
                            }}
                        >
                            {overlays[index] ?? null}
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )
}
