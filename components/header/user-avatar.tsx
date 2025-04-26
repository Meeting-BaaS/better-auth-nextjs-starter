"use client"

import { Loader2, User } from "lucide-react"
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import { signOut } from "@/lib/auth-client"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const UserAvatar = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const onSignOut = async () => {
        await signOut({
            fetchOptions: {
                onRequest: () => {
                    setLoading(true)
                },
                onResponse: () => {
                    setLoading(false)
                },
                onSuccess: () => {
                    router.push("/sign-in")
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                }
            }
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" className="h-8 w-8 rounded-full p-0" aria-label="User menu">
                    {loading ? (
                        <Loader2 className="size-5 animate-spin" aria-hidden="false">
                            <span className="sr-only">Loading</span>
                        </Loader2>
                    ) : (
                        <User className="size-5" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                <DropdownMenuItem
                    className="hover:!bg-background inline-flex w-full justify-between py-1"
                    onSelect={(e: Event) => {
                        e.preventDefault()
                    }}
                >
                    <p>Theme</p>
                    <ThemeToggle />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link
                        rel="noreferrer noopener"
                        href="https://meetingbaas.com"
                        target="_blank"
                        className="w-full cursor-pointer"
                    >
                        Visit Meeting BaaS
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <button type="button" className="w-full cursor-pointer" onClick={onSignOut}>
                        Sign out
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
