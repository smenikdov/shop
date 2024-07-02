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

interface BoxberryGetPointsRequest {
    method: 'ListPoints';
    CityCode: number;
    prepaid?: 0 | 1;
    is_include_postamat?: 0 | 1;
};

type BoxberryGetPointsResponse = Array<{
    Code: string;
    Name: string;
    Address: string;
    Phone: string;
    WorkShedule: string;
    TripDescription: string;
    DeliveryPeriod: number;
    CityCode: string;
    CityName: string;
    TariffZone: string;
    Settlement: string;
    Area: string;
    Country: string;
    GPS: string;
    AddressReduce: string;
    OnlyPrepaidOrders: 'Yes' | 'No';
    Acquiring: 'Yes' | 'No';
    DigitalSignature: 'Yes' | 'No';
    CountryCode: string;
    NalKD: 'Yes' | 'No';
    Metro: string;
    TypeOfOffice: 1 | 2;
    VolumeLimit: number;
    LoadLimit: number;
    Postamat: boolean;
}>;

export const boxberryGetPointsHandler = new Handler({
    name: 'Получение списка пунктов выдачи заказов Boxberry',
    errors: { default: 'Ошибка при получении списка пунктов выдачи заказов Boxberry' },
    schema: v.object({
        cityBoxberryId: v.id(),
    }),

    async request(payload: { cityBoxberryId: number }) {
        const request: BoxberryGetPointsRequest = {
            method: 'ListPoints',
            CityCode: payload.cityBoxberryId,
            prepaid: 0,
            is_include_postamat: 1,
        };
        const response = await boxberry.get<BoxberryGetPointsResponse>('/', {
            params: request,
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
