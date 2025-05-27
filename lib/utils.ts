import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { McpServerSpec } from "@/lib/mcp-specs"

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
