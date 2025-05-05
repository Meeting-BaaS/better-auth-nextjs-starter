import {
    BookOpen,
    Bot,
    Captions,
    ChartGantt,
    ExternalLink,
    Logs,
    MessageSquare,
    ReceiptText,
    Settings,
    Video,
    Webhook
} from "lucide-react"
import { GitHubLogo } from "../icons/github"
import {
    AI_CHAT_GITHUB_URL,
    AI_CHAT_URL,
    BILLING_URL,
    LOGS_URL,
    MEETING_BAAS_API_DOCS_URL,
    REAL_TIME_TRANSCRIPTION_GITHUB_URL,
    SETTINGS_URL,
    SPEAKING_BOTS_DOCS_URL,
    SPEAKING_BOTS_GITHUB_URL,
    TRANSCRIPT_SEEKER_APP_URL,
    TRANSCRIPT_SEEKER_DOCS_URL,
    TRANSCRIPT_SEEKER_GITHUB_URL,
    USAGE_URL
} from "@/lib/external-urls"

export type AppLink = {
    href: string
    type: "Docs" | "App" | "GitHub"
    icon: React.ReactNode
}

export type AppCard = {
    title: string
    description: string
    links: AppLink[]
    icon: React.ReactNode
}

export type Utility = {
    href: string
    title: string
    icon: React.ReactNode
    className?: string
}

const cardIconClasses = "size-5.5"
const utilityIconClasses = cardIconClasses

export const appCards: AppCard[] = [
    {
        title: "Meeting BaaS API",
        description:
            "Integrate seamlessly with Google Meet, Zoom, and Microsoft Teams using just one API. Automate recording, transcription, and summarisation.",
        links: [
            {
                href: MEETING_BAAS_API_DOCS_URL,
                type: "Docs",
                icon: <BookOpen />
            }
        ],
        icon: <Webhook className={cardIconClasses} />
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
                href: AI_CHAT_GITHUB_URL,
                type: "GitHub",
                icon: <GitHubLogo />
            }
        ],
        icon: <MessageSquare className={cardIconClasses} />
    },
    {
        title: "Real-time Transcription",
        description:
            "Get real-time transcriptions during your meetings, with speaker identification and accurate text output.",
        links: [
            {
                href: REAL_TIME_TRANSCRIPTION_GITHUB_URL,
                type: "GitHub",
                icon: <GitHubLogo />
            }
        ],
        icon: <Captions className={cardIconClasses} />
    },
    {
        title: "Speaking Bot",
        description:
            "Send customized AI-powered agents to join meetings, speak, and interact with participants.",
        links: [
            {
                href: SPEAKING_BOTS_DOCS_URL,
                type: "Docs",
                icon: <BookOpen />
            },
            {
                href: SPEAKING_BOTS_GITHUB_URL,
                type: "GitHub",
                icon: <GitHubLogo />
            }
        ],
        icon: <Bot className={cardIconClasses} />
    },
    {
        title: "Transcript Seeker",
        description:
            "Upload, transcribe, and chat with your meeting recordings. Powered by advanced transcription APIs and meeting bot technology.",
        links: [
            {
                href: TRANSCRIPT_SEEKER_APP_URL,
                type: "App",
                icon: <ExternalLink />
            },
            {
                href: TRANSCRIPT_SEEKER_DOCS_URL,
                type: "Docs",
                icon: <BookOpen />
            },
            {
                href: TRANSCRIPT_SEEKER_GITHUB_URL,
                type: "GitHub",
                icon: <GitHubLogo />
            }
        ],
        icon: <Video className={cardIconClasses} />
    }
]

export const utilities: Utility[] = [
    {
        icon: <Settings className={utilityIconClasses} />,
        title: "Settings",
        href: SETTINGS_URL,
        className: "border-r border-b rounded-tl-xl"
    },
    {
        icon: <Logs className={utilityIconClasses} />,
        title: "Logs",
        href: LOGS_URL,
        className: "border-b rounded-tr-xl"
    },
    {
        icon: <ChartGantt className={utilityIconClasses} />,
        title: "Usage",
        href: USAGE_URL,
        className: "border-r rounded-bl-xl"
    },
    {
        icon: <ReceiptText className={utilityIconClasses} />,
        title: "Billing",
        href: BILLING_URL,
        className: "rounded-br-xl"
    }
]
