import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse, NotFoundResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';

export const userGetDetailsHandler = new Handler({
    name: 'Получение данных пользователей',
    errors: {
        default: 'Ошибка при получении данных пользователей',
    },
    schema: v.object({
        userId: v.id(),
    }),

    async request(payload: { userId: integer }) {
        const user = await prisma.user.findUnique({
            select: {
                id: true,
                lastName: true,
                firstName: true,
                patronymic: true,
                email: true,
                phone: true,
                role: true,
                sex: true,
                birthday: true,
            },
            where: {
                id: payload.userId,
            },
        });

        if (!user) {
            return new NotFoundResponse({ message: 'Пользователь не найден' });
        }

        return new SuccessResponse({ data: user });
    },
});
