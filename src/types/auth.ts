import { UserRole } from '../enums/user-role'

export class AuthObject {
  accessToken: string
  refreshToken: string

  constructor (accessToken: string, refreshToken: string) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }
}

/**
 * Basic JwtTokenPayload that is part of all JWTs.
 */
interface JwtTokenPayloadBase {
  iat: number;
  exp: number;
}

/**
 * In tokens, this UserIdentifier is the payload.
 */
export interface UserIdentifier {
  sub: string;
  email: string;
  role: UserRole;
}

/**
 * In tokens, this SessionIdentifier is the payload.
 */
export interface SessionIdentifier {
  sessionId: string;
}

/**
 * RefreshToken contains a session ID that maps to a UserSession object.
 */
export interface RefreshToken extends JwtTokenPayloadBase, SessionIdentifier {
}

/**
 * The main authtoken.
 */
export interface AccessToken extends JwtTokenPayloadBase, UserIdentifier {
}
