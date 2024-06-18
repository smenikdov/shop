
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

export const dellinGetCitiesHandler = new Handler({
    name: 'Получение списка всех городов Boxberry',
    defaultError: 'Ошибка при получении списка городов Boxberry',

    async request(payload: {}) {
        const response = await dellin.get('/', {
            params: {
                method: 'ListCities',
            },
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
