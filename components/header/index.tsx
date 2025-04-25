import { MeetingBaaSLogo } from "../icons/meeting-baas"
import { GitHubRepoButton } from "./github-repo-button"
import { UserAvatar } from "./user-avatar"

export default function Header() {
    return (
        <header className="sticky top-0 z-20 shrink-0 border-b bg-background/15 px-6 py-3 backdrop-blur-md lg:max-w-none lg:px-0">
            <div className="container mx-auto flex items-center justify-between">
                <MeetingBaaSLogo height={30} />
                <div className="flex items-center gap-2">
                    <GitHubRepoButton />
                    <UserAvatar />
                </div>
            </div>
        </header>
    )
}
