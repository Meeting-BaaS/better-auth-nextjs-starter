import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { McpServerSpec } from "@/lib/mcp-specs"
import { AI_CHAT_URL } from "@/lib/external-urls"

const newChatMessage =
    "Hi, can you please send a bot to this meeting (provided a meeting link) or try other API calls?"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getConfigJson(server: McpServerSpec, reveal: boolean, apiKey?: string) {
    const env: Record<string, string> = {}
    if (server.envVars) {
        for (const envVar of server.envVars) {
            if ((envVar.label === "API_KEY" || envVar.label === "x-meeting-baas-api-key") && apiKey) {
                env[envVar.label] = apiKey
            } else {
                env[envVar.label] = envVar.sensitive && !reveal ? "********" : envVar.value || ""
            }
        }
    }
    return JSON.stringify(
        {
            name: server.name,
            description: server.description,
            githubUrl: server.githubUrl,
            env
        },
        null,
        2
    )
}

export function getNewChatUrl() {
    const searchParams = new URLSearchParams()
    searchParams.set("new_chat_message", newChatMessage)
    return `${AI_CHAT_URL}?${searchParams.toString()}`
}
