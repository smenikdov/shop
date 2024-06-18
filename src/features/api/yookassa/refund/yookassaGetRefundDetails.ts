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

export const yookassaGetRefundDetailsHandler = new Handler({
    name: 'Получение информации о возврате в ЮKassa',
    defaultError: 'Ошибка при получении информации о возврате в ЮKassa',

    async request(payload: {}) {
        const response = await yookassa.post('/', {});
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
