import { getSessionCookie } from "better-auth/cookies"
import { type NextRequest, NextResponse } from "next/server"

const authRoutes = ["/sign-in"]
const allowedOrigins =
    process.env.TRUSTED_ORIGINS?.split(",")
        .map((o) => o.trim())
        .filter(Boolean) ?? []

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const origin = request.headers.get("origin") || ""

    const isApiRoute = pathname.startsWith("/api/")
    const isAuthRoute = authRoutes.includes(pathname)

    // Create base response
    const response =
        request.method === "OPTIONS" ? new Response(null, { status: 204 }) : NextResponse.next()

    // Apply CORS headers if API route and origin allowed
    if (isApiRoute && allowedOrigins.includes(origin)) {
        response.headers.set("Access-Control-Allow-Origin", origin)
        response.headers.set("Access-Control-Allow-Credentials", "true")
        response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        response.headers.set(
            "Access-Control-Allow-Headers",
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
        )

        if (request.method === "OPTIONS") {
            return response // end CORS preflight early
        }
    }

    // Handle authentication logic only for non-API routes
    if (!isApiRoute) {
        const sessionCookie = getSessionCookie(request, {
            cookiePrefix: process.env.AUTH_COOKIE_PREFIX
        })

        if (!sessionCookie) {
            if (isAuthRoute) return response
            return NextResponse.redirect(new URL("/sign-in", request.url))
        }

        if (isAuthRoute) {
            return NextResponse.redirect(new URL("/home", request.url))
        }
    }

    return response
}

export const config = {
    matcher: [
        "/api/:path*",
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)" // existing auth matcher
    ]
}
