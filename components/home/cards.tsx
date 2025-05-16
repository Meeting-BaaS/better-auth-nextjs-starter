'use client'

import { appCards, utilities, type AppLink } from "@/components/home/card-definitions"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import * as motion from "motion/react-client"
import { homeCardsVariant } from "@/animations/home-cards"
import { fetchMcpSpecs, type McpServerSpec } from "@/components/home/card-definitions"
import { useState, useEffect } from "react"
import { Eye, EyeOff, ExternalLink, Copy, Check } from "lucide-react"

function getConfigJson(server: McpServerSpec, reveal: boolean) {
    const env: Record<string, string> = {}
    server.envVars.forEach((envVar) => {
        env[envVar.label] = envVar.sensitive && !reveal ? "********" : envVar.value || ""
    })
    return JSON.stringify({
        name: server.name,
        description: server.description,
        githubUrl: server.githubUrl,
        env
    }, null, 2)
}

const McpCard = ({ server }: { server: McpServerSpec }) => {
    const [reveal, setReveal] = useState(false)
    const [copied, setCopied] = useState(false)
    const configJson = getConfigJson(server, reveal)
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(configJson)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (e) {}
    }
    return (
        <div className="group relative grow border border-border rounded-xl bg-card text-card-foreground shadow p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 font-semibold text-lg mb-2">
                {server.name}
                <a href={server.githubUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500"><ExternalLink size={16} /></a>
            </div>
            <div className="text-md text-muted-foreground leading-relaxed mb-2">
                {server.description}
            </div>
            <div className="flex items-center gap-2 mb-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="px-3 py-1.5"
                    onClick={() => setReveal((r) => !r)}
                >
                    {reveal ? <EyeOff size={16} /> : <Eye size={16} />}
                    {reveal ? "Hide sensitive values" : "Show sensitive values"}
                </Button>
            </div>
            <div className="relative">
                <pre className="overflow-x-auto rounded bg-card text-card-foreground border border-border p-4 text-sm font-mono leading-snug whitespace-pre-wrap min-h-[180px] selection:bg-accent selection:text-foreground">
                    {configJson}
                </pre>
                <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={handleCopy}
                    aria-label="Copy JSON config"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied" : "Copy"}
                </Button>
            </div>
        </div>
    )
}

export const Cards = () => {
    const [showMcp, setShowMcp] = useState(false)
    const [specs, setSpecs] = useState<McpServerSpec[]>([])

    useEffect(() => {
        if (showMcp) {
            fetchMcpSpecs().then(setSpecs)
        }
    }, [showMcp])

    if (showMcp) {
        return (
            <div className="mx-auto max-w-6xl py-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">MCP Servers</h2>
                    <Button
                        variant="default"
                        size="lg"
                        className="font-bold shadow-lg px-8 py-3 text-lg bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-4 focus-visible:ring-primary/40"
                        onClick={() => setShowMcp(false)}
                    >
                        ← Back
                    </Button>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {specs.map((server) => (
                        <McpCard key={server.name} server={server} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <motion.div
            className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            {...homeCardsVariant}
        >
            {appCards?.length > 0 ? (
                appCards.map(({ icon, title, links, description }, index) => {
                    // Special handling for MCP Servers card
                    if (title === "MCP Servers") {
                        return (
                            <Card key={index} className="group relative grow">
                                <CardContent className="flex grow flex-col justify-between gap-2 pt-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 font-semibold text-lg">
                                            {icon} {title}
                                        </div>
                                        <div className="text-md text-neutral-500 leading-relaxed dark:text-neutral-400">
                                            {description}
                                        </div>
                                    </div>
                                    <div className="pointer-touch-opacity-100 mt-2 flex flex-wrap gap-2 opacity-0 transition-opacity focus-within:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100">
                                        <Button
                                            variant="outline"
                                            className="bg-transparent fill-foreground px-2 py-1.5"
                                            onClick={() => setShowMcp(true)}
                                        >
                                            <span className="flex items-center gap-2">
                                                <ExternalLink />
                                                View MCP Servers
                                            </span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    }
                    // Default card rendering
                    return (
                        <Card key={index} className="group relative grow">
                            <CardContent className="flex grow flex-col justify-between gap-2 pt-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-semibold text-lg">
                                        {icon} {title}
                                    </div>
                                    <div className="text-md text-neutral-500 leading-relaxed dark:text-neutral-400">
                                        {description}
                                    </div>
                                </div>
                                <div className="pointer-touch-opacity-100 mt-2 flex flex-wrap gap-2 opacity-0 transition-opacity focus-within:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100">
                                    {links.map((link: AppLink) => (
                                        <Button
                                            key={link.type}
                                            variant="outline"
                                            className="bg-transparent fill-foreground px-2 py-1.5"
                                            asChild
                                        >
                                            <Link
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="flex items-center gap-2">
                                                    {link.icon}
                                                    {link.type}
                                                </span>
                                            </Link>
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })
            ) : (
                <p className="col-span-full text-center text-muted-foreground">
                    No applications available
                </p>
            )}
            <Card className="group relative grow p-0">
                <CardContent className="card-grid grid grow grid-cols-2 grid-rows-2 p-0">
                    {utilities.map(({ title, icon, href, className }) => (
                        <Button
                            key={title}
                            variant="outline"
                            className={cn(
                                "h-full min-h-26 w-full rounded-none border-0 bg-transparent fill-foreground p-3 text-lg",
                                className
                            )}
                            asChild
                        >
                            <Link target="_blank" rel="noopener noreferrer" href={href}>
                                {icon}
                                {title}
                            </Link>
                        </Button>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    )
}
