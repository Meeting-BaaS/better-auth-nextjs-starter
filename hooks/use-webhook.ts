import { useQuery } from "@tanstack/react-query"
import { getWebhookUrl } from "@/lib/api"
import { toast } from "sonner"
import { useRef } from "react"

export function useWebhook() {
    const hasWebhookRef = useRef(false)

    const {
        data: webhookUrl,
        isLoading,
        isError: isErrorWebhookUrl,
        isRefetchError
    } = useQuery<string, Error>({
        queryKey: ["webhook-url"],
        queryFn: () => getWebhookUrl(),
        refetchOnWindowFocus: true,
        // Stop refetching once we have a valid webhook URL
        enabled: !hasWebhookRef.current,
        staleTime: hasWebhookRef.current ? Number.POSITIVE_INFINITY : 0
    })

    // Update ref when we get a valid webhook URL
    if (webhookUrl && !hasWebhookRef.current) {
        hasWebhookRef.current = true
    }

    if (isErrorWebhookUrl || isRefetchError) {
        toast.error("Failed to fetch webhook url.")
    }

    return {
        webhookUrl,
        isLoadingWebhookUrl: isLoading
    }
}
