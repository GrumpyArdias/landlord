export interface LoginPayload {
  accessToken: string;
}

export interface JWTPayload {
  id: number;
  iat: number;
  exp: number;
}
