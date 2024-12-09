import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';

export const measureSuggestHandler = new Handler({
    name: 'Получение подсказок для выбора единицы измерения',
    errors: { default: 'Ошибка при получении подсказок для выбора единицы измерения' },
    schema: v.object({
        query: v.string(),
    }),

    async request(payload: { query: string }) {
        const measures = await prisma.measure.findMany({
            take: 10,
            select: {
                id: true,
                name: true,
            },
            where: {
                name: {
                    contains: payload.query || undefined,
                    mode: 'insensitive',
                },
            },
        });

        return new SuccessResponse({ data: measures });
    },
});