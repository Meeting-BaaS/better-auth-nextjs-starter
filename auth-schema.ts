import { boolean, index, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable(
    "users",
    {
        id: text("id").primaryKey(),
        name: text("name").notNull(),
        firstName: text("firstname"),
        lastName: text("lastname"),
        email: text("email").notNull().unique(),
        emailVerified: boolean("email_verified").notNull(),
        image: text("image"),
        createdAt: timestamp("created_at").notNull(),
        updatedAt: timestamp("updated_at").notNull(),
        phone: text("phone"),
        companyName: text("company_name"),
        companySize: text("company_size"),
        usagePlanned: text("usage_planned"),
        botsWebhook: text("bots_webhook"),
        botsApiKey: text("bots_api_key")
    },
    (users) => ({
        emailIdx: index("users_email_idx").on(users.email)
    })
)

export const sessions = pgTable(
    "sessions",
    {
        id: text("id").primaryKey(),
        expiresAt: timestamp("expires_at").notNull(),
        token: text("token").notNull().unique(),
        createdAt: timestamp("created_at").notNull(),
        updatedAt: timestamp("updated_at").notNull(),
        ipAddress: text("ip_address"),
        userAgent: text("user_agent"),
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" })
    },
    (sessions) => ({
        userIdTokenIdx: index("sessions_userid_token_idx").on(sessions.userId, sessions.token)
    })
)

export const accounts = pgTable(
    "accounts",
    {
        id: text("id").primaryKey(),
        accountId: text("account_id").notNull(),
        providerId: text("provider_id").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        accessToken: text("access_token"),
        refreshToken: text("refresh_token"),
        idToken: text("id_token"),
        accessTokenExpiresAt: timestamp("access_token_expires_at"),
        refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
        scope: text("scope"),
        password: text("password"),
        createdAt: timestamp("created_at").notNull(),
        updatedAt: timestamp("updated_at").notNull()
    },
    (accounts) => ({
        userIdIdx: index("accounts_userid_idx").on(accounts.userId)
    })
)

export const verifications = pgTable(
    "verifications",
    {
        id: text("id").primaryKey(),
        identifier: text("identifier").notNull(),
        value: text("value").notNull(),
        expiresAt: timestamp("expires_at").notNull(),
        createdAt: timestamp("created_at"),
        updatedAt: timestamp("updated_at")
    },
    (verifications) => ({
        identifierIdx: index("verifications_identifier_idx").on(verifications.identifier)
    })
)
