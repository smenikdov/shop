import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { includePagination } from '@/utils/prisma';

interface PayloadFilters {
    page: number;
    name: string;
    categoryId: number;
}

export const categoryGetAllHandler = new Handler({
    name: 'Получение списка всех категорий',
    errors: { default: 'Ошибка при получении списка всех категорий' },
    schema: v.object({
        page: v.page(),
        name: v.string(),
        categoryId: v.id(),
    }),

    async request(payload: PayloadFilters) {
        const categories = await prisma.category.findMany({
            ...includePagination(payload.page),
            select: {
                id: true,
                name: true,
            },
            where: {
                id: payload.categoryId || undefined,
                name: {
                    contains: payload.name || undefined,
                    mode: 'insensitive',
                },
            },
        });

        return new SuccessResponse({ data: categories });
    },
});