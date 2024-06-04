import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { includePagination } from '@/utils/prisma';

interface PayloadFilters {
    phone: string;
    email: string;
    userId: number;
    page: number;
}

export const userGetAllHandler = new Handler({
    name: 'Получение списка всех пользователей',
    defaultError: 'Ошибка при получении списка всех пользователей',
    schema: v.object({
        page: v.page(),
        userId: v.id(),
        email: v.string(),
        phone: v.string(),
    }),

    async request(payload: PayloadFilters) {
        const users = await prisma.user.findMany({
            ...includePagination(payload.page),
            select: {
                id: true,
                lastName: true,
                firstName: true,
                patronymic: true,
                email: true,
                phone: true,
            },
            where: {
                id: payload.userId || undefined,
                email: {
                    contains: payload.email || undefined,
                },
                phone: {
                    contains: payload.phone || undefined,
                },
            },
        });

        const formatUsers = users.map((user) => ({
            id: user.id,
            email: user.email,
            phone: user.phone,
            fio: [user.lastName, user.firstName, user.patronymic].join(' ').trim(),
        }));

        return new SuccessResponse({ data: formatUsers });
    },
});
