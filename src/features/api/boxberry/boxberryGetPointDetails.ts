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

interface BoxberryGetPointDetailsRequest {
    method: 'PointsDescription';
    code: number;
    photo?: 0 | 1;
};

interface BoxberryGetPointDetailsResponse {
    Name: string;
    Organization: string;
    ZipCode: string;
    Country: string;
    Area: string;
    CityCode: string;
    CityName: string;
    Settlement: string;
    Metro: string;
    Street: string;
    House: string;
    Structure: string;
    Housing: string;
    Apartment: string;
    Address: string;
    AddressReduce: string;
    GPS: string;
    TripDescription: string;
    Phone: string;
    ForeignOnlineStoresOnly: boolean;
    PrepaidOrdersOnly: boolean;
    Acquiring: boolean;
    DigitalSignature: boolean;
    TypeOfOffice: 0 | 1;
    CourierDelivery: boolean;
    Reception: boolean;
    ReceptionLaP: boolean;
    DeliveryLaP: boolean;
    LoadLimit: number;
    VolumeLimit: number;
    EnablePartialDelivery: boolean;
    EnableFitting: boolean;
    fittingType: 1 | 2;
    WorkShedule: {}; // TODO
    photos: Array<string>;
    TerminalCode: string;
    TerminalName: string;
    TerminalOrganization: string;
    TerminalCityCode: string;
    TerminalCityName: string;
    TerminalAddress: string;
    TerminalPhone: string;
    CountryCode: number;
    TransType: 0 | 1 | 2;
    InterRefunds: 0 | 1;
    ExpressReception: 0 | 1;
    Terminal: 0 | 1;
    IssuanceBoxberry: 0 | 1;
    schedule: string; // TODO
    Postamat: boolean;
};

export const boxberryGetPointDetailsHandler = new Handler({
    name: 'Получение деталей пункта выдачи заказов Boxberry',
    errors: { default: 'Ошибка при получении деталей пункта выдачи заказов Boxberry' },
    schema: v.object({
        pointBoxberryId: v.id(),
    }),

    async request(payload: { pointBoxberryId: number }) {
        const request: BoxberryGetPointDetailsRequest = {
            method: 'PointsDescription',
            code: payload.pointBoxberryId,
            photo: false,
        };
        const response = await boxberry.get<BoxberryGetPointDetailsResponse>('/', {
            params: request,
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
