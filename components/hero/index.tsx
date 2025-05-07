import { authHeroVariant } from "@/animations/auth/auth-hero"
import { AppsCardStack } from "@/components/hero/apps-card-stack"
import { FeaturesCardStack } from "@/components/hero/features-card-stack"
import { abstractImages } from "@/lib/images"
import * as motion from "motion/react-client"
import { useMemo } from "react"
import { LogoCard } from "./logo-card"

export default function HeroSection() {
    const image = abstractImages[Math.floor(Math.random() * abstractImages.length)]

    // Generate random positions for components
    const componentConfig = useMemo(() => {
        // Generate all available positions (0-8)
        const availablePositions = Array.from({ length: 9 }, (_, i) => i);

        // Credit always goes in bottom-right (position 8)
        const creditPosition = 8;
        // Remove position 8 from available positions
        availablePositions.splice(availablePositions.indexOf(creditPosition), 1);

        // Shuffle remaining positions
        for (let i = availablePositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
        }

        // Take the first 3 positions for our components
        return {
            featuresPosition: availablePositions[0],
            appsPosition: availablePositions[1],
            logoPosition: availablePositions[2],
            creditPosition
        };
    }, []);

    // We'll create the overlays directly in the render function to allow the cards to cycle internally
    const overlays: Record<number, React.ReactNode> = {};

    // Randomly decide component order
    const componentTypes = ["features", "apps", "logo"];
    // Shuffle component types
    for (let i = componentTypes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [componentTypes[i], componentTypes[j]] = [componentTypes[j], componentTypes[i]];
    }

    // Assign components to their positions based on shuffled order
    componentTypes.forEach((type) => {
        let position: number;
        let component: React.ReactNode;

        switch (type) {
            case "features":
                position = componentConfig.featuresPosition;
                component = <FeaturesCardStack key="features" />;
                break;
            case "apps":
                position = componentConfig.appsPosition;
                component = <AppsCardStack key="apps" />;
                break;
            case "logo":
                position = componentConfig.logoPosition;
                component = <LogoCard key="logo" />;
                break;
            default:
                return; // Skip if type is not recognized
        }

        if (position !== undefined) {
            overlays[position] = component;
        }
    });

    // Add credit at position 8
    overlays[componentConfig.creditPosition] = (
        <div className="absolute bottom-0 w-full rounded-b-2xl bg-accent/40 px-2 py-1 text-foreground text-sm backdrop-blur-xs">
            <p>
                Credit:{" "}
                <a
                    href={image.author.url}
                    className="underline underline-offset-4 "
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {image.author.name}
                </a>
            </p>
        </div>
    );

    return (
        <motion.div
            {...authHeroVariant}
            className="relative col-span-3 hidden h-full overflow-hidden rounded-2xl lg:block"
        >
            <div className="absolute inset-1 grid grid-cols-3 grid-rows-3 gap-4 rounded-2xl bg-background p-4">
                {Array.from({ length: 9 }).map((_, index) => {
                    const col = index % 3
                    const row = Math.floor(index / 3)

                    return (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-2xl bg-background bg-cover bg-no-repeat"
                            style={{
                                backgroundImage: `url('${image.url}')`,
                                backgroundSize: "300% 300%",
                                // Position the background image to show the correct segment in a 3x3 grid
                                // For a 3x3 grid, each cell shows 1/3 of the image width and height
                                // col * 50% positions horizontally (0%, 50%, 100%)
                                // row * 50% positions vertically (0%, 50%, 100%)
                                backgroundPosition: `${col * 50}% ${row * 50}%`
                            }}
                        >
                            {overlays[index] ?? null}
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )
}
