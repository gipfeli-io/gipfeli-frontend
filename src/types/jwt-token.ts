export interface JwtToken {
  email: string;
  sub: string;
  iat: number;
  exp: number;
}
