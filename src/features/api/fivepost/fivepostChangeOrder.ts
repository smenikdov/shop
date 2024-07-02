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
import { fivepost } from './fivepost';

export const fivepostChangeOrderHandler = new Handler({
    name: 'Получение списка пунктов выдачи заказов 5POST',
    errors: { default: 'Ошибка при получении списка пунктов выдачи заказов 5POST' },
    schema: v.object({}),

    async request(payload: { }) {
        const response = await fivepost.get('/', {});
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
