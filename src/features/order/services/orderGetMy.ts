import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { baseProductScheme } from '@/utils/prisma';

export const orderGetMyHandler = new Handler({
    name: 'Получение списка всех заказов пользователя',
    defaultError: 'Ошибка при получении списка всех заказов пользователя',
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
                            select: baseProductScheme,
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

        return new SuccessResponse({ data: orders });
    },
});
