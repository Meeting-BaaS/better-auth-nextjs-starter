import Link from "next/link"
import { Button } from "../ui/button"
import { GitHubLogo } from "../icons/github"
import { AUTH_APP_GITHUB_URL } from "@/lib/external-urls"

export const GitHubRepoButton = () => {
    return (
        <Button variant="outline" className="fill-foreground px-2 py-1.5" asChild>
            <Link href={AUTH_APP_GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <span className="flex items-center gap-2">
                    <GitHubLogo aria-hidden />
                    GitHub
                </span>
            </Link>
        </Button>
    )
}
