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

export const yookassaGetPaymentDetailsHandler = new Handler({
    name: 'Получение информации о платеже в ЮKassa',
    errors: { default: 'Ошибка при получении информации о платеже в ЮKassa' },
    schema: v.object({
        paymentId: v.id(),
    }),

    async request(payload: { paymentId: number }) {
        const paymentInfo = {}; // TODO

        const response = await yookassa.get(`/payments/${ paymentInfo.yookassaId }`, {});
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
