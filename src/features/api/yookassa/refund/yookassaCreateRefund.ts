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

export const yookassaCreateRefundHandler = new Handler({
    name: 'Создание возврата в ЮKassa',
    defaultError: 'Ошибка при создании возврата в ЮKassa',

    async request(payload: {}) {
        const response = await yookassa.post('/refunds', {});
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
