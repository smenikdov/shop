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

export const cdekGetPointsHandler = new Handler({
    name: 'Получение списка пунктов выдачи заказов Boxberry',
    defaultError: 'Ошибка при получении списка пунктов выдачи заказов Boxberry',
    schema: v.object({
        cityCode: v.id(),
    }),

    async request(payload: { cityCode: number }) {
        const response = await cdek.get('/v2/deliverypoints', {
            params: {
                city_code: payload.cityCode,
                type: 'ALL',
                country_code: 0,
            },
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
