import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { AccessDeniedResponse, SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { productScheme, formatProductScheme } from '@/utils/prisma';

import { ORDER_STATUS } from '@/constants';

import { basketCalcTotalResult } from '@/features/basket/utils/basketCalcTotalResult';

export const orderCreateHandler = new Handler({
    name: 'Создание заказа',
    errors: { default: 'Ошибка при создании заказа' },
    schema: v.object({
        userId: v.id(),
        notice: v.string(),
        delivery: v.object({
            company: v.string(),
            type: v.string(),
            cityId: v.string(),
            pointId: v.string(),
            address: v.string(),
        }),
        paymentType: v.string(),
    }),

    async request(payload: { userId: number; notice: string; }) {
        const userInfo = await prisma.checkoutItem.findUnique({
            select: {
                email: true,
                phone: true,
                lastName: true,
                firstName: true,
                patronymic: true,
                cityId: true,
                checkoutItems: {
                    select: {
                        quantity: true,
                        productId: true,
                        product: {
                            select: {
                                price: true,
                                offer: {
                                    select: {
                                        id: true,
                                        discount: true,
                                    },
                                    where: {
                                        isActive: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            where: {
                userId: payload.userId,
            },
        });

        if (!userInfo) {
            throw new Error('Пользователь не найден');
        }

        if (userInfo.checkoutItems.length === 0) {
            return new AccessDeniedResponse({ message: 'Товары не найдены' });
        }

        const total = basketCalcTotalResult(userInfo.checkoutItems);

        const order = await prisma.basketItem.create({
            data: {
                userId: payload.userId,
                status: ORDER_STATUS.PAYMENT,
                total: total,
                orderItems: userInfo.checkoutItems,
                paymentType: payload.paymentType,

                delivery: {
                    company: payload.delivery.company,
                    type: payload.delivery.type,
                    cityId: payload.delivery.cityId,
                    pointId: payload.delivery.pointId,
                    address: payload.delivery.address,
                },

                customer: {
                    fio: userGetFio(userInfo),
                    phone: userInfo.phone,
                    email: userInfo.email,
                },

                notice: payload.notice,
            },
        });

        return new SuccessResponse({ data: {
            id: order.id,
        }});
    },
});
