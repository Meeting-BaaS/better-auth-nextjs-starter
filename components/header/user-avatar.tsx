"use client"

import { Loader2, UserIcon } from "lucide-react"
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu"
import Link from "next/link"
import { signOut } from "@/lib/auth-client"
import { Fragment, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import type { User } from "better-auth"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ThemeToggle } from "./theme-toggle"
import type { MenuOption } from "./menu-options"

export const UserAvatar = ({
    user,
    menuOptions
}: {
    user: User
    menuOptions: MenuOption[]
}) => {
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
                <Button
                    size="icon"
                    className="h-7 w-7 rounded-full border-0 bg-transparent p-0"
                    aria-label="User menu"
                >
                    {loading ? (
                        <Loader2
                            className="size-4.5 animate-spin stroke-primary"
                            aria-hidden="false"
                        >
                            <span className="sr-only">Loading</span>
                        </Loader2>
                    ) : (
                        <Avatar className="border">
                            <AvatarImage src={user.image ?? undefined} />
                            <AvatarFallback className="bg-primary">
                                <UserIcon className="size-4.5" />
                            </AvatarFallback>
                        </Avatar>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                <DropdownMenuItem
                    className="hover:!bg-popover inline-flex w-full justify-between py-1 md:hidden"
                    onSelect={(e: Event) => {
                        e.preventDefault()
                    }}
                >
                    <p>Theme</p>
                    <ThemeToggle />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="md:hidden" />
                {menuOptions.map((menuOption) => (
                    <Fragment key={menuOption.title}>
                        {menuOption.separator && <DropdownMenuSeparator />}
                        <DropdownMenuItem key={menuOption.title} asChild>
                            <Link
                                rel="noreferrer noopener"
                                href={menuOption.href}
                                target="_blank"
                                className="cursor-pointer"
                            >
                                {menuOption.title}
                            </Link>
                        </DropdownMenuItem>
                    </Fragment>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <button type="button" className="w-full cursor-pointer" onClick={onSignOut}>
                        Sign out
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
