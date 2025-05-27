import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Copy, Check, Globe, Key } from "lucide-react"
import { GitHubLogo } from "@/components/icons/github"
import type { McpServerSpec } from "@/lib/mcp-specs"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Prism from "react-syntax-highlighter/dist/esm/prism"
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism"
import { toast } from "sonner"
import { getConfigJson } from "@/lib/utils"

interface McpCardProps {
    server: McpServerSpec
    theme?: string
    apiKey?: string
}

export const McpCard = ({ server, theme, apiKey }: McpCardProps) => {
    const [reveal, setReveal] = useState(false)
    const [copied, setCopied] = useState(false)
    const [injected, setInjected] = useState(false)
    const configJson = getConfigJson(server, reveal, injected ? apiKey : undefined)

    const handleCopy = async () => {
        try {
            // Always copy the revealed version, regardless of current reveal state
            const revealedConfig = getConfigJson(server, true, injected ? apiKey : undefined)
            await navigator.clipboard.writeText(revealedConfig)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (e) {
            console.error("Error copying to clipboard", e)
            toast.error("Error copying to clipboard")
        }
    }

    const serverNeedsApiKey = server.envVars.some((env) => env.label === "API_KEY")

    return (
        <Card className="group relative grow">
            <CardContent className="flex grow flex-col justify-between gap-2 pt-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 font-semibold text-xl">
                        {server.displayName}
                    </div>
                    <div className="text-base text-neutral-500 leading-relaxed dark:text-neutral-400">
                        {server.description}
                    </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                    {server.serverUrl && (
                        <Button variant="link" className="h-auto p-0 has-[>svg]:px-0" asChild>
                            <Link href={server.serverUrl} target="_blank" rel="noopener noreferrer">
                                <Globe className="text-card-foreground" />
                                Server URL
                            </Link>
                        </Button>
                    )}
                    <Button variant="link" className="h-auto p-0 has-[>svg]:px-0" asChild>
                        <Link href={server.githubUrl} target="_blank" rel="noopener noreferrer">
                            <GitHubLogo className="fill-card-foreground" />
                            GitHub
                        </Link>
                    </Button>
                </div>
                <div className="flex items-center justify-end gap-2">
                    {serverNeedsApiKey && apiKey && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="px-3 py-1.5"
                            onClick={() => setInjected((i) => !i)}
                        >
                            <Key className={injected ? "stroke-primary" : ""} />
                            {injected ? "Remove API key" : "Use my API key"}
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        className="px-3 py-1.5"
                        onClick={() => setReveal((r) => !r)}
                    >
                        {reveal ? <EyeOff /> : <Eye />}
                        {reveal ? "Hide sensitive values" : "Show sensitive values"}
                    </Button>
                </div>
                <div className="relative">
                    <Prism
                        language="json"
                        style={theme === "dark" ? vscDarkPlus : vs}
                        wrapLines
                        wrapLongLines
                        customStyle={{
                            borderRadius: "var(--radius)",
                            border: "1px solid var(--border)"
                        }}
                        codeTagProps={{
                            style: {
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                                display: "block"
                            }
                        }}
                    >
                        {configJson}
                    </Prism>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="pointer-touch-opacity-100 absolute top-2 right-0 opacity-0 transition-opacity focus-within:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100"
                        onClick={handleCopy}
                        aria-label={copied ? "Copied" : "Copy JSON config"}
                    >
                        {copied ? <Check className="stroke-primary" /> : <Copy />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
