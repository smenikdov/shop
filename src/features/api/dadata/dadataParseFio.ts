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
import { dadataCleaner } from './dadata';

export const dadataParseFioHandler = new Handler({
    name: 'Стандартизация ФИО',
    errors: { default: 'Ошибка при стандартизации ФИО' },
    schema: v.object({
        fio: v.string(),
    }),

    async request(payload: { fio: string }) {
        const response = await dadataCleaner.post('/v1/clean/name', [payload.fio]);
        const suggestion = response.data[0];
        return new SuccessResponse({ data: suggestion });
    },
});
