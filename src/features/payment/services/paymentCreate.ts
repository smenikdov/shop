import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';

import { PAYMENT_STATUS } from '@/constants';

import { yookassaCreatePaymentHandler } from '@/features/api/yookassa/payment/yookassaCreatePayment';

export const paymentCreateHandler = new Handler({
    name: 'Оплата заказа',
    errors: { default: 'Ошибка при оплате заказа' },
    schema: v.object({
        orderId: v.id(),
        userId: v.id(),
    }),

    async request(payload: { orderId: number; userId: number }) {
        // TODO проверки какие-то нужны наверное 

        const response = await yookassaCreatePaymentHandler.execute({
            orderId: payload.orderId,
            userId: payload.userId,
        });
        if (!response.isSuccess) {
            throw new Error('Ошибка при создании оплаты в ЮKassa');
        }
        const payment = await prisma.payment.create({
            data: {
                userId: payload.userId,
                orderId: payload.orderId,
                yookassaId: response.data.id,
                status: PAYMENT_STATUS.PENDING,
            },
        });
        return new SuccessResponse({ data: null });
    },
});
