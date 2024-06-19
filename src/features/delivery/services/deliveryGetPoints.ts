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

import { boxberryGetPointsHandler } from '@/features/api/boxberry/boxberryGetPoints';
import { dellinGetPointsHandler } from '@/features/api/dellin/dellinGetPoints';
import { cdekGetPointsHandler } from '@/features/api/cdek/cdekGetPoints';

export const deliveryGetPointsHandler = new Handler({
    name: '',
    defaultError: '',
    schema: v.object({
        cityId: v.id(),
    }),

    async request(payload: { cityId: number }) {
        const city = await prisma.city.findUnique({
            select: {
                boxberryCode: true,
                cdekCode: true,
                dellinCode: true,
            },
            where: {
                id: payload.cityId,
            },
        });

        if (!city) {
            return new NotFoundResponse({ message: 'Город не найден' });
        }

        const requests = [];

        if (city.boxberryCode) {
            requests.push(boxberryGetPointsHandler.execute({ cityCode: city.boxberryCode }));
        }
        if (city.dellinCode) {
            requests.push(dellinGetPointsHandler.execute({ cityCode: city.dellinCode }));
        }
        if (city.cdekCode) {
            requests.push(cdekGetPointsHandler.execute({ cityCode: city.cdekCode }));
        }

        const responses = await Promise.allSettled([requests]);
        const points = [];
        responses.forEach((response) => {
            if (response.isSuccess) {
                points.push(...response.data);
            }
        });

        return new SuccessResponse({ data: points });
    },
});
