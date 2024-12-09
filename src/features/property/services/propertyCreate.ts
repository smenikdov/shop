import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import type { PropertyCreatePayload } from '@/features/property/typings';

export const propertyCreateHandler = new Handler({
    name: 'Создание своства',
    errors: { default: 'Ошибка при создании своства' },
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

    async request(payload: PropertyCreatePayload) {
        const property = await prisma.property.create({
            data: {
                userId: payload.userId,
                status: ORDER_STATUS.PAYMENT,
                total: total,
                orderItems: userInfo.checkoutItems,
                paymentType: payload.paymentType,
            },
        });

        return new SuccessResponse({ data: {
            id: property.id,
        }});
    },
});
