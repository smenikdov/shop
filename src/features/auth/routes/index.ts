'use server';
import 'server-only';
import { authLoginWithPhoneHandler } from '@/features/auth/services/authLogin';
import { authRegistrationWithPhoneHandler } from '@/features/auth/services/authRegistration';
import { authLogoutHandler } from '@/features/auth/services/authLogout';
import { createRoute } from '@/utils/actions/routes';
import * as v from '@/utils/validate';

export const _authLoginWithPhone = createRoute({
    schema: v.object({
        password: v.password(),
        phone: v.phone(),
    }),
    handler: authLoginWithPhoneHandler,
});

export const _authRegistrationWithPhone = createRoute({
    schema: v.object({
        password: v.password(),
        phone: v.phone(),
    }),
    handler: authRegistrationWithPhoneHandler,
});

export const _authLogout = createRoute({
    handler: authLogoutHandler,
});
