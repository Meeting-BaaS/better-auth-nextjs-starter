import {
    AI_CHAT_GITHUB_URL,
    AI_CHAT_URL,
    BILLING_URL,
    CONTRIBUTION_GITHUB_URL,
    CREDENTIALS_URL,
    DISCORD_URL,
    LOGS_URL,
    MEETING_BAAS_API_DOCS_URL,
    TRANSCRIPT_SEEKER_APP_URL,
    TRANSCRIPT_SEEKER_DOCS_URL,
    TRANSCRIPT_SEEKER_GITHUB_URL,
    USAGE_URL
} from "@/lib/external-urls"
import {
    BookOpen,
    ChartGantt,
    ExternalLink,
    Logs,
    MessageSquare,
    ReceiptText,
    Settings,
    Video,
    Webhook
} from "lucide-react"
import { Discord } from "../icons/discord"
import { GitHubLogo } from "../icons/github"

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
            "View our API docs and guides to learn how to use our API to record, transcribe, and summarise meetings.",
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
            "Use our AI Chat to directly use the API using natural language, code using our SDK, and debug past bots.",
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
        title: "Logs Table",
        description:
            "View the logs of your meeting bots, and see the status of your meetings.",
        links: [
            {
                href: LOGS_URL,
                type: "App",
                icon: <ExternalLink />
            },
        ],
        icon: <Logs className={cardIconClasses} />
    },
    // {
    //     title: "Real-time Transcription",
    //     description:
    //         "Get real-time transcriptions during your meetings, with speaker identification and accurate text output.",
    //     links: [
    //         {
    //             href: REAL_TIME_TRANSCRIPTION_GITHUB_URL,
    //             type: "GitHub",
    //             icon: <GitHubLogo />
    //         }
    //     ],
    //     icon: <Captions className={cardIconClasses} />
    // },
    {
        title: "Discord",
        description:
            "Join our Discord server to get help, share your ideas, and connect with other users.",
        links: [
            {
                href: DISCORD_URL,
                type: "App",
                icon: <ExternalLink />
            }
        ],
        icon: <Discord />
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
        title: "Credentials",
        href: CREDENTIALS_URL,
        className: "border-r border-b rounded-tl-xl"
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
    },
    {
        icon: <GitHubLogo className={utilityIconClasses} />,
        title: "GitHub",
        href: CONTRIBUTION_GITHUB_URL,
        className: "border-b rounded-tr-xl"
    }
]
