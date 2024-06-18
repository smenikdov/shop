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
import { dellin } from './dellin';

export const dellinGetPointsHandler = new Handler({
    name: 'Получение деталей пункта выдачи заказов Boxberry',
    defaultError: 'Ошибка при получении деталей пункта выдачи заказов Boxberry',
    schema: v.object({
        pointCode: v.id(),
    }),

    async request(payload: { pointCode: number }) {
        const response = await dellin.get('/', {
            params: {
                method: 'PointsDescription',
                code: payload.pointCode,
                photo: false,
            },
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
