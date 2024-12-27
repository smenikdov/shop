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

export interface DadataSuggestEmailData {
    suggestions: Array<{
        value: string;
        unsrestricted_value?: string;
        data: {
            local?: string;
            domain?: string;
            type?: string;
            source?: string;
            qc?: string;
        };
    }>
};

export const dadataSuggestEmailsHandler = new Handler({
    name: 'Получение списка email-адресов',
    errors: { default: 'Ошибка при получении списка email-адресов' },
    schema: v.object({
        query: v.string(),
    }),

    async request(payload: { query: string }) {
        const response = await dadata.post<DadataSuggestEmailData>('/4_1/rs/suggest/email', {
            query: payload.query,
            count: 10,
        });
        const suggestions = response.data.suggestions.map((s) => s.value);
        return new SuccessResponse({ data: suggestions });
    },
});
