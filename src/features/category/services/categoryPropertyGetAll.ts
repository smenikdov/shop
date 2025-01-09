import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import type { CategoryPropertyGetAllPayload } from '@/features/category/typings';

export const categoryPropertyGetAllHandler = new Handler({
    name: 'Получние списка свойств категории',
    errors: { default: 'Ошибка при получении списка свойств категории' },
    schema: v.object({
        categoryId: v.id(),
    }),

    async request(payload: CategoryPropertyGetAllPayload) {
        const categoryProperties = await prisma.categoryProperty.findMany({
            select: {
                categoryId: true,
                propertyId: true,
                isUseAsFilter: true,
                isRequired: true,
                property: {
                    select: {
                        name: true,
                    },
                },
            },
            where: {
                categoryId: payload.categoryId,
            },
        });

        return new SuccessResponse({ data: categoryProperties });
    },
});