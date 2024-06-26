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
    defaultError: '',
    schema: v.object({
        cityId: v.id(),
    }),

    async request(payload: { cityId: number }) {
        const points = await prisma.point.findMany({
            select: {
                // TODO
            },
            where: {
                cityId: payload.cityId,
            },
        });

        return new SuccessResponse({ data: points });
    },
});
