// For prod, the environment key is expected to be blank.
// For non-prod environments, NEXT_PUBLIC_ENVIRONMENT should be set to a domain prefix
// (e.g., "pre-prod-", "dev-") WITHOUT a trailing dot
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || ""

export const GLADIA_URL = "https://gladia.io"
export const CONTRIBUTION_GITHUB_URL = "https://github.com/Meeting-Baas"
export const MEETING_BAAS_HOMEPAGE_URL = "https://meetingbaas.com"
export const TERMS_AND_CONDITIONS_URL = "https://meetingbaas.com/terms-and-conditions"
export const PRIVACY_POLICY_URL = "https://meetingbaas.com/privacy"

// Settings URLs
export const SETTINGS_URL = `https://${environment}meetingbaas.com`
export const LOGS_URL = `https://logs.${environment}meetingbaas.com`
export const USAGE_URL = `${SETTINGS_URL}/usage`
export const BILLING_URL = `${SETTINGS_URL}/billing`
export const CREDENTIALS_URL = `${SETTINGS_URL}/credentials`

// Docs URL
export const DOCS_URL = `https://docs.${environment}meetingbaas.com`

/* External App URLs */

// Meeting BaaS API
export const MEETING_BAAS_API_DOCS_URL = `${DOCS_URL}/updates`
export const MEETING_BAAS_DOCS_GITHUB_URL = "https://github.com/Meeting-Baas/docs"

// AI Chat
export const AI_CHAT_URL = `https://chat.${environment}meetingbaas.com`
export const AI_CHAT_GITHUB_URL = "https://github.com/Meeting-Baas/ai-chat"

export const DISCORD_URL = "https://discord.com/invite/dsvFgDTr6c"

// Real time transcription
export const REAL_TIME_TRANSCRIPTION_GITHUB_URL =
    "https://github.com/Meeting-Baas/realtime-meeting-transcription"

// Speaking Bots
export const SPEAKING_BOTS_DOCS_URL = `${DOCS_URL}/docs/speaking-bots`
export const SPEAKING_BOTS_GITHUB_URL = "https://github.com/Meeting-Baas/speaking-meeting-bot"

// Transcript Seeker
export const TRANSCRIPT_SEEKER_APP_URL = "https://app.transcriptseeker.com"
export const TRANSCRIPT_SEEKER_DOCS_URL = `${DOCS_URL}/docs/transcript-seeker`
export const TRANSCRIPT_SEEKER_GITHUB_URL = "https://github.com/Meeting-Baas/transcript-seeker"

// Github
export const GITHUB_REPO_URL = "https://github.com/Meeting-Baas/better-auth-nextjs-starter"
