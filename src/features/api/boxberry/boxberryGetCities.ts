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

interface BoxberryGetCitiesRequest {
    method: 'ListCities',
};

type BoxberryGetCitiesResponse = Array<{
    Name: string;
    Code: string;
    CountryCode: string;
    Prefix: string;
    ReceptionLaP: 0 | 1;
    DeliveryLaP: 0 | 1;
    Reception: 0 | 1;
    CourierDelivery: 0 | 1;
    ForeignReceptionReturns: 0 | 1;
    Terminal: 0 | 1;
    Kladr: string;
    Region: string;
    District: string;
    CourierReception: 0 | 1;
}>;

export const boxberryGetCitiesHandler = new Handler({
    name: 'Получение списка всех городов Boxberry',
    errors: { default: 'Ошибка при получении списка городов Boxberry' },

    async request(payload: {}) {
        const request: BoxberryGetCitiesRequest = {
            method: 'ListCities',
        };
        const response = await boxberry.get<BoxberryGetCitiesResponse>('/', {
            params: request,
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
