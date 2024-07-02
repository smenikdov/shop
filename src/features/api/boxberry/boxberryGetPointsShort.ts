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
    method: 'ListPointsShort';
    CityCode?: number;
};

type BoxberryGetPointsShortResponse = Array<{
    CityCode: string;
    Code: string;
    UpdateDate: string;
}>;

export const boxberryGetPointsShortHandler = new Handler({
    name: 'Получение списка пунктов выдачи заказов Boxberry',
    errors: { default: 'Ошибка при получении списка пунктов выдачи заказов Boxberry' },
    schema: v.object({}),

    async request(payload: { }) {
        const request: BoxberryGetPointsRequest = {
            method: 'ListPointsShort',
        };
        const response = await boxberry.get<BoxberryGetPointsShortResponse>('/', {
            params: request,
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
