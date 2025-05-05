import { ExternalLink, Heart } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import * as motion from "motion/react-client"
import { CONTRIBUTION_GITHUB_URL } from "@/lib/external-urls"
import { opacityVariant } from "@/animations/opacity"

export const Contributing = () => {
    return (
        <motion.div
            {...opacityVariant(0.5)}
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
                        href={CONTRIBUTION_GITHUB_URL} // Contribution link for all meeting baas repos
                        target="_blank"
                        rel="noopener noreferrer"
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
