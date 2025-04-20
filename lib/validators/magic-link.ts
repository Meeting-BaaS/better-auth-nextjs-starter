import { z } from "zod"

export const MagicLinkSchema = z.object({
    email: z.string().trim().nonempty("Please enter email").email("Please enter a valid email")
})

export type MagicLink = z.infer<typeof MagicLinkSchema>
