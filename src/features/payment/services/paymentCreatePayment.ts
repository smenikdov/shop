import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';

import { yookassaCreatePaymentHandler } from '@/features/api/yookassa/payment/yookassaCreatePayment';

export const paymentCreatePayment = new Handler({
    name: 'Оплата заказа',
    defaultError: 'Ошибка при оплате заказа',
    schema: v.object({
        orderId: v.id(),
    }),

    async request(payload: { orderId: number }) {
        const response = await yookassaCreatePaymentHandler.execute({});
        return new SuccessResponse({ data: null });
    },
});
