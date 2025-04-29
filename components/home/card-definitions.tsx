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

const {
    ENVIRONMENT,
    MEETING_BAAS_API_DOCS,
    AI_CHAT_APP,
    AI_CHAT_GITHUB,
    REAL_TIME_TRANSCRIPTION_GITHUB,
    SPEAKING_BOTS_DOCS,
    SPEAKING_BOTS_GITHUB,
    TRANSCRIPT_SEEKER_APP,
    TRANSCRIPT_SEEKER_DOCS,
    TRANSCRIPT_SEEKER_GITHUB,
    SETTINGS_REDIRECTION_URL,
    LOGS_REDIRECTION_URL,
    USAGE_REDIRECTION_URL,
    BILLING_REDIRECTION_URL,
    CREDENTIALS_REDIRECTION_URL
} = process.env

const environment = ENVIRONMENT || ""

export const SETTINGS_URL =
    SETTINGS_REDIRECTION_URL || `https://settings.${environment}meetingbaas.com`
export const LOGS_URL = LOGS_REDIRECTION_URL || `${SETTINGS_URL}/logs`
export const USAGE_URL = USAGE_REDIRECTION_URL || `${SETTINGS_URL}/usage`
export const BILLING_URL = BILLING_REDIRECTION_URL || `${SETTINGS_URL}/billing`
export const CREDENTIALS_URL = CREDENTIALS_REDIRECTION_URL || `${SETTINGS_URL}/credentials`

export const AI_CHAT_URL = AI_CHAT_APP || `https://chat.${environment}meetingbaas.com`

export const appCards: AppCard[] = [
    {
        title: "Meeting BaaS API",
        description:
            "Integrate seamlessly with Google Meet, Zoom, and Microsoft Teams using just one API. Automate recording, transcription, and summarisation.",
        links: [
            {
                href:
                    MEETING_BAAS_API_DOCS || `https://docs.${environment}meetingbaas.com/docs/api`,
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
                href: AI_CHAT_URL,
                type: "App",
                icon: <ExternalLink />
            },
            {
                href: AI_CHAT_GITHUB || "https://github.com/Meeting-Baas/ai-chat",
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
                href:
                    REAL_TIME_TRANSCRIPTION_GITHUB ||
                    "https://github.com/Meeting-Baas/realtime-meeting-transcription",
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
                href:
                    SPEAKING_BOTS_DOCS ||
                    `https://docs.${environment}meetingbaas.com/docs/speaking-bots`,
                type: "Docs",
                icon: <BookOpen />
            },
            {
                href:
                    SPEAKING_BOTS_GITHUB || "https://github.com/Meeting-Baas/speaking-meeting-bot",
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
                href: TRANSCRIPT_SEEKER_APP || "https://app.transcriptseeker.com/",
                type: "App",
                icon: <ExternalLink />
            },
            {
                href:
                    TRANSCRIPT_SEEKER_DOCS ||
                    `https://docs.${environment}meetingbaas.com/docs/transcript-seeker`,
                type: "Docs",
                icon: <BookOpen />
            },
            {
                href:
                    TRANSCRIPT_SEEKER_GITHUB || "https://github.com/Meeting-Baas/transcript-seeker",
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
        href: SETTINGS_URL,
        className: "border-r border-b rounded-tl-xl"
    },
    {
        icon: Logs,
        title: "Logs",
        href: LOGS_URL,
        className: "border-b rounded-tr-xl"
    },
    {
        icon: ChartGantt,
        title: "Usage",
        href: USAGE_URL,
        className: "border-r rounded-bl-xl"
    },
    {
        icon: ReceiptText,
        title: "Billing",
        href: BILLING_URL,
        className: "rounded-br-xl"
    }
]
