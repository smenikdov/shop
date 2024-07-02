import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { productScheme, formatProductScheme } from '@/utils/prisma';

export const orderGetMyHandler = new Handler({
    name: 'Получение списка всех заказов пользователя',
    errors: { default: 'Ошибка при получении списка всех заказов пользователя' },
    schema: v.object({
        userId: v.id(),
    }),

    async request(payload: { userId: number }) {
        const orders = await prisma.order.findMany({
            select: {
                id: true,
                status: true,
                total: true,
                orderItems: {
                    select: {
                        quantity: true,
                        product: {
                            select: productScheme(payload.userId),
                        },
                    },
                },
            },
            where: {
                user: {
                    id: payload.userId,
                },
            },
        });

        const formatOrders = orders.map((o) => ({
            id: o.id,
            status: o.status,
            total: o.total,
            orderItems: o.orderItems.map((oi) => ({
                quantity: oi.quantity,
                ...formatProductScheme(oi.product),
            })),
        }));

        return new SuccessResponse({ data: formatOrders });
    },
});
