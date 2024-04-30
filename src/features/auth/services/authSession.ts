import 'server-only';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { decrypt, encrypt } from '@/features/auth/utils/crypto';

const ttlAccess = Number(process.env.TTL_ACCESS);
const ttlRefresh = Number(process.env.TTL_REFRESH);

export async function createSession(userId: number) {
    // TODO проверка на максимальное количество сессий

    const accessExpiresAt = new Date(Date.now() + ttlAccess * 1000);
    const refreshExpiresAt = new Date(Date.now() + ttlRefresh * 1000);

    const tokenData = {
        userId,
        expiresAt: accessExpiresAt, // TODO role: role
    };
    // TODO изменить данные для refreshToken и accesToken
    const accessToken = await encrypt(tokenData);
    const refreshToken = await encrypt(tokenData);

    const session = await prisma.session.create({
        data: {
            userId,
            accessToken,
            accessExpiresAt,
            refreshToken,
            refreshExpiresAt,
        },
    });

    cookies().set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        expires: refreshExpiresAt,
        sameSite: 'lax',
        path: '/',
    });

    cookies().set('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        expires: accessExpiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

// export async function updateSession() {
//     const refreshToken = cookies().get('refreshToken')?.value;
//     const payload = await decrypt(refreshToken);

//     if (!refreshToken || !payload) {
//         return null;
//     }

//     const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
//     cookies().set('refreshToken', refreshToken, {
//         httpOnly: true,
//         secure: true,
//         expires: expires,
//         sameSite: 'lax',
//         path: '/',
//     });
// }

export async function deleteAllSessions(userId: number) {
    const deletedSessions = await prisma.session.deleteMany({
        where: {
            userId,
        },
    });
}
