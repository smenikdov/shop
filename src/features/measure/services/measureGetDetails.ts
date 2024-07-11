import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { NotFoundResponse, SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { includePagination } from '@/utils/prisma';

export const measureGetDetailsHandler = new Handler({
    name: 'Получение информации о единице измерения',
    errors: { default: 'Ошибка при получении информации о единице измерения' },
    schema: v.object({
        measureId: v.id(),
    }),

    async request(payload: { measureId: integer }) {
        const measure = await prisma.measure.findUnique({
            select: {
                name: true,
                shortName: true,
                description: true,
            },
            where: {
                id: payload.measureId,
            },
        });

        if (!measure) {
            return new NotFoundResponse({ message: 'Единица измерения не найдена' });
        }

        return new SuccessResponse({ data: measure });
    },
});
