export type UserTokensResponse = {
    available_tokens: number
    total_tokens_purchased: number | undefined
    last_purchase_date: string | null
}

const apiServerBaseUrl = process.env.API_SERVER_BASEURL

if (!apiServerBaseUrl) {
    throw new Error(
        "API_SERVER_BASEURL is not defined in the environment variables. Please set it in your .env file."
    )
}

/**
 * Fetches current user token information.
 * Called from the server side/RSC, so requires the full URL to the API server, and the jwt.
 * @returns User tokens data including available tokens and purchase history
 */
export async function fetchUserTokens(jwt: string): Promise<UserTokensResponse> {
    const response = await fetch(`${apiServerBaseUrl}/accounts/user_tokens`, {
        headers: {
            Cookie: `jwt=${jwt}`
        }
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch user tokens: ${response.status} ${response.statusText}`)
    }
    return response.json()
}
