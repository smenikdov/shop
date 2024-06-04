import { NextRequest, NextResponse } from 'next/server';
import { decrypt, encrypt } from '@/features/auth/utils/crypto';
import { cookies as getCookies } from 'next/headers';
import { UserRole } from '@prisma/client';
import prisma from '@/lib/prisma';

const userRoutes = ['/my'];
const adminRoutes = ['/admin'];
const publicRoutes = ['/login', '/registration'];

const ttlAccess = Number(process.env.TTL_ACCESS);

async function updateSession() {
    console.log('начнием обновление сессии');
    const cookies = getCookies();

    try {
        throw new Error('TODO (((');

        // const refreshToken = cookies.get('refreshToken')?.value;

        // if (!refreshToken) {
        //     throw new Error('Попытка обновления сессии без refreshToken');
        // }

        // const session = await prisma.session.findUnique({
        //     select: {
        //         user: {
        //             select: {
        //                 id: true,
        //                 role: true,
        //             },
        //         },
        //     },
        //     where: {
        //         refreshToken,
        //     },
        // });

        // if (!session) {
        //     throw new Error('Попытка обновления сессии, которая не найдена в базе');
        // }

        // const accessExpiresAt = new Date(Date.now() + ttlAccess * 1000);
        // const newAccessTokenData = {
        //     userId: session.user.id,
        //     userRole: session.user.role,
        //     expiresAt: accessExpiresAt,
        // };
        // const newAccessToken = await encrypt(newAccessTokenData);

        // const updatedSession = await prisma.session.update({
        //     where: {
        //         refreshToken,
        //     },
        //     data: {
        //         accessToken: newAccessToken,
        //     },
        // });

        // cookies.set('accessToken', newAccessToken, {
        //     httpOnly: true,
        //     secure: true,
        //     expires: accessExpiresAt,
        //     sameSite: 'lax',
        //     path: '/',
        // });
        // console.log('успешное обновление сессии');
        // return { isSuccess: true, newAccessTokenData };
    } catch (error) {
        // console.error('Произошла ошибка обновлении сессии');
        // console.error(error);
        // cookies.delete('refreshToken');
        // cookies.delete('accessToken');
        return { isSuccess: false };
    }
}

export default async function middleware(req: NextRequest) {
    const cookies = getCookies();
    const accessToken = cookies.get('accessToken')?.value;
    const refreshToken = cookies.get('refreshToken')?.value;
    let accessTokenData = await decrypt(accessToken);

    const path = req.nextUrl.pathname;
    const isUserRoute = userRoutes.some((route) => path.startsWith(route));
    const isAdminRoute = adminRoutes.some((route) => path.startsWith(route));
    const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

    const isTokenExpired = !accessTokenData && refreshToken;

    // if (isTokenExpired) {
    //     const updateSessionResult = await updateSession();
    //     if (!updateSessionResult.isSuccess) {
    //         console.error('Ошибка при обновлении токена');
    //         return NextResponse.redirect(new URL('/product', req.nextUrl));
    //     }
    //     // accessTokenData = updateSessionResult.newAccessTokenData;
    // }

    if (!accessTokenData || !accessTokenData.userId) {
        if (isAdminRoute || isUserRoute) {
            return NextResponse.redirect(new URL('/product', req.nextUrl));
        } else {
            return NextResponse.next();
        }
    }

    const userRole = accessTokenData.userRole as UserRole;
    const userId = Number(accessTokenData.userId);

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
