'use server';
import 'server-only';

import { createRoute } from '@/utils/actions/routes';
import { RouteData } from '@/utils/actions/routes';
import { AccessDeniedResponse } from '@/utils/actions/responses';

import { authLoginWithPhoneHandler } from '@/features/auth/services/authLogin';
import { authRegistrationWithPhoneHandler } from '@/features/auth/services/authRegistration';
import { authLogoutHandler } from '@/features/auth/services/authLogout';
import { authGetAllSessionsHandler } from '@/features/auth/services/authSession';

export const authLoginWithPhone = createRoute({
    async handler({ payload }: RouteData<{ phone: string; password: string }>) {
        return authLoginWithPhoneHandler.execute(payload);
    },
});

export const authRegistrationWithPhone = createRoute({
    async handler({ payload }: RouteData<{ phone: string; password: string }>) {
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
    async handler({ accessTokenData }: RouteData) {
        if (accessTokenData?.userId) {
            return authGetAllSessionsHandler.execute({ userId: accessTokenData.userId });
        } else {
            return new AccessDeniedResponse();
        }
    },
});
