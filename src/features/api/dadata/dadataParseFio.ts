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

export type DadataParseFioData = Array<{
    source: string;
    result: string | null;
    result_genitive: string | null;
    result_dative: string | null;
    result_ablative: string | null;
    surname: string | null;
    name: string | null;
    patronymic: string | null;
    gender: 'М' | 'Ж' | 'НД';
    qc: 0 | 1 | 2;
}>;

export const dadataParseFioHandler = new Handler({
    name: 'Стандартизация ФИО',
    errors: { default: 'Ошибка при стандартизации ФИО' },
    schema: v.object({
        fio: v.string(),
    }),

    async request(payload: { fio: string }) {
        const response = await dadataCleaner.post<DadataParseFioData>('/v1/clean/name', [payload.fio]);
        const suggestion = response.data[0];
        return new SuccessResponse({ data: suggestion });
    },
});
