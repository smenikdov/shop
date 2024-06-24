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

interface CdekGetCitiesRequest {
    country_codes?: Array<string>;
    region_code?: integer;
    fias_guid?: uuid;
    postal_code?: string;
    code?: integer;
    city?: string;
    size?: integer;
    page?: integer;
    lang?: 'rus' | 'eng' | 'zho';
    payment_limit?: -1 | 0;
};

interface CdekGetCitiesResponse {
    code: integer;
    city: string;
    fias_guid?: uuid;
    city_uuid: uuid;
    kladr_code?: string;
    country_code: string;
    country: string;
    region: string;
    region_code?: integer;
    fias_region_guid?: uuid;
    kladr_region_code?: string;
    sub_region?: string;
    longitude?: float;
    latitude?: float;
    time_zone?: string;
    payment_limit: float;
    errors: Array<{
        code: string;
        message: string;
    }>
};

export const cdekGetCitiesHandler = new Handler({
    name: 'Получение списка всех городов СДЭК',
    defaultError: 'Ошибка при получении списка городов СДЭК',

    async request(payload: {}) {
        const request: CdekGetCitiesRequest = {};
        const response = await cdek.get<CdekGetCitiesResponse>('/v2/location/cities', {
            params: request,
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
