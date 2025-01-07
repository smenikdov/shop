import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import type { CategoryUpdatePayload } from '@/features/category/typings';

export const categoryUpdateHandler = new Handler({
    name: 'Обновление категории',
    errors: { default: 'Ошибка при обновление категории' },
    schema: v.object({
        name: v.sr(),
        description: v.sn(),
        categoryId: v.id(),
    }),

    async request(payload: CategoryUpdatePayload) {
        const category = await prisma.category.update({
            data: {
                name: payload.name,
                description: payload.description,
            },
            where: {
                id: payload.categoryId,
            },
        });

        return new SuccessResponse({ data: null });
    },
});