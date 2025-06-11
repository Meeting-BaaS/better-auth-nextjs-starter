/**
 * Save default preferences for an account
 * @param accountId - The account ID
 * @returns true if the preferences are saved successfully, false otherwise
 */
export const saveDefaultPreferences = async (accountId: number) => {
    const emailServiceUrl = process.env.EMAIL_API_SERVER_BASEURL
    const emailServiceApiKey = process.env.EMAIL_SERVICE_API_KEY

    if (!emailServiceApiKey)
        throw new Error(
            "EMAIL_SERVICE_API_KEY is not set. Please set it in the environment variables."
        )

    if (!emailServiceUrl)
        throw new Error(
            "EMAIL_API_SERVER_BASEURL is not set. Please set it in the environment variables."
        )

    try {
        const response = await fetch(`${emailServiceUrl}/account/default-preferences`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": emailServiceApiKey
            },
            body: JSON.stringify({ accountId })
        })

        if (!response.ok) {
            throw new Error(
                `Failed to save default preferences: ${response.status} ${response.statusText}`
            )
        }
    } catch (error) {
        console.error("Error calling save default preferences:", error)
        throw error
    }
}
