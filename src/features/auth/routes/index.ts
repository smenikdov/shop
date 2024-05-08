'use server';
import 'server-only';
import { authLoginWithPhone } from '@/features/auth/services/authLogin';
import { authRegistrationWithPhone } from '@/features/auth/services/authRegistration';
import { authLogout } from '@/features/auth/services/authLogout';
import { createRoute } from '@/utils/actions/routes';
import * as v from '@/utils/validate';

export const _authLoginWithPhone = createRoute({
    schema: v.object({
        password: v.password(),
        phone: v.phone(),
    }),
    handler: authLoginWithPhone,
});

export const _authRegistrationWithPhone = createRoute({
    schema: v.object({
        password: v.password(),
        phone: v.phone(),
    }),
    handler: authRegistrationWithPhone,
});

export const _authLogout = createRoute({
    handler: authLogout,
});
