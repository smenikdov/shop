import 'server-only';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';
import * as v from '@/utils/validate';

import { authGuestIdentificationHandler } from '@/features/auth/services/authGuestIdentification';

export const userInitializeHandler = new Handler({
    name: 'Инициализация пользователя',
    defaultError: 'Произошла ошибка при инициализации пользователя',
    schema: v.object({
        userId: v.id().optional(),
    }),

    async request(payload: { userId?: number }) {
        if (!payload.userId) {
            const identificationResponse = await authGuestIdentificationHandler.execute({});
            if (!identificationResponse.isSuccess) {
                throw new Error('Ошибка при идентификации пользователя');
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
            throw new Error('Ошибка при инициализации пользователя');
        }
        return new SuccessResponse({ data: userData });
    },
});
