import { GoogleLogo } from "@/components/icons/google"
import { MicrosoftLogo } from "../icons/microsoft"
import { GitHubLogo } from "../icons/github"
import { GitLabLogo } from "../icons/gitlab"
import { ZoomLogo } from "../icons/zoom"

interface Provider {
    name: "google" | "microsoft" | "github" | "gitlab" | "zoom"
    title: string
    logo: React.ReactNode
}

export const keyProviders: Provider[] = [
    {
        name: "google",
        title: "Google",
        logo: <GoogleLogo />
    },
    {
        name: "microsoft",
        title: "Microsoft",
        logo: <MicrosoftLogo />
    }
]

export const otherProviders: Provider[] = [
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
