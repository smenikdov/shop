import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { NotFoundResponse, SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';

export const categoryGetDetailsHandler = new Handler({
    name: 'Получение детализации категории',
    errors: { default: 'Ошибка при получении детализации категории' },
    schema: v.object({
        categoryId: v.id(),
    }),

    async request(payload: { categoryId: integer }) {
        const category = await prisma.category.findUnique({
            select: {
                id: true,
                name: true,
                description: true,
            },
            where: {
                id: payload.categoryId,
            },
        });

        if (!category) {
            return new NotFoundResponse({ message: 'Категория не найдена' });
        }

        return new SuccessResponse({ data: category });
    },
});
