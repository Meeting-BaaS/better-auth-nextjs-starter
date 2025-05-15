import type { Session, User } from "better-auth"

/**
 * Combined type that represents the session and user data.
 */
export type SessionObject = {
    session: Session
    user: User
}
