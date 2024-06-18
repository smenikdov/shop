
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

export const yookassaCreatePaymentHandler = new Handler({
    name: 'Подтверждение платежа в ЮKassa',
    defaultError: 'Ошибка при подтверждении платежа в ЮKassa',
    schema: v.object({
        paymentId: v.id(),
    }),

    async request(payload: { paymentId: number }) {
        const paymentInfo = {}; // TODO

        const response = await yookassa.post(`/payments/${ paymentInfo.yookassaId }/capture`, {});
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
