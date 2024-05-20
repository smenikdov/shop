import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { includePagination } from '@/utils/prisma';

interface PayloadFilters {
    id: number;
}

export const orderGetAllHandler = new Handler({
    name: 'Получение списка всех заказов',
    defaultError: 'Ошибка при получении списка всех заказов',
    schema: v.object({
        page: v.page(),
        filters: v.object({
            id: v.id(),
        }),
    }),

    async request(payload: { page: number; filters: PayloadFilters }) {
        const orders = await prisma.order.findMany({
            ...includePagination(payload.page),
            select: {
                id: true,
                status: true,
                total: true,
                user: {
                    select: {
                        id: true,
                        lastName: true,
                        firstName: true,
                        patronymic: true,
                    },
                },
            },
            where: {
                id: payload.filters.id,
            },
        });

        return new SuccessResponse({ data: orders });
    },
});
