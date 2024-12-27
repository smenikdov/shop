import 'server-only';
import prisma from '@/lib/prisma';
import { SuccessResponse } from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';
import * as v from '@/utils/validate';

import { authGuestIdentificationHandler } from '@/features/auth/services/authGuestIdentification';

export const userInitializeHandler = new Handler({
    name: 'Инициализация пользователя',
    errors: {
        default: 'Произошла ошибка при инициализации пользователя',
        identification: 'Произошла ошибка при идентификации пользователя',
        notFound: 'Произошла ошибка при получении данных пользователя',
    },
    schema: v.object({
        userId: v.id().optional(),
    }),

    async request(payload: { userId?: number }, errors) {
        if (!payload.userId) {
            const identificationResponse = await authGuestIdentificationHandler.execute({});
            if (!identificationResponse.isSuccess) {
                throw new Error(errors.identification);
            }
            payload.userId = identificationResponse.data.id;
        }
        const userData = await prisma.user.findUnique({
            select: {
                role: true,
                firstName: true,
            },
            where: {
                id: payload.userId,
            },
        });
        if (!userData) {
            throw new Error(errors.notFound);
        }
        return new SuccessResponse({ data: userData });
    },
});
