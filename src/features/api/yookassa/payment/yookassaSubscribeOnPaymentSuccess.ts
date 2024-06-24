import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { yookassa } from './../yookassa';

const YOOKASSA_PAYMENT_CANCELED_URL = '';

export const yookassaSubscribeOnPaymentSuccessHandler = new Handler({
    name: 'Подписка на уведомление об успешном платеже в ЮKassa',
    defaultError: 'Ошибка при подписке на уведомление об успешном платеже в ЮKassa',

    async request(payload: {}) {
        const response = await yookassa.post('/v3/webhooks', {
            event: 'payment.canceled',
            url: YOOKASSA_PAYMENT_CANCELED_URL,
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
