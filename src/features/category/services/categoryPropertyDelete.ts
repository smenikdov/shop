import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import type { CategoryPropertyDeletePayload } from '@/features/category/typings';

export const categoryPropertyDeleteHandler = new Handler({
    name: 'Отвязка свойства от категории',
    errors: { default: 'Ошибка при отвязке свойства от категории' },
    schema: v.object({
        categoryId: v.id(),
        propertyId: v.id(),
    }),

    async request(payload: CategoryPropertyDeletePayload) {
        const categoryProperty = await prisma.categoryProperty.delete({
            where: {
                categoryId: payload.categoryId,
                propertyId: payload.propertyId,
            },
        });

        return new SuccessResponse({ data: null });
    },
});