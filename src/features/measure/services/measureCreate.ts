import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { AccessDeniedResponse, SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';

export const measureCreateHandler = new Handler({
    name: 'Создание единицы измерения',
    errors: { default: 'Ошибка при создании единицы измерения' },
    schema: v.object({
        name: v.string().required(),
        shortName: v.string().required(),
        description: v.string(),
    }),

    async request(payload: { name: string; shortName: string; description: string }) {
        const measure = await prisma.measure.create({
            data: {
                name: payload.name,
                shortName: payload.shortName,
                description: payload.description || null,
            },
        });

        return new SuccessResponse({ data: null });
    },
});
