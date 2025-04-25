import type { CookieOptions } from "better-auth"
import { createAuthMiddleware } from "better-auth/api"
import crypto from "node:crypto"

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

const encodeUserId = (userId: string): string => {
    const keyBase64 = process.env.USER_ENCODING_KEY as string

    const secret = Buffer.from(keyBase64, "base64")
    console.log(secret.toString())
    const hmac = crypto.createHmac("sha512", secret)
    hmac.update(userId)
    const digest = hmac.digest("base64")
    console.log(digest)
    return encodeURIComponent(digest)
}

export const jwtHook = createAuthMiddleware(async (ctx) => {
    if (ctx.path.startsWith("/callback") && ctx.context.newSession) {
        const {
            user: { id }
        } = ctx.context.newSession
        const encodedId = encodeUserId(String(id))
        // Encoding logic here
        ctx.setCookie("jwt", encodedId, getCookieAttributes())
    } else if (ctx.path.startsWith("/sign-out")) {
        ctx.setCookie("jwt", "", getCookieAttributes(true))
    }
})
