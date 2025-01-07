import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import type { CategoryCreatePayload } from '@/features/category/typings';

export const categoryCreateHandler = new Handler({
    name: 'Создание категории',
    errors: { default: 'Ошибка при создании категории' },
    schema: v.object({
        name: v.sr(),
        description: v.sn(),
    }),

    async request(payload: CategoryCreatePayload) {
        const category = await prisma.category.create({
            data: {
                name: payload.name,
                description: payload.description,
            },
        });

        return new SuccessResponse({ data: {
            id: category.id,
        }});
    },
});