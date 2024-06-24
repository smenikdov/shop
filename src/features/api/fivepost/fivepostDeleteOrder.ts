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

interface FivepostDeleteOrderRequest {};

interface FivepostDeleteOrderResponse {};

export const fivepostDeleteOrderHandler = new Handler({
    name: 'Получение списка пунктов выдачи заказов 5POST',
    defaultError: 'Ошибка при получении списка пунктов выдачи заказов 5POST',
    schema: v.object({
    }),

    async request(payload: {}) {
        const request: FivepostDeleteOrderRequest = {};
        const response = await fivepost.post<FivepostDeleteOrderResponse>(`/cancelOrder/byOrderId/${ TODO }`, request);
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
