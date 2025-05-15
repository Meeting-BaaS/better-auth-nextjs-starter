import type { Session, User } from "better-auth"

export type SessionObject = {
    session: Session
    user: User
}
