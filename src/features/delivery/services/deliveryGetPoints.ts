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

import { fivepostGetPointsHandler } from '@/features/api/fivepost/fivepostGetPoints';
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
                boxberryId: true,
                cdekId: true,
                dellinId: true,
                fivepostId: true,
            },
            where: {
                id: payload.cityId,
            },
        });

        if (!city) {
            return new NotFoundResponse({ message: 'Город не найден' });
        }

        const requests = [];

        if (city.boxberryId) {
            requests.push(boxberryGetPointsHandler.execute({ cityBoxberryId: city.boxberryId }));
        }
        if (city.dellinId) {
            requests.push(dellinGetPointsHandler.execute({ cityDellinId: city.dellinId }));
        }
        if (city.cdekId) {
            requests.push(cdekGetPointsHandler.execute({ cityCdekId: city.cdekId }));
        }
        if (city.fivepostId) {
            requests.push(fivepostGetPointsHandler.execute({ cityFivepostId: city.fivepostId }));
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
