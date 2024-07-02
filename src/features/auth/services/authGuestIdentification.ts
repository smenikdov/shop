import 'server-only';
import prisma from '@/lib/prisma';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';
import * as v from '@/utils/validate';

import { authCreateSessionHandler } from '@/features/auth/services/authSession';

export const authGuestIdentificationHandler = new Handler({
    name: 'Идентифицкация пользователя',
    errors: { default: 'Произошла ошибка при идентифицкации пользователя' },

    async request() {
        const user = await prisma.user.create({
            data: {
                role: 'GUEST',
            },
        });
        const { isSuccess } = await authCreateSessionHandler.execute({
            userId: user.id,
            userRole: user.role,
        });

        if (!isSuccess) {
            throw new Error('Ошибка при создании сессии');
        }

        return new SuccessResponse({ data: user });
    },
});
