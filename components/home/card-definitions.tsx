import {
    BookOpen,
    Bot,
    Captions,
    ChartGantt,
    ExternalLink,
    Logs,
    type LucideProps,
    MessageSquare,
    ReceiptText,
    Settings,
    Video,
    Webhook
} from "lucide-react"
import { GitHubLogo } from "../icons/github"
import type { ForwardRefExoticComponent, RefAttributes } from "react"

export type AppLink = {
    href: string
    type: "Docs" | "App" | "GitHub"
    icon: React.ReactNode
}

export type AppCard = {
    title: string
    description: string
    links: AppLink[]
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export type Utility = {
    href: string
    title: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    className?: string
}

export const appCards: AppCard[] = [
    {
        title: "Meeting BaaS API",
        description:
            "Integrate seamlessly with Google Meet, Zoom, and Microsoft Teams using just one API. Automate recording, transcription, and summarisation.",
        links: [
            {
                href: "https://docs.meetingbaas.com/docs/api",
                type: "Docs",
                icon: <BookOpen />
            }
        ],
        icon: Webhook
    },
    {
        title: "AI Chat",
        description:
            "Experience AI with Meeting BaaS. Chat directly in your browser to explore features or assist with meeting bots.",
        links: [
            {
                href: "https://chat.meetingbaas.com/",
                type: "App",
                icon: <ExternalLink />
            },
            {
                href: "https://github.com/Meeting-Baas/ai-chat",
                type: "GitHub",
                icon: <GitHubLogo />
            }
        ],
        icon: MessageSquare
    },
    {
        title: "Real-time Transcription",
        description:
            "Get real-time transcriptions during your meetings, with speaker identification and accurate text output.",
        links: [
            {
                href: "https://github.com/Meeting-Baas/realtime-meeting-transcription",
                type: "GitHub",
                icon: <GitHubLogo />
            }
        ],
        icon: Captions
    },
    {
        title: "Speaking Bot",
        description:
            "Send customized AI-powered agents to join meetings, speak, and interact with participants.",
        links: [
            {
                href: "https://docs.meetingbaas.com/docs/speaking-bots",
                type: "Docs",
                icon: <BookOpen />
            },
            {
                href: "https://github.com/Meeting-Baas/speaking-meeting-bot",
                type: "GitHub",
                icon: <GitHubLogo />
            }
        ],
        icon: Bot
    },
    {
        title: "Transcript Seeker",
        description:
            "Upload, transcribe, and chat with your meeting recordings. Powered by advanced transcription APIs and meeting bot technology.",
        links: [
            {
                href: "https://app.transcriptseeker.com/",
                type: "App",
                icon: <ExternalLink />
            },
            {
                href: "https://docs.meetingbaas.com/docs/transcript-seeker",
                type: "Docs",
                icon: <BookOpen />
            },
            {
                href: "https://github.com/Meeting-Baas/transcript-seeker",
                type: "GitHub",
                icon: <GitHubLogo />
            }
        ],
        icon: Video
    }
]

export const utilities: Utility[] = [
    {
        icon: Settings,
        title: "Settings",
        href: "https://settings.meetingbaas.com",
        className: "border-r border-b rounded-tl-xl"
    },
    {
        icon: Logs,
        title: "Logs",
        href: "https://meetingbaas.com/logs",
        className: "border-b rounded-tr-xl"
    },
    {
        icon: ChartGantt,
        title: "Usage",
        href: "https://meetingbaas.com/usage",
        className: "border-r rounded-bl-xl"
    },
    {
        icon: ReceiptText,
        title: "Billing",
        href: "https://meetingbaas.com/billing",
        className: "rounded-br-xl"
    }
]
