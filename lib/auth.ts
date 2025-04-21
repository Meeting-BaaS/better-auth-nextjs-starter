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
    user: {
        additionalFields: {
            phone: {
                type: "string",
                nullable: true
            },
            companyName: {
                type: "string",
                nullable: true
            },
            companySize: {
                type: "string",
                nullable: true
            },
            usagePlanned: {
                type: "string",
                nullable: true
            },
            botsWebhook: {
                type: "string",
                nullable: true
            },
            botsApiKey: {
                type: "string",
                nullable: true
            }
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        },
        microsoft: {
            clientId: process.env.MICROSOFT_ID as string,
            clientSecret: process.env.MICROSOFT_SECRET as string,
            tenantId: process.env.MICROSOFT_TENANT_ID as string,
            requireSelectAccount: true
        },
        zoom: {
            clientId: process.env.ZOOM_ID as string,
            clientSecret: process.env.ZOOM_SECRET as string
        },
        github: {
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        },
        gitlab: {
            clientId: process.env.GITLAB_ID as string,
            clientSecret: process.env.GITLAB_SECRET as string
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
