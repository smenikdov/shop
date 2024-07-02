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
import { dadata } from './dadata';

export const dadataSuggestFioHandler = new Handler({
    name: 'Получение списка имён',
    errors: { default: 'Ошибка при получении списка имён' },
    schema: v.object({
        query: v.string(),
    }),

    async request(payload: { query: string }) {
        const response = await dadata.post('/4_1/rs/suggest/fio', {
            query: payload.query,
            gender: 'UNKNOWN',
            count: 10,
        });
        const suggestions = response.data.suggestions.map((s) => s.value);
        return new SuccessResponse({ data: suggestions });
    },
});
