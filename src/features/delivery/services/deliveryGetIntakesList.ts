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

import { includePagination } from '@/utils/prisma';

export const deliveryGetIntakesListHandler = new Handler({
    name: 'Получение списка заявок на вызов курьера',
    errors: { default: 'Ошибка при получении списка заявок на вызов курьера' },
    schema: v.object({
        page: v.page(),
    }),

    async request(payload: { page: number }) {
        const intakes = await prisma.intake.findMany({
            ...includePagination(payload.page),
            select: {
                deliveryCompany: true,
                arriveAt: true,
            },
        });
        return new SuccessResponse({ data: intakes });
    },
});
