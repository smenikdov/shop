import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import * as v from '@/utils/validate';

export const userGetData = new Handler({
    name: 'Получение детализации по пользователю',
    defaultError: 'Ошибка при получении данных пользователя',
    schema: v.object({
        userId: v.id(),
    }),

    async request(payload: { userId: number }) {
        const userData = await prisma.user.findUnique({
            where: {
                id: payload.userId,
            },
            select: {
                id: true,
                email: true,
                phone: true,
                lastName: true,
                firstName: true,
                patronymic: true,
                sex: true,
                birthday: true,
            },
        });
        return new SuccessResponse({ data: userData });
    },
});
