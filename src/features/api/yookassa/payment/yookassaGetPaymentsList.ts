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

export const yookassaGetPaymentsListHandler = new Handler({
    name: 'Получение списка платежей в ЮKassa',
    defaultError: 'Ошибка при получении списка платежей в ЮKassa',

    async request(payload: {}) {
        const response = await yookassa.get('/payments', {});
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
