import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { includePagination } from '@/utils/prisma';

interface PayloadFilters {
    phone: string;
    email: string;
    id: number;
}

export const userGetAllHandler = new Handler({
    name: 'Получение списка всех пользователей',
    defaultError: 'Ошибка при получении списка всех пользователей',
    schema: v.object({
        page: v.page(),
        filters: v.object({
            id: v.id(),
            email: v.string(),
            phone: v.string(),
        }),
    }),

    async request(payload: { page: number; filters: PayloadFilters }) {
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
                id: payload.filters.id,
                email: {
                    contains: payload.filters.email,
                },
                phone: {
                    contains: payload.filters.phone,
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
