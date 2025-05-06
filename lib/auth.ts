import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/database/db"
import * as schema from "@/database/schema"
import { jwtHook } from "@/server/auth/jwt-hook"
import { splitName, updateUserProfile } from "@/server/auth/update-user-profile"

let cookieOptions = {}
if (process.env.NODE_ENV === "production") {
    cookieOptions = {
        crossSubDomainCookies: {
            enabled: true,
            domain: process.env.DOMAIN || ".meetingbaas.com"
        },
        defaultCookieAttributes: {
            secure: true,
            httpOnly: true,
            sameSite: "none",
            partitioned: true
        }
    }
}

const DISABLE_IMPLICIT_SIGN_UP = true

if (!process.env.BETTER_AUTH_SECRET) {
    throw new Error("BETTER_AUTH_SECRET is not configured in env")
}

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        usePlural: true,
        schema
    }),
    user: {
        additionalFields: {
            firstname: {
                type: "string",
                nullable: true
            },
            lastname: {
                type: "string",
                nullable: true
            },
            status: {
                type: "number"
            },
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
            },
            password: {
                type: "string",
                defaultValue: uuidv4,
                returned: false,
                input: false
            }
        }
    },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "microsoft", "github", "gitlab", "zoom"]
        }
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user, _context) => {
                    const [firstname, lastname] = splitName(user.name)
                    return {
                        data: {
                            ...user,
                            status: 4,
                            firstname,
                            lastname
                        }
                    }
                }
            }
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            disableImplicitSignUp: DISABLE_IMPLICIT_SIGN_UP,
            mapProfileToUser: async (profile) => {
                await updateUserProfile(profile.name, profile.email, profile.picture)
                return profile
            }
        },
        microsoft: {
            clientId: process.env.MICROSOFT_ID as string,
            clientSecret: process.env.MICROSOFT_SECRET as string,
            tenantId: process.env.MICROSOFT_TENANT_ID as string,
            requireSelectAccount: true,
            disableImplicitSignUp: DISABLE_IMPLICIT_SIGN_UP,
            mapProfileToUser: async (profile) => {
                await updateUserProfile(profile.name, profile.email, profile.picture)
                return profile
            }
        },
        zoom: {
            clientId: process.env.ZOOM_ID as string,
            clientSecret: process.env.ZOOM_SECRET as string,
            disableImplicitSignUp: DISABLE_IMPLICIT_SIGN_UP,
            mapProfileToUser: async (profile) => {
                await updateUserProfile(
                    `${profile.first_name} ${profile.last_name}`,
                    profile.email,
                    profile.pic_url
                )
            }
        },
        github: {
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            disableImplicitSignUp: DISABLE_IMPLICIT_SIGN_UP,
            mapProfileToUser: async (profile) => {
                await updateUserProfile(profile.name, profile.email, profile.avatar_url)
            }
        },
        gitlab: {
            clientId: process.env.GITLAB_ID as string,
            clientSecret: process.env.GITLAB_SECRET as string,
            disableImplicitSignUp: DISABLE_IMPLICIT_SIGN_UP,
            mapProfileToUser: async (profile) => {
                await updateUserProfile(profile.name, profile.email, profile.avatar_url)
            }
        }
    },
    hooks: {
        after: jwtHook
    },
    advanced: {
        database: {
            generateId: false
        },
        cookiePrefix: process.env.AUTH_COOKIE_PREFIX,
        ...cookieOptions
    },
    trustedOrigins: process.env.TRUSTED_ORIGINS?.split(",") || []
})
