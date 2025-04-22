import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

interface SocialButtonProps {
    name: "google" | "microsoft" | "github" | "gitlab" | "zoom"
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
    ...props
}: React.ComponentProps<"button"> & SocialButtonProps) => {
    return (
        <Button
            className="grow shadow-sm"
            variant={primary ? "default" : "outline"}
            disabled={loading}
            {...props}
        >
            {socialLoading === name ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="false" />
            ) : (
                logo
            )}

            <span className="font-medium">Continue with {title}</span>
        </Button>
    )
}
