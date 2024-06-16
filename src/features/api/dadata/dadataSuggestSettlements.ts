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

const formatDadataAddress = (settlement) => {
    let settlementName;
    let settlementId;
    if (settlement.data.settlement) {
        settlementName = settlement.data.settlement_with_type;
        settlementId = settlement.data.settlement_fias_id;
    }
    if (settlement.data.city) {
        settlementName = settlement.data.city_with_type;
        settlementId = settlement.data.city_fias_id;
    }
    return {
        name: settlementName,
        fiasId: settlementId,
    };
};

export const dadataSuggestSettlementsHandler = new Handler({
    name: 'Получение списка городов',
    defaultError: 'Ошибка при получении списка городов',
    schema: v.object({
        query: v.string(),
    }),

    async request(payload: { query: string }) {
        const response = await dadata.post('/4_1/rs/suggest/address', {
            query: payload.query,
            from_bound: { value: 'city' },
            to_bound: { value: 'settlement' },
            count: 10,
            locations: [
                {
                    country_iso_code: 'RU',
                },
            ],
        });
        const suggestions = response.data.suggestions;
        const settlements = suggestions.map(formatDadataAddress).filter((s) => !!s);
        return new SuccessResponse({ data: settlements });
    },
});
