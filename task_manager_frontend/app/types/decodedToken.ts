export interface DecodedToken {
  username: string;
  authorities: string; // e.g., "ROLE_SUPER_ADMIN,FACTOR_PASSWORD"
  exp?: number;
  iat?: number;
  iss?: string;
  sub?: string;
}