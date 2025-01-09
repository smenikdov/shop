import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import type { CategoryPropertyUpdatePayload } from '@/features/category/typings';

export const categoryPropertyUpdateHandler = new Handler({
    name: 'Обновление свойства категории',
    errors: { default: 'Ошибка при обновлении свойства категории' },
    schema: v.object({
        categoryId: v.id(),
        propertyId: v.id(),
        isUseAsFilter: v.boolean(),
        isRequired: v.boolean(),
    }),

    async request(payload: CategoryPropertyUpdatePayload) {
        const categoryProperty = await prisma.categoryProperty.update({
            data: {
                isUseAsFilter: payload.isUseAsFilter,
                isRequired: payload.isRequired,
            },
            where: {
                categoryId: payload.categoryId,
                propertyId: payload.propertyId,
            },
        });

        return new SuccessResponse({ data: null });
    },
});