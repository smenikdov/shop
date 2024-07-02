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

interface CdekGetPointsRequest {
    postal_code?: integer;
    city_code?: integer;
    type?: string;
    country_code?: string;
    region_code?: integer;
    have_cashless?: boolean;
    have_cash?: boolean;
    allowed_cod?: boolean;
    is_dressing_room?: boolean;
    weight_max?: integer;
    weight_min?: integer;
    lang?: 'rus' | 'eng' | 'zho';
    take_only?: boolean;
    is_handout?: boolean;
    is_reception?: boolean;
    fias_guid?: uuid;
    code?: string;
    is_ltl?: boolean;
    fulfillment?: boolean;
    size?: integer;
    page?: integer;
};

// Переделать на новый формат
type CdekGetPointsResponse = Array<{
    code: string;
    uuid: uuid;
    location: {
        country_code: string;
        region_code: integer;
        region: string;
        city_code: integer;
        city: string;
        fias_guid?: uuid;
        postal_code?: string;
        longitude: float;
        latitude: float;
        address: string;
        address_full: string;
        city_uuid: uuid;
    };
    address_comment?: string;
    nearest_station?: string;
    nearest_metro_station?: string;
    work_time?: string;
    phones: Array<{
        number: string;
        additional?: string;
    }>;
    email?: string;
    note?: string;
    type: 'PVZ' | 'POSTAMAT';
    owner_code: string;
    take_only: boolean;
    is_handout: boolean;
    is_reception: boolean;
    is_dressing_room: boolean;
    have_cashless: boolean;
    have_cash: boolean;
    have_fast_payment_system: boolean;
    allowed_cod: boolean;
    is_ltl?: boolean;
    fulfillment?: boolean;
    site?: string;
    office_image_list?: Array<{
        url: string;
    }>;
    work_time_list: Array<{
        day: integer;
        time: string;
    }>;
    work_time_exception_list: Array<{
        date_start: ISODate;
        date_end: ISODate;
        time_start?: ISODate;
        time_end?: ISODate;
        is_working: ISODate;
    }>;
    weight_min?: float;
    weight_max?: float;
    dimensions?: Array<{
        width: float;
        height: float;
        depth: float;
    }>
    errors?: Array<{
        code: string;
        message: string;
    }>
}>;

export const cdekGetPointsHandler = new Handler({
    name: 'Получение списка пунктов выдачи заказов СДЭК',
    errors: { default: 'Ошибка при получении списка пунктов выдачи заказов СДЭК' },
    schema: v.object({
        cityCdekId: v.id(),
    }),

    async request(payload: { cityCdekId: number }) {
        const request: CdekGetPointsRequest = {
            city_code: payload.cityCdekId,
            type: 'ALL',
            country_code: 0,
        };
        const response = await cdek.get<CdekGetPointsResponse>('/v2/deliverypoints', {
            params: request,
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
