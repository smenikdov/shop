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

export const yookassaGetRefundsListHandler = new Handler({
    name: 'Получение списка возвратов в ЮKassa',
    defaultError: 'Ошибка при получении списка возвратов в ЮKassa',

    async request(payload: {}) {
        const response = await yookassa.get('/refunds', {});
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
