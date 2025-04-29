import Link from "next/link"
import { Button } from "../ui/button"

export default function Footer() {
    return (
        <footer className="border-t p-4 text-secondary-foreground">
            <div className="container mx-auto flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="font-semibold text-sm">Authentication</p>
                    <p className="text-xs">
                        Built by{" "}
                        <Button variant="link" className="h-auto p-0 font-semibold" asChild>
                            <Link
                                href={
                                    process.env.MEETING_BAAS_HOMEPAGE || "https://meetingbaas.com/"
                                }
                                rel="noreferrer noopener"
                                target="_blank"
                            >
                                Meeting BaaS
                            </Link>
                        </Button>
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs sm:justify-end">
                    <Button variant="link" className="h-auto p-0" asChild>
                        <Link
                            href={
                                process.env.NEXT_PUBLIC_TERMS_AND_CONDITIONS ||
                                "https://meetingbaas.com/terms-and-conditions"
                            }
                            rel="noreferrer noopener"
                            target="_blank"
                        >
                            Terms & Conditions
                        </Link>
                    </Button>
                    <Button variant="link" className="h-auto p-0" asChild>
                        <Link
                            href={
                                process.env.NEXT_PUBLIC_PRIVACY_POLICY ||
                                "https://meetingbaas.com/privacy"
                            }
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            Privacy Policy
                        </Link>
                    </Button>
                </div>
            </div>
        </footer>
    )
}
