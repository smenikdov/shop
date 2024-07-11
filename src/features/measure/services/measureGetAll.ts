import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { includePagination } from '@/utils/prisma';

interface PayloadFilters {
    page: number;
    name: string;
    measureId: number;
}

export const measureGetAllHandler = new Handler({
    name: 'Получение списка всех единиц измерения',
    errors: { default: 'Ошибка при получении списка всех единиц измерения' },
    schema: v.object({
        page: v.page(),
        name: v.string(),
        measureId: v.id(),
    }),

    async request(payload: PayloadFilters) {
        const measures = await prisma.measure.findMany({
            ...includePagination(payload.page),
            select: {
                id: true,
                name: true,
                shortName: true,
            },
            where: {
                id: payload.measureId || undefined,
                name: {
                    contains: payload.name || undefined,
                },
            },
        });

        return new SuccessResponse({ data: measures });
    },
});
