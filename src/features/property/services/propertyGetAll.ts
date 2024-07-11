import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { includePagination } from '@/utils/prisma';

interface PayloadFilters {
    page: number;
    name: string;
    propertyId: number;
}

export const propertyGetAllHandler = new Handler({
    name: 'Получение списка всех свойств',
    errors: { default: 'Ошибка при получении списка всех свойств' },
    schema: v.object({
        page: v.page(),
        name: v.string(),
        propertyId: v.id(),
    }),

    async request(payload: PayloadFilters) {
        const properties = await prisma.property.findMany({
            ...includePagination(payload.page),
            select: {
                id: true,
                name: true,
            },
            where: {
                id: payload.propertyId || undefined,
                name: {
                    contains: payload.name || undefined,
                },
            },
        });

        return new SuccessResponse({ data: properties });
    },
});
