import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse, NotFoundResponse } from '@/utils/actions/responses';
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
                name: true,
                description: true,
                type: true,
                meta: true,
                measure: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                options: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            where: {
                id: payload.propertyId,
            },
        });

        if (!property) {
            return new NotFoundResponse({ message: 'Свойство не найдено' });
        }

        return new SuccessResponse({ data: property });
    },
});
