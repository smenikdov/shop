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
import { cdek } from './cdek';

export const cdekDeleteOrderHandler = new Handler({
    name: 'Получение списка пунктов выдачи заказов Boxberry',
    errors: { default: 'Ошибка при получении списка пунктов выдачи заказов Boxberry' },
    schema: v.object({
    }),

    async request(payload: {}) {
        const response = await cdek.get('/', {});
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
