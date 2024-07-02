import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { includePagination } from '@/utils/prisma';

interface PayloadFilters {
    page: number;
    orderId: number;
}

export const orderGetAllHandler = new Handler({
    name: 'Получение списка всех заказов',
    errors: { default: 'Ошибка при получении списка всех заказов' },
    schema: v.object({
        page: v.page(),
        orderId: v.id(),
    }),

    async request(payload: PayloadFilters) {
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
                id: payload.orderId,
            },
        });

        const formatOrders = orders.map((order) => ({
            id: order.id,
            status: order.status,
            total: order.total,
            userId: order.user.id,
            fio: [order.user.lastName, order.user.firstName, order.user.patronymic]
                .join(' ')
                .trim(),
        }));

        return new SuccessResponse({ data: formatOrders });
    },
});
