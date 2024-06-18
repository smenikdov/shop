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

export const yookassaCreateReceiptHandler = new Handler({
    name: 'Создание чека в ЮKassa',
    defaultError: 'Ошибка при создании чека в ЮKassa',

    async request(payload: {}) {
        const response = await yookassa.post('/receipts', {});
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
