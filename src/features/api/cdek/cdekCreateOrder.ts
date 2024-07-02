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
import { DELIVERY_INFO } from '@/constants';

import type { OrderFullInfo } from '@/features/order/typings';

interface CdekCreateOrderRequest {
    type?: 1 | 2,
    additional_order_types?: number;
    number?: string;
    tariff_code: number;
    comment?: string;
    developer_key?: string;
    // TODO
};

interface CdekCreateOrderResponse {};

export const cdekCreateOrderHandler = new Handler({
    name: 'Создание заказа на доставку СДЭК',
    errors: { default: 'Ошибка при создании заказа на доставку СДЭК' },

    async request(payload: { order: OrderFullInfo }) {
        const { order } = payload;

        const request: CdekCreateOrderRequest = {};

        const response = await cdek.post<CdekCreateOrderResponse>('/', request);
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
