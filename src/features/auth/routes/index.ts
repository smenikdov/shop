'use server';
import 'server-only';
import { authLoginWithPhoneHandler } from '@/features/auth/services/authLogin';
import { authRegistrationWithPhoneHandler } from '@/features/auth/services/authRegistration';
import { authLogoutHandler } from '@/features/auth/services/authLogout';
import { authGetAllSessionsHandler } from '@/features/auth/services/authSession';
import { createRoute } from '@/utils/actions/routes';
import { AccessDeniedResponse } from '@/utils/actions/responses';

export const authLoginWithPhone = createRoute<{ phone: string; password: string }>({
    async handler({ payload }) {
        return authLoginWithPhoneHandler.execute(payload);
    },
});

export const authRegistrationWithPhone = createRoute<{ phone: string; password: string }>({
    async handler({ payload }) {
        return authRegistrationWithPhoneHandler.execute(payload);
    },
});

export const authLogout = createRoute({
    access: ['USER'],
    async handler() {
        return authLogoutHandler.execute({});
    },
});

export const authGetAllSessions = createRoute({
    async handler({ accessTokenData }) {
        if (accessTokenData?.userId) {
            return authGetAllSessionsHandler.execute({ userId: accessTokenData.userId });
        } else {
            return new AccessDeniedResponse();
        }
    },
});
