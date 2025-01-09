import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import type { CategoryPropertyCreatePayload } from '@/features/category/typings';

export const categoryPropertyCreateHandler = new Handler({
    name: 'Добавление свойства к категории',
    errors: { default: 'Ошибка при добавлении свойства к категории' },
    schema: v.object({
        categoryId: v.id(),
        propertyId: v.id(),
        isUseAsFilter: v.boolean(),
        isRequired: v.boolean(),
    }),

    async request(payload: CategoryPropertyCreatePayload) {
        const categoryProperty = await prisma.categoryProperty.create({
            data: {
                categoryId: payload.categoryId,
                propertyId: payload.propertyId,
                isUseAsFilter: false,
                isRequired: false,
            },
        });

        return new SuccessResponse({ data: {
            id: categoryProperty.id,
        }});
    },
});