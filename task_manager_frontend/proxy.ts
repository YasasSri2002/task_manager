// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecode} from 'jwt-decode';
import { DecodedToken } from './types/decodedToken';


// Define protected routes
const protectedRoutes = [
  '/super-admin',
  '/user',
];



// Check if JWT has required role
function hasRole(decodedToken: DecodedToken | null, roles: string[]) {
  if (!decodedToken?.authorities) return false;
  const tokenRoles = decodedToken.authorities.split(',').map(r => r.trim());
  return roles.some(role => tokenRoles.includes(role));
}

// Validate JWT token
function validateToken(token: string | undefined) {
  if (!token) return null;
  try {
    if(token.startsWith("Bearer ")){
        token = token.substring(7);
    }
    const decoded = jwtDecode<DecodedToken>(token);

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      console.log('Token expired');
      return null;
    }
    return decoded;
  } catch (err) {
    console.log('JWT decode error', err);
    return null;
  }
}

// Check if URL is protected
function isProtectedUrl(pathname: string) {
  return protectedRoutes.some(route => pathname.startsWith(route));
}

// Check role authorization per route
function authorizationForRoutes(pathname: string, decodedToken: DecodedToken | null) {
  if (pathname.startsWith('/super-admin')) {
    return hasRole(decodedToken, ['ROLE_SUPER_ADMIN']);
  }
  if (pathname.startsWith('/user')) {
    return hasRole(decodedToken, ['ROLE_USER','ROLE_SUPER_ADMIN']);
  }
  return true;
}

export default function Proxy(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;
  const { pathname } = req.nextUrl;

  // Skip non-protected routes
  if (!isProtectedUrl(pathname)) return NextResponse.next();

  const decodedToken = validateToken(token);


  // Role mismatch → redirect to forbidden
  if (!authorizationForRoutes(pathname, decodedToken)) {
    return NextResponse.redirect(new URL('/forbidden', req.url));
  }

  // Allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/super-admin/:path*',
    '/user/:path*',
  ],
};