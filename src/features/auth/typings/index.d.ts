import type { UserRole } from '@prisma/client';
export interface AccessTokenPayload {
    userId: number;
    expiresAt: Date;
    userRole: UserRole;
}
