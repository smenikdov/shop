import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse, NotFoundResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { productScheme, formatProductScheme } from '@/utils/prisma';

export const orderGetDetailsHandler = new Handler({
    name: 'Получение деталей заказа',
    defaultError: 'Ошибка при получении деталей заказа',
    schema: v.object({
        orderId: v.id(),
    }),

    async request(payload: { orderId: number }) {
        const order = await prisma.order.findUnique({
            select: {
                id: true,
                status: true,
                total: true,
                deliveryType: true,
                deliveryCompany: true,
                notice: true,
                orderItems: {
                    select: {
                        quantity: true,
                        product: {
                            select: productScheme(),
                        },
                    },
                },
                user: {
                    select: {
                        lastName: true,
                        firstName: true,
                        patronymic: true,
                        phone: true,
                        email: true,
                    },
                },
            },
            where: {
                id: payload.orderId,
            },
        });

        if (!order) {
            return new NotFoundResponse({ message: 'Заказ не найден' });
        }

        const formatOrder = {
            id: order.id,
            status: order.status,
            total: order.total,
            orderItems: order.orderItems.map((oi) => ({
                quantity: oi.quantity,
                ...formatProductScheme(oi.product),
            })),
        };

        return new SuccessResponse({ data: formatOrder });
    },
});
