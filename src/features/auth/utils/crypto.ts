import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { AccessTokenPayload } from '@/features/auth/typings';
import crypto from 'crypto';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: AccessTokenPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d') // TODO проверить здесь всё
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.log('Failed to verify session');
    }
}

export function generateRefreshToken(): string {
    const refreshTokenLength = Number(process.env.REFRESH_TOKEN_LENGTH);
    return crypto
        .randomBytes(Math.ceil(refreshTokenLength / 2))
        .toString('hex')
        .slice(0, refreshTokenLength);
}
