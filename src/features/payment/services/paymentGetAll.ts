import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { includePagination } from '@/utils/prisma';

interface PayloadFilters {
    page: number;
    paymentId: number;
}

export const paymentGetAllHandler = new Handler({
    name: 'Получение списка всех финансовых операций',
    errors: { default: 'Ошибка при получении списка всех финансовых операций' },
    schema: v.object({
        page: v.page(),
        paymentId: v.id(),
    }),

    async request(payload: PayloadFilters) {
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
                id: payload.paymentId,
            },
        });

        const formatPayments = payments.map((order) => ({
            id: order.id,
            status: order.status,
            createdAt: order.createdAt,
            userId: order.user.id,
            fio: [order.user.lastName, order.user.firstName, order.user.patronymic]
                .join(' ')
                .trim(),
        }));

        return new SuccessResponse({ data: formatPayments });
    },
});
