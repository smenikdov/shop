import 'server-only';
import prisma from '@/lib/prisma';
import { cookies as getCookies, headers as getHeaders } from 'next/headers';
import { decrypt, encrypt, generateRefreshToken } from '@/features/auth/utils/crypto';
import type { UserRole } from '@prisma/client';

const ttlAccess = Number(process.env.TTL_ACCESS);
const ttlRefresh = Number(process.env.TTL_REFRESH);

export async function createSession(
    userId: number,
    userRole: UserRole
): Promise<{ isSuccess: boolean }> {
    try {
        const headers = getHeaders();
        const cookies = getCookies();
        // TODO проверка на максимальное количество сессий

        const accessExpiresAt = new Date(Date.now() + ttlAccess * 1000);
        const refreshExpiresAt = new Date(Date.now() + ttlRefresh * 1000);

        const accessTokenData = {
            userId,
            userRole,
            expiresAt: accessExpiresAt,
        };

        const accessToken = await encrypt(accessTokenData);
        const refreshToken = generateRefreshToken();

        const userIP =
            process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development'
                ? headers.get('x-real-ip')
                : headers.get('ip');

        const session = await prisma.session.create({
            data: {
                userId,
                accessToken,
                accessExpiresAt,
                refreshToken,
                refreshExpiresAt,
                ip: userIP,
                userAgent: headers.get('user-agent'),
            },
        });

        cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            expires: refreshExpiresAt,
            sameSite: 'lax',
            path: '/',
        });

        cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            expires: accessExpiresAt,
            sameSite: 'lax',
            path: '/',
        });
        return { isSuccess: true };
    } catch (error) {
        console.error('Произошла ошибка создании сессии');
        console.error(error);
        return { isSuccess: false };
    }
}

export async function updateSession(): Promise<{ isSuccess: boolean }> {
    try {
        const cookies = getCookies();
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
        await deleteActiveSession();
        return { isSuccess: false };
    }
}

export async function deleteActiveSession(): Promise<{ isSuccess: boolean }> {
    try {
        const cookies = getCookies();
        const refreshToken = cookies.get('refreshToken')?.value;
        const accessToken = cookies.get('accessToken')?.value;
        const deletedSession = await prisma.session.delete({
            where: {
                accessToken,
                refreshToken,
            },
        });
        cookies.delete('refreshToken');
        cookies.delete('accessToken');
        return { isSuccess: true };
    } catch (error) {
        console.error('Произошла ошибка при удалении активной сессии');
        console.error(error);
        return { isSuccess: false };
    }
}

export async function deleteAllSessions(userId: number): Promise<{ isSuccess: boolean }> {
    try {
        const deletedSessions = await prisma.session.deleteMany({
            where: {
                userId,
            },
        });
        return { isSuccess: true };
    } catch (error) {
        console.error('Ошибка при удалении сессий');
        console.error(error);
        return { isSuccess: false };
    }
}
