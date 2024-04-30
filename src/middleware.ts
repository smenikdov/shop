import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/features/auth/utils/crypto';
import { cookies } from 'next/headers';

// TODO
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL('/products', req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
// TODO CHECK FOR IT
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
