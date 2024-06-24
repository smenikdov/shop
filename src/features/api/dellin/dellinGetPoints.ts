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

interface DellinGetPointsResponse {
    city: Array<>
};

export const dellinGetPointsHandler = new Handler({
    name: 'Получение списка пунктов выдачи заказов Деловые Линии',
    defaultError: 'Ошибка при получении списка пунктов выдачи заказов Деловые Линии',
    schema: v.object({
        cityDellinId: v.id(),
    }),

    async request(payload: { cityDellinId: number }) {
        const termionalsResponse = await dellin.get<{
            hash: string;
            url: string;
        }>('/v3/public/terminals.json');
        const termionalsData = termionalsResponse.data;

        const response = await dellin.get<DellinGetPointsResponse>(termionalsData.url);
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
