import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import type { ProviderName } from "./providers"

interface SocialButtonProps {
    name: ProviderName
    title: string
    logo: React.ReactNode
    loading: boolean
    socialLoading: string | undefined
    primary?: boolean
}

export const SocialButton = ({
    name,
    title,
    logo,
    loading,
    socialLoading,
    primary,
    className,
    ...props
}: React.ComponentProps<"button"> & SocialButtonProps) => {
    return (
        <Button
            className={cn("grow fill-foreground shadow-sm hover:fill-white", className)}
            variant={primary ? "default" : "outline"}
            disabled={loading}
            type="submit"
            name="provider"
            value={name}
            aria-label={title}
            {...props}
        >
            {socialLoading === name ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="false" />
            ) : (
                logo
            )}

            {primary && <span className="font-medium">Continue with {title}</span>}
        </Button>
    )
}
