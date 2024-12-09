import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';

export const propertyGetDetailsHandler = new Handler({
    name: 'Получение деталей свойства',
    errors: { default: 'Ошибка при получении деталей свойства' },
    schema: v.object({
        propertyId: v.id(),
    }),

    async request(payload: { propertyId: integer }) {
        const property = await prisma.property.findUnique({
            select: {
                id: true,
                name: true,
            },
            where: {
                id: payload.propertyId,
            },
        });

        return new SuccessResponse({ data: property });
    },
});
