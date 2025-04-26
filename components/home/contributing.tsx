import { ExternalLink, Heart } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import * as motion from "motion/react-client"

export const Contributing = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                ease: "easeInOut",
                delay: 0.5,
                duration: 0.25
            }}
            className="mb-16 flex flex-col items-center px-4 text-center"
        >
            <div className="flex items-center gap-2">
                <h2 className="mb-4 font-semibold text-xl sm:text-2xl">Meeting BaaS</h2>
                <Heart
                    className="mb-4 size-7 fill-primary/30 text-primary transition-transform hover:scale-125"
                    aria-label="Love"
                />
                <h2 className="mb-4 font-semibold text-xl sm:text-2xl">open-source</h2>
            </div>
            <nav className="flex flex-row items-center gap-2" aria-label="Contribution link">
                <Button asChild>
                    <Link
                        href="https://github.com/Meeting-Baas" // Contribution link for all meeting baas repos
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <span className="flex items-center gap-2">
                            <ExternalLink />
                            Contribute
                        </span>
                    </Link>
                </Button>
            </nav>
        </motion.div>
    )
}
