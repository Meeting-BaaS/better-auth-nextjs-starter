import type { CookieOptions } from "better-auth"
import { createAuthMiddleware } from "better-auth/api"
import jwt from "jsonwebtoken"

const getCookieAttributes = (remove?: boolean) => {
    const isProd = process.env.NODE_ENV === "production"
    let attributes: CookieOptions = {
        httpOnly: true,
        sameSite: "Lax",
        path: "/"
    }

    if (isProd) {
        attributes = {
            ...attributes,
            sameSite: "None",
            domain: process.env.DOMAIN as string,
            secure: true,
            partitioned: true
        }
    }

    if (remove) {
        attributes.maxAge = 0
    }

    return attributes
}

const encodeUserId = (userId: number): string => {
    const encodingKey = process.env.USER_ENCODING_KEY || ""
    const secret = Buffer.from(encodingKey, "base64")

    const payload = { id: userId }

    const token = jwt.sign(payload, secret, {
        algorithm: "HS512",
        noTimestamp: true
    })

    return encodeURIComponent(token)
}

export const jwtHook = createAuthMiddleware(async (ctx) => {
    if (ctx.path.startsWith("/callback") && ctx.context.newSession) {
        const {
            user: { id }
        } = ctx.context.newSession
        const encodedId = encodeUserId(Number(id))
        // Encoding logic here
        ctx.setCookie("jwt", encodedId, getCookieAttributes())
    } else if (ctx.path.startsWith("/sign-out")) {
        ctx.setCookie("jwt", "", getCookieAttributes(true))
    }
})
