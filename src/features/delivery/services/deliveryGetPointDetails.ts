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
    errors: { default: 'Ошибка при получении деталей точки выдачи' },
    schema: v.object({
        pointId: v.id(),
    }),

    async request(payload: { pointId: number }) {
        const point = await prisma.point.findUnique({
            select: {
                
            },
            where: {
                id: payload.pointId,
            },
        });

        if (!point) {
            return new NotFoundResponse({ message: 'Точка выдачи не найдена' });
        }
    
        return new SuccessResponse({ data: point });
    },
});
