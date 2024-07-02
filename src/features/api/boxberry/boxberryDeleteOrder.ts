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
import { boxberry } from './boxberry';

interface BoxberryDeleteOrderRequest {
    method: 'CancelOrder';
    track?: string;
    orderId?: number;
    cancelType?: 1 | 2;
};

interface BoxberryDeleteOrderResposne {
    err: boolean | string;
};

export const boxberryDeleteOrderHandler = new Handler({
    name: 'Получение списка пунктов выдачи заказов Boxberry',
    errors: { default: 'Ошибка при получении списка пунктов выдачи заказов Boxberry' },
    schema: v.object({
    }),

    async request(payload: {}) {
        const request: BoxberryDeleteOrderRequest = {
            method: 'CancelOrder',
        };

        const response = await boxberry.get<BoxberryDeleteOrderResposne>('/', {});
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
