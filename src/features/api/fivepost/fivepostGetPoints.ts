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
import { fivepost } from './fivepost';

interface FivepostGetPointsRequest {
    pageSize: number;
    pageNumber: number;
};

type FivepostGetPointsResponse = Array<{
    content: {
        id: string;
        name: string;
        partnerName: string;
        type: 'POSTAMANT' | 'TOBACCO' | 'ISSUE_POINT';
        additional?: string;
        workHours: Array<{
            day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
            opensAt: string;
            closesAt: string;
            timezone: string;
            timezoneOffset: string;
        }>,
        fullAddress: string;
        address: {
            country: string;
            zipCode: number;
            region: string;
            regionType?: string;
            city: string;
            cityType?: string;
            street: string;
            house: string;
            building?: string;
            lat: number;
            lng: number;
            metroStation?: string;
        },
        cellLimits: {
            maxCellWidth: number;
            maxCellHeight: number;
            maxCellLength: number;
            maxWeight: number;
        },
        returnAllowed?: boolean;
        timezone: string;
        phone: string;
        cashAllowed: boolean;
        cardAllowed: boolean;
        loyaltyAllowed?: boolean;
        extStatus: 'ACTIVE';
        localityFiasCode: string;
        deliverySL: {
            SL?: number;
        },
        rate: {
            zone: string;
            rateType: string;
            rateValue: number;
            rateExtraValue: number;
            rateCurrency: '' // TODO,
            vat: number,
            rateValueWithVat: number;
            rateExtraValueWithVat: number;
        },
        lastMileWarehouse: {
            id: string;
            name: string;
        },
        totalPages: number;
        totalElements: number;
        numberOfElements: number;
    };
}>;

export const fivepostGetPointsHandler = new Handler({
    name: 'Получение списка пунктов выдачи заказов 5POST',
    defaultError: 'Ошибка при получении списка пунктов выдачи заказов 5POST',
    schema: v.object({
        cityFivepostId: v.id(),
    }),

    async request(payload: { cityFivepostId: number }) {
        const request: FivepostGetPointsRequest = {};
        const response = await fivepost.post<FivepostGetPointsResponse>('/api/v1/pickuppoints/query', request);
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
