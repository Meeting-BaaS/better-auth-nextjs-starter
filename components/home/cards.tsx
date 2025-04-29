import { appCards, utilities, type AppLink } from "@/components/home/card-definitions"
import { Card, CardContent } from "../ui/card"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import * as motion from "motion/react-client"

export const Cards = () => {
    return (
        <motion.div
            className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: "2%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{
                type: "spring",
                ease: "easeIn",
                stiffness: 80,
                damping: 20,
                duration: 0.25,
                delay: 0.25
            }}
        >
            {appCards?.length > 0 ? (
                appCards.map(({ icon: Icon, title, links, description }, index) => (
                    <Card key={index} className="group relative grow">
                        <CardContent className="flex grow flex-col justify-between gap-2 pt-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 font-semibold text-lg">
                                    <Icon className="size-5.5" /> {title}
                                </div>
                                <div className="text-md text-neutral-500 leading-relaxed dark:text-neutral-400">
                                    {description}
                                </div>
                            </div>
                            <div className="pointer-touch-visible invisible mt-2 flex flex-wrap gap-2 group-hover:visible">
                                {links.map((link: AppLink) => (
                                    <Button
                                        key={link.type}
                                        variant="outline"
                                        className="bg-transparent fill-foreground px-2 py-1.5"
                                        asChild
                                    >
                                        <Link
                                            href={link.href}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        >
                                            <span className="flex items-center gap-2">
                                                {link.icon}
                                                {link.type}
                                            </span>
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p className="col-span-full text-center text-muted-foreground">
                    No applications available
                </p>
            )}
            <Card className="group relative grow p-0">
                <CardContent className="grid grow grid-cols-2 grid-rows-2 p-0">
                    {utilities.map(({ title, icon: Icon, href, className }) => (
                        <Button
                            key={title}
                            variant="outline"
                            className={cn(
                                "h-full min-h-26 w-full rounded-none border-0 bg-transparent fill-foreground p-3 text-lg",
                                className
                            )}
                            asChild
                        >
                            <Link key={title} target="_blank" rel="noreferrer noopener" href={href}>
                                <Icon className="size-5.5" />
                                {title}
                            </Link>
                        </Button>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    )
}
