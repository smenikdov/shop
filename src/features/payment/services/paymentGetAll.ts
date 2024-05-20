import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { includePagination } from '@/utils/prisma';

interface PayloadFilters {
    id: number;
}

export const paymentGetAllHandler = new Handler({
    name: 'Получение списка всех финансовых операций',
    defaultError: 'Ошибка при получении списка всех финансовых операций',
    schema: v.object({
        page: v.page(),
        filters: v.object({
            id: v.id(),
        }),
    }),

    async request(payload: { page: number; filters: PayloadFilters }) {
        const payments = await prisma.payment.findMany({
            ...includePagination(payload.page),
            select: {
                id: true,
                status: true,
                createdAt: true,
                order: {
                    select: {
                        id: true,
                    },
                },
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

        return new SuccessResponse({ data: payments });
    },
});
