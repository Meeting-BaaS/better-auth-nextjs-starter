import type { User } from "better-auth"
import { UserAvatar } from "./user-avatar"
import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "../ui/button"
import Link from "next/link"
import { GitHubLogo } from "../icons/github"
import { menuOptions } from "./menu-options"
import { AUTH_APP_GITHUB_URL } from "@/lib/external-urls"

export default function Header({ user }: { user: User }) {
    return (
        <header className="sticky top-0 z-40 mx-auto box-content w-full max-w-container border-b bg-background/15 backdrop-blur-md lg:top-2 lg:mt-2 lg:w-[calc(100%-4rem)] lg:rounded-2xl lg:border">
            <nav className="flex h-12 w-full flex-row items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.svg"
                        alt="Meeting BaaS logo"
                        priority
                        width={20}
                        height={20}
                        className="h-5 w-5"
                    />
                    <span className="font-bold text-md">Meeting BaaS</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="fill-foreground"
                            asChild
                            aria-label="Github repository"
                        >
                            <Link
                                href={AUTH_APP_GITHUB_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <GitHubLogo />
                            </Link>
                        </Button>
                        <ThemeToggle className="hidden md:flex" />
                    </div>
                    <UserAvatar user={user} menuOptions={menuOptions} />
                </div>
            </nav>
        </header>
    )
}
