import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

interface SocialButtonProps {
    name: "google" | "microsoft" | "github" | "gitlab" | "zoom"
    title: string
    logo: React.ReactNode
    loading: boolean
    socialLoading: string | undefined
    mobileTitle?: boolean
}

export const SocialButton = ({
    name,
    title,
    logo,
    loading,
    socialLoading,
    mobileTitle,
    ...props
}: React.ComponentProps<"button"> & SocialButtonProps) => {
    const button = (
        <Button className="grow shadow-sm" variant="outline" disabled={loading} {...props}>
            {socialLoading === name ? <Loader2 className="size-4 animate-spin" /> : logo}

            <span className={cn("font-medium text-muted-foreground", mobileTitle && "md:hidden")}>
                {title}
            </span>
        </Button>
    )

    if (mobileTitle) {
        return (
            <TooltipProvider>
                <Tooltip delayDuration={700}>
                    <TooltipTrigger asChild>{button}</TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>{title}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    return button
}
