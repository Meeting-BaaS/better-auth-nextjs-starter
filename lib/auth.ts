import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { magicLink } from "better-auth/plugins"

import { db } from "@/database/db"
import * as schema from "@/database/schema"
import { sendVerificationRequest } from "@/server/auth/magic-link"

let cookieOptions = {}
if (process.env.NODE_ENV === "production") {
    cookieOptions = {
        crossSubDomainCookies: {
            enabled: true,
            domain: process.env.DOMAIN as string
        },
        defaultCookieAttributes: {
            secure: true,
            httpOnly: true,
            sameSite: "none",
            partitioned: true
        }
    }
}

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        usePlural: true,
        schema
    }),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }
    },
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, url }) => {
                return sendVerificationRequest({ email, url })
            }
        })
    ],
    advanced: {
        cookiePrefix: process.env.AUTH_COOKIE_PREFIX,
        ...cookieOptions
    },
    trustedOrigins: process.env.TRUSTED_ORIGINS?.split(",") || [],
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60
        }
    }
})
