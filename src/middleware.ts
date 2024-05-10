import { NextRequest, NextResponse } from 'next/server';
import { decrypt, encrypt } from '@/features/auth/utils/crypto';
import { cookies as getCookies } from 'next/headers';
import { UserRole } from '@prisma/client';
import prisma from '@/lib/prisma';

const userRoutes = ['/my'];
const adminRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/registration'];

const ttlAccess = Number(process.env.TTL_ACCESS);

async function updateSession(): Promise<{ isSuccess: boolean }> {
    const cookies = getCookies();

    try {
        const refreshToken = cookies.get('refreshToken')?.value;
        const accessToken = cookies.get('accessToken')?.value;
        const accessTokenData = await decrypt(accessToken);

        if (!accessTokenData) {
            throw new Error('Попытка обновления токена без авторизации');
        }

        const accessExpiresAt = new Date(Date.now() + ttlAccess * 1000);
        const newAccessTokenData = {
            userId: Number(accessTokenData.userId),
            userRole: accessTokenData.userRole as UserRole,
            expiresAt: accessExpiresAt,
        };
        const newAccessToken = await encrypt(newAccessTokenData);

        const updatedSession = await prisma.session.update({
            where: {
                refreshToken,
                accessToken,
            },
            data: {
                accessToken: newAccessToken,
            },
        });

        cookies.set('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            expires: accessExpiresAt,
            sameSite: 'lax',
            path: '/',
        });
        return { isSuccess: true };
    } catch (error) {
        console.error('Произошла ошибка обновлении сессии');
        console.error(error);
        cookies.delete('refreshToken');
        cookies.delete('accessToken');
        return { isSuccess: false };
    }
}

export default async function middleware(req: NextRequest) {
    const cookies = getCookies();
    const accessToken = cookies.get('accessToken')?.value;
    const accessTokenData = await decrypt(accessToken);

    const path = req.nextUrl.pathname;
    const isUserRoute = userRoutes.some((route) => path.startsWith(route));
    const isAdminRoute = adminRoutes.some((route) => path.startsWith(route));
    const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

    if (!accessTokenData || !accessTokenData.userId) {
        if (isAdminRoute || isUserRoute) {
            return NextResponse.redirect(new URL('/product', req.nextUrl));
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
            return NextResponse.redirect(new URL('/product', req.nextUrl));
        }
    }

    if (isAdminRoute && userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/product', req.nextUrl));
    }

    if (isPublicRoute) {
        return NextResponse.redirect(new URL('/product', req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [...userRoutes, ...adminRoutes, ...publicRoutes],
};
