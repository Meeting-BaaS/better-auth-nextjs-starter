import { GoogleLogo } from "@/components/icons/google"
import { MicrosoftLogo } from "../icons/microsoft"
import { GitHubLogo } from "../icons/github"
import { GitLabLogo } from "../icons/gitlab"
import { ZoomLogo } from "../icons/zoom"

export type ProviderName = "google" | "microsoft" | "github" | "gitlab" | "zoom"

interface Provider {
    name: ProviderName
    title: string
    logo: React.ReactNode
    primary?: boolean
    className?: string
}

export const primaryProvider: Provider = {
    name: "google",
    title: "Google",
    logo: <GoogleLogo />,
    primary: true
}

export const providers: Provider[] = [
    {
        name: "microsoft",
        title: "Microsoft",
        logo: <MicrosoftLogo />,
        className: "hover:bg-microsoft-grey"
    },
    {
        name: "github",
        title: "GitHub",
        logo: <GitHubLogo />,
        className: "hover:bg-github-green"
    },
    {
        name: "gitlab",
        title: "GitLab",
        logo: <GitLabLogo />,
        className: "hover:bg-gitlab-orange"
    },
    {
        name: "zoom",
        title: "Zoom",
        logo: <ZoomLogo />,
        className: "hover:bg-zoom-blue"
    }
]
