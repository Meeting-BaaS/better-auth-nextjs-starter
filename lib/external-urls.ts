const {
  ENVIRONMENT,
  NEXT_PUBLIC_AUTH_APP_GITHUB,
  NEXT_PUBLIC_GLADIA_URL,
  NEXT_PUBLIC_TERMS_AND_CONDITIONS,
  NEXT_PUBLIC_PRIVACY_POLICY,
  CONTRIBUTION_GITHUB,
  MEETING_BAAS_HOMEPAGE,
  MEETING_BAAS_API_DOCS,
  AI_CHAT_APP,
  AI_CHAT_GITHUB,
  REAL_TIME_TRANSCRIPTION_GITHUB,
  SPEAKING_BOTS_DOCS,
  SPEAKING_BOTS_GITHUB,
  TRANSCRIPT_SEEKER_APP,
  TRANSCRIPT_SEEKER_DOCS,
  TRANSCRIPT_SEEKER_GITHUB,
  SETTINGS_REDIRECTION_URL,
  LOGS_REDIRECTION_URL,
  USAGE_REDIRECTION_URL,
  BILLING_REDIRECTION_URL,
  CREDENTIALS_REDIRECTION_URL,
} = process.env;

// For prod, the environment key is expected to be blank
const environment = ENVIRONMENT || "";

export const AUTH_APP_GITHUB_URL =
  NEXT_PUBLIC_AUTH_APP_GITHUB ||
  "https://github.com/Meeting-Baas/better-auth-nextjs-starter";
export const GLADIA_URL = NEXT_PUBLIC_GLADIA_URL || "https://gladia.io";
export const CONTRIBUTION_GITHUB_URL =
  CONTRIBUTION_GITHUB || "https://github.com/Meeting-Baas";
export const MEETING_BAAS_HOMEPAGE_URL =
  MEETING_BAAS_HOMEPAGE || "https://meetingbaas.com/";
export const TERMS_AND_CONDITIONS_URL =
  NEXT_PUBLIC_TERMS_AND_CONDITIONS ||
  "https://meetingbaas.com/terms-and-conditions";
export const PRIVACY_POLICY_URL =
  NEXT_PUBLIC_PRIVACY_POLICY || "https://meetingbaas.com/privacy";

// Settings URLs
export const SETTINGS_URL =
  SETTINGS_REDIRECTION_URL || `https://${environment}meetingbaas.com`;
export const LOGS_URL = LOGS_REDIRECTION_URL || `${SETTINGS_URL}/logs`;
export const USAGE_URL = USAGE_REDIRECTION_URL || `${SETTINGS_URL}/usage`;
export const BILLING_URL = BILLING_REDIRECTION_URL || `${SETTINGS_URL}/billing`;
export const CREDENTIALS_URL =
  CREDENTIALS_REDIRECTION_URL || `${SETTINGS_URL}/credentials`;

// Docs URL
export const DOCS_URL = `https://docs.${environment}meetingbaas.com`;

/* External App URLs */

// Meeting BaaS API
export const MEETING_BAAS_API_DOCS_URL =
  MEETING_BAAS_API_DOCS || `${DOCS_URL}/docs/api`;
export const MEETING_BAAS_DOCS_GITHUB_URL =
  "https://github.com/Meeting-Baas/docs";

// AI Chat
export const AI_CHAT_URL =
  AI_CHAT_APP || `https://chat.${environment}meetingbaas.com`;
export const AI_CHAT_GITHUB_URL =
  AI_CHAT_GITHUB || "https://github.com/Meeting-Baas/ai-chat";

export const DISCORD_URL = "https://discord.com/invite/dsvFgDTr6c";

// Real time transcription
export const REAL_TIME_TRANSCRIPTION_GITHUB_URL =
  REAL_TIME_TRANSCRIPTION_GITHUB ||
  "https://github.com/Meeting-Baas/realtime-meeting-transcription";

// Speaking Bots
export const SPEAKING_BOTS_DOCS_URL =
  SPEAKING_BOTS_DOCS || `${DOCS_URL}/docs/speaking-bots`;
export const SPEAKING_BOTS_GITHUB_URL =
  SPEAKING_BOTS_GITHUB ||
  "https://github.com/Meeting-Baas/speaking-meeting-bot";

// Transcript Seeker
export const TRANSCRIPT_SEEKER_APP_URL =
  TRANSCRIPT_SEEKER_APP || "https://app.transcriptseeker.com/";
export const TRANSCRIPT_SEEKER_DOCS_URL =
  TRANSCRIPT_SEEKER_DOCS || `${DOCS_URL}/docs/transcript-seeker`;
export const TRANSCRIPT_SEEKER_GITHUB_URL =
  TRANSCRIPT_SEEKER_GITHUB ||
  "https://github.com/Meeting-Baas/transcript-seeker";
