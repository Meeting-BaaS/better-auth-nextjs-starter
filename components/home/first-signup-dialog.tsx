import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Fish } from "lucide-react"
import { getNewChatUrl } from "@/lib/utils"

interface FirstSignupDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function FirstSignupDialog({ open, onOpenChange }: FirstSignupDialogProps) {
    const handleStartChat = () => {
        window.open(getNewChatUrl(), "_blank")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Fish /> Welcome to Meeting BaaS!
                    </DialogTitle>
                    <DialogDescription>
                        Would you like to have a quick chat with our AI assistant? It can help you
                        understand how to make the most of Meeting BaaS and get you started on the
                        right track.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <DialogClose asChild>
                        <Button variant="outline">I'll explore on my own</Button>
                    </DialogClose>
                    <Button onClick={handleStartChat}>Start Chat with AI</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
