import { Pool } from "pg"

if (!process.env.AI_CHAT_DB) {
    throw new Error("AI_CHAT_DB is not configured in env")
}

const pool = new Pool({
    connectionString: process.env.AI_CHAT_DB
})

interface ChatInfo {
    count: number
    earliestChatId: string | null
}

/**
 * Get the number of chats and earliest chat ID for a user
 * The earliest chat is deemed to be the first chat with the title "Getting Started".
 * A title check is added to ensure that we get the correct Chat ID.
 * Users who signed up before the "Getting Started" chat was added might have a different first chat.
 * @param userId - The ID of the user
 * @returns An object containing the count and earliest chat ID
 */
export async function getChatInfo(userId: string): Promise<ChatInfo> {
    const query = `
        SELECT 
            (SELECT COUNT(*) FROM public."ai-chatbot_chat" WHERE "userId" = $1) as count,
            (SELECT id FROM public."ai-chatbot_chat" WHERE "userId" = $1 AND title ILIKE '%Getting Started%' ORDER BY "createdAt" ASC LIMIT 1) as id
    `

    try {
        const result = await pool.query(query, [userId])
        return {
            count: Number.parseInt(result.rows[0].count),
            earliestChatId: result.rows[0].id
        }
    } catch (error) {
        console.error("Error getting chat count:", error)
        throw error
    }
}
