export type McpServerSpec = {
    name: string
    displayName: string
    description: string
    githubUrl: string
    serverUrl?: string
    envVars: { label: string; value: string | null; sensitive?: boolean }[]
}

export const mcpSpecs: McpServerSpec[] = [
    {
        name: "mcp-on-vercel",
        displayName: "BaaS API",
        description: "The BaaS API MCP, built with our official SDK.",
        githubUrl: "https://github.com/Meeting-Baas/mcp-on-vercel",
        serverUrl: "https://mcp.meetingbaas.com",
        envVars: [{ label: "REDIS_URL", value: "redis://vercel:6379", sensitive: true }]
    },
    {
        name: "mcp-on-vercel-documentation",
        displayName: "BaaS API Documentation",
        description:
            "An MCP server to deliver context to your code editor and the MeetingBaaS chat.",
        githubUrl: "https://github.com/Meeting-Baas/mcp-on-vercel-documentation",
        serverUrl: "https://mcp-documentation.meetingbaas.com/sse",
        envVars: [{ label: "REDIS_URL", value: "redis://vercel-doc:6379", sensitive: true }]
    },
    {
        name: "speaking-bots-mcp",
        displayName: "Speaking Bots",
        description: "An MCP server that can send speaking bots inside meetings. Hosted.",
        githubUrl: "https://github.com/Meeting-Baas/speaking-bots-mcp",
        serverUrl: "https://speaking-bots-mcp.meetingbaas.com",
        envVars: [{ label: "REDIS_URL", value: "redis://localhost:6379", sensitive: true }]
    },
    {
        name: "meeting-mcp",
        displayName: "End User Meetings",
        description:
            "MVP. MCP server to search transcripts, manage meeting recordings, and more. Runs locally.",
        githubUrl: "https://github.com/Meeting-Baas/meeting-mcp",
        envVars: [
            { label: "REDIS_URL", value: "redis://localhost:6379", sensitive: true },
            { label: "API_KEY", value: "your-api-key-here", sensitive: true }
        ]
    }
]
