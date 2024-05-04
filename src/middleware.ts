import { NextRequest, NextResponse } from 'next/server';
import { decrypt, encrypt } from '@/features/auth/utils/crypto';
import { cookies as getCookies } from 'next/headers';
import { UserRole } from '@prisma/client';
import { updateSession } from './features/auth/services/authSession';
import prisma from '@/lib/prisma';

const userRoutes = ['/personal'];
const adminRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/registration'];

export default async function middleware(req: NextRequest) {
    const cookies = getCookies();
    const accessToken = cookies.get('accessToken')?.value;
    const accessTokenData = await decrypt(accessToken);

    const path = req.nextUrl.pathname;
    const isUserRoute = userRoutes.includes(path);
    const isAdminRoute = adminRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    if (!accessTokenData || !accessTokenData.userId) {
        if (isAdminRoute || isUserRoute) {
            return NextResponse.redirect(new URL('/login', req.nextUrl));
        } else {
            return NextResponse.next();
        }
    }

    const userRole = accessTokenData.userRole as UserRole;
    const userId = Number(accessTokenData.userId);
    const expiresAt = Number(accessTokenData.expiresAt);
    const isTokenExpired = expiresAt <= Date.now();

    if (isTokenExpired) {
        const { isSuccess } = await updateSession();
        if (!isSuccess) {
            console.error('Ошибка при обновлении токена');
            return NextResponse.redirect(new URL('/login', req.nextUrl));
        }
    }

    if (isAdminRoute && userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/product', req.nextUrl));
    }

    if (isUserRoute && userRole !== 'USER') {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    if (isPublicRoute) {
        return NextResponse.redirect(new URL('/product', req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [...userRoutes, ...adminRoutes, ...publicRoutes],
};
