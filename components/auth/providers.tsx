import { GoogleLogo } from "@/components/icons/google"
import { MicrosoftLogo } from "../icons/microsoft"
import { GitHubLogo } from "../icons/github"
import { GitLabLogo } from "../icons/gitlab"
import { ZoomLogo } from "../icons/zoom"

interface Provider {
    name: "google" | "microsoft" | "github" | "gitlab" | "zoom"
    title: string
    logo: React.ReactNode
    primary?: boolean
}

export const providers: Provider[] = [
    {
        name: "google",
        title: "Google",
        logo: <GoogleLogo />,
        primary: true
    },
    {
        name: "microsoft",
        title: "Microsoft",
        logo: <MicrosoftLogo />
    },
    {
        name: "github",
        title: "GitHub",
        logo: <GitHubLogo />
    },
    {
        name: "gitlab",
        title: "GitLab",
        logo: <GitLabLogo />
    },
    {
        name: "zoom",
        title: "Zoom",
        logo: <ZoomLogo />
    }
]
