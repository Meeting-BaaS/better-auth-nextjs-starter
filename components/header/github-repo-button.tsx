import Link from "next/link"
import { Button } from "../ui/button"
import { GitHubLogo } from "../icons/github"

export const GitHubRepoButton = () => {
    return (
        <Button variant="outline" className="fill-foreground px-2 py-1.5" asChild>
            <Link
                href="https://github.com/Meeting-Baas/better-auth-nextjs-starter"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className="flex items-center gap-2">
                    <GitHubLogo />
                    GitHub
                </span>
            </Link>
        </Button>
    )
}
