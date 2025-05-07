const secret = process.env.BOTS_API_KEY_SECRET

if (!secret) {
    throw new Error("BOTS_API_KEY_SECRET is not configured in env")
}

/**
 * Generate a secure key from random integers, combined with secret and hashed
 * @returns A 64-character hexadecimal string representing the SHA-256 hash
 */
export const generateBotsApiKey = async () => {
    // Step 1: Generate random 32-byte hex string
    const randomBytes = new Uint8Array(32)
    crypto.getRandomValues(randomBytes)
    const randomHex = Array.from(randomBytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")

    // Step 2: Combine with secret
    const combined = randomHex + secret

    // Step 3: Hash the combination using SHA-256
    const buffer = new TextEncoder().encode(combined)
    const digest = await crypto.subtle.digest("SHA-256", buffer)
    const hashHex = Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")

    return hashHex
}
