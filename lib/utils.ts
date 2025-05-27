import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { McpServerSpec } from "@/lib/mcp-specs"
import { AI_CHAT_URL } from "@/lib/external-urls"

const newChatMessage =
    "Hi, I have just signed up to Meeting BaaS and I'm looking for some help getting started."

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getConfigJson(server: McpServerSpec, reveal: boolean, apiKey?: string) {
    const env: Record<string, string> = {}
    for (const envVar of server.envVars) {
        if (envVar.label === "API_KEY" && apiKey) {
            env[envVar.label] = apiKey
        } else {
            env[envVar.label] = envVar.sensitive && !reveal ? "********" : envVar.value || ""
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
