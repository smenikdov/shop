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

import { DELIVERY_COMPANY } from '@/constants';

export const deliveryGetPointDetailsHandler = new Handler({
    name: 'Получение деталей точки выдачи',
    defaultError: 'Ошибка при получении деталей точки выдачи',
    schema: v.object({
        pointId: v.id(),
    }),

    async request(payload: { pointId: integer }) {
        const point = await prisma.point.findUnique({
            select: {
                // TODO
            },
            where: {
                id: payload.pointId,
            },
        });

        if (!point) {
            return new NotFoundResponse({ message: 'Точка не найдена' });
        }

        return new SuccessResponse({ data: point });
    },
});
