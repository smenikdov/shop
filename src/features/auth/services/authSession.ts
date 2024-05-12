import 'server-only';
import prisma from '@/lib/prisma';
import { cookies as getCookies, headers as getHeaders } from 'next/headers';
import { decrypt, encrypt, generateRefreshToken } from '@/features/auth/utils/crypto';
import type { UserRole } from '@prisma/client';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import type { SessionListItem, AccessTokenPayload } from '@/features/auth/typings';
import { Handler } from '@/utils/actions/routes';
import Bowser from 'bowser';

const ttlAccess = Number(process.env.TTL_ACCESS);
const ttlRefresh = Number(process.env.TTL_REFRESH);

export const authCreateSessionHandler = new Handler<{ userId: number; userRole: UserRole }>({
    name: 'Создание сессии',
    defaultError: 'Ошибка при создании сессии',

    async request(payload) {
        const { userId, userRole } = payload;
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
        return new SuccessResponse();
    },
});

export const authDeleteActiveSessionHandler = new Handler({
    name: 'Удаление сессии',
    defaultError: 'Ошибка при удалении сессии',

    async request() {
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
        return new SuccessResponse();
    },
});

export const authDeleteAllSessionsHandler = new Handler<{ userId: number }>({
    name: 'Удаление всех сессий пользователя',
    defaultError: 'Ошибка при удалении сессий пользователя',

    async request(payload) {
        const deletedSessions = await prisma.session.deleteMany({
            where: {
                userId: payload.userId,
            },
        });
        return new SuccessResponse();
    },
});

export const authGetAllSessionsHandler = new Handler<{ userId: number }>({
    name: 'Получение всех сессий пользователя',
    defaultError: 'Ошибка при получении сессий пользователя',

    async request(payload) {
        const sessions = await prisma.session.findMany({
            select: {
                id: true,
                ip: true,
                userAgent: true,
                createdAt: true,
            },
            where: {
                userId: payload.userId,
            },
        });

        const formatSessions = sessions.map((session) => {
            const fromatSession: SessionListItem = {
                id: session.id,
                ip: session.ip,
                platform: null,
                browserName: null,
                operatingSystem: null,
                createdAt: session.createdAt,
            };
            if (session.userAgent) {
                const userAgentParsed = Bowser.getParser(session.userAgent, true);
                fromatSession.platform = userAgentParsed.getPlatformType();
                fromatSession.browserName = userAgentParsed.getBrowserName();
                fromatSession.operatingSystem = userAgentParsed.getOSName();
            }
            return fromatSession;
        });

        return new SuccessResponse({ data: formatSessions });
    },
});
