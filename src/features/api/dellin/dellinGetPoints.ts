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
import { dellin } from './dellin';

interface DellinGetPointsResponse {
    city: Array<{
        id: string;
        name: string;
        code: string;
        cityID: integer;
        latitude: string;
        longitude: string;
        url: string;
        timeshift: string;
        requestEndTime: string;
        sfrequestEndTime: string;
        day2dayRequest: string;
        day2daySFRequest: string;
        preorderRequest: string;
        freeStorageDays: string;
        terminals: Array<{
            id: string;
            name: string;
            address: string;
            fullAddress: string;
            latitude: string;
            longitude: string;
            phones: Array<{
                number: string;
                type: 'городской' | 'мобильный';
                comment?: string;
                primary: boolean;
            }>;
            isPVZ: boolean;
            isOffice: boolean;
            receiveCargo: boolean;
            giveoutCargo: boolean;
            storage: boolean;
            mail: string;
            cashOnDelivery: boolean;
            maps: Array<{}>; // TODO
            addressCode: {
                street_code: string;
            };
            calcSchedule: {
                derival: string;
                arrival: string;
            };
            default: string;
            maxVolume: float;
            maxWeight: float;
            maxHeight: float;
            maxWidth: float;
            maxLength: float;
            worktables: {
                worktable: Array<{
                    department: string;
                    monday: string;
                    tuesday: string;
                    wednesday: string;
                    thursday: string;
                    friday: string;
                    saturday: string;
                    sunday: string;
                    timetable: string;
                }>;
                specialWorktable?: {
                    receive: Array<string>;
                    giveout: Array<string>;
                };
            };
        }>;
    }>
};

export const dellinGetPointsHandler = new Handler({
    name: 'Получение списка пунктов выдачи заказов Деловые Линии',
    errors: { default: 'Ошибка при получении списка пунктов выдачи заказов Деловые Линии' },
    schema: v.object({
        cityDellinId: v.id(),
    }),

    async request(payload: { cityDellinId: number }) {
        const termionalsResponse = await dellin.get<{
            hash: string;
            url: string;
        }>('/v3/public/terminals.json');
        const termionalsData = termionalsResponse.data;

        const response = await dellin.get<DellinGetPointsResponse>(termionalsData.url);
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
