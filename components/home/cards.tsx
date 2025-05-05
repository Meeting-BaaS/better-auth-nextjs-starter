import { appCards, utilities, type AppLink } from "@/components/home/card-definitions"
import { Card, CardContent } from "../ui/card"
import Link from "next/link"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import * as motion from "motion/react-client"
import { homeCardsVariant } from "@/animations/home-cards"

export const Cards = () => {
    return (
        <motion.div
            className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            {...homeCardsVariant}
        >
            {appCards?.length > 0 ? (
                appCards.map(({ icon, title, links, description }, index) => (
                    <Card key={index} className="group relative grow">
                        <CardContent className="flex grow flex-col justify-between gap-2 pt-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 font-semibold text-lg">
                                    {icon} {title}
                                </div>
                                <div className="text-md text-neutral-500 leading-relaxed dark:text-neutral-400">
                                    {description}
                                </div>
                            </div>
                            <div className="pointer-touch-opacity-100 mt-2 flex flex-wrap gap-2 opacity-0 transition-opacity focus-within:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100">
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
                                            rel="noopener noreferrer"
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
                    {utilities.map(({ title, icon, href, className }) => (
                        <Button
                            key={title}
                            variant="outline"
                            className={cn(
                                "h-full min-h-26 w-full rounded-none border-0 bg-transparent fill-foreground p-3 text-lg",
                                className
                            )}
                            asChild
                        >
                            <Link target="_blank" rel="noopener noreferrer" href={href}>
                                {icon}
                                {title}
                            </Link>
                        </Button>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    )
}
