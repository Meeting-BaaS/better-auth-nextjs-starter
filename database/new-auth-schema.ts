import { index, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"
import { users } from "./accounts-schema"

export const sessions = pgTable(
    "sessions",
    {
        id: serial("id").primaryKey(),
        expiresAt: timestamp("expires_at").notNull(),
        token: text("token").notNull().unique(),
        createdAt: timestamp("created_at").notNull(),
        updatedAt: timestamp("updated_at").notNull(),
        ipAddress: text("ip_address"),
        userAgent: text("user_agent"),
        userId: integer("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" })
    },
    (sessions) => ({
        userIdTokenIdx: index("sessions_userid_token_idx").on(sessions.userId, sessions.token)
    })
)

export const accounts = pgTable(
    "provider_accounts",
    {
        id: serial("id").primaryKey(),
        accountId: text("account_id").notNull(),
        providerId: text("provider_id").notNull(),
        userId: integer("user_id")
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
        id: serial("id").primaryKey(),
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
