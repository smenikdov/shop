import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    NotFoundResponse,
    SuccessResponse,
} from '@/utils/actions/responses';
import * as v from '@/utils/validate';

export const deliveryGetPointsHandler = new Handler({
    name: '',
    errors: { default: '' },
    schema: v.object({
        cityId: v.id(),
    }),

    async request(payload: { cityId: number }) {
        const points = await prisma.point.findMany({
            select: {
                id: true,
                deliveryCompany: true,
                type: true,
                longitude: true,
                latitude: true,
            },
            where: {
                cityId: payload.cityId,
                // TODO filters
            },
        });

        return new SuccessResponse({ data: points });
    },
});
