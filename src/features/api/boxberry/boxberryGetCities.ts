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

export const boxberryGetCitiesHandler = new Handler({
    name: 'Получение списка всех городов Boxberry',
    defaultError: 'Ошибка при получении списка городов Boxberry',

    async request(payload: { cityCode: number }) {
        const response = await boxberry.get('/', {
            params: {
                method: 'ListCities',
            },
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
