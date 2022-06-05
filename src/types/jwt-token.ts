export interface JwtToken {
  username: string;
  sub: string;
  iat: number;
  exp: number;
}
