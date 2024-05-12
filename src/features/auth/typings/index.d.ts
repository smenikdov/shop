import type { UserRole } from '@prisma/client';
export interface AccessTokenPayload {
    userId: number;
    expiresAt: Date;
    userRole: UserRole;
}

export interface SessionListItem {
    id: number;
    ip: string | null;
    platform: string | null;
    browserName: string | null;
    operatingSystem: string | null;
    createdAt: string;
}
