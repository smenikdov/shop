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
import { yookassa } from '../yookassa';

const YOOKASSA_PAYMENT_SUCCEEDED_URL = '';

export const yookassaSubscribeOnPaymentCancelHandler = new Handler({
    name: 'Подписка на уведомление об отмене платежа в ЮKassa',
    errors: { default: 'Ошибка при подписке на уведомление об отмене платежа в ЮKassa' },

    async request(payload: {}) {
        const response = await yookassa.post('/v3/webhooks', {
            event: 'payment.succeeded',
            url: YOOKASSA_PAYMENT_SUCCEEDED_URL,
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
