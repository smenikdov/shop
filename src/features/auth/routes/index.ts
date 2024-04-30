'use server';
import 'server-only';
import { authLoginWithPhone, authLoginWithEmail } from '@/features/auth/services/authLogin';
import {
    authRegistrationWithPhone,
    authRegistrationWithEmail,
} from '@/features/auth/services/authRegistration';
import { authLogout } from '@/features/auth/services/authLogout';
import { createRoute } from '@/utils/routes';
import * as v from '@/utils/validate';

export const _authLoginWithPhone = createRoute({
    schema: v.object({
        password: v.password(),
        phone: v.phone(),
    }),
    handler: authLoginWithPhone,
});

export const _authLoginWithEmail = createRoute({
    schema: v.object({
        password: v.password(),
        email: v.email(),
    }),
    handler: authLoginWithEmail,
});

export const _authRegistrationWithPhone = createRoute({
    schema: v.object({
        password: v.password(),
        phone: v.phone(),
    }),
    handler: authRegistrationWithPhone,
});

export const _authRegistrationWithEmail = createRoute({
    schema: v.object({
        password: v.password(),
        email: v.email(),
    }),
    handler: authRegistrationWithEmail,
});

export const _authLogout = createRoute({
    handler: authLogout,
});
