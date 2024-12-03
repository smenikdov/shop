import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { AccessDeniedResponse, SuccessResponse } from '@/utils/actions/responses';
import type { MeasureUpdatePayload } from '@/features/measure/typings';
import * as v from '@/utils/validate';

export const measureUpdateHandler = new Handler({
    name: 'Обновление единицы измерения',
    errors: { default: 'Ошибка при обновление единицы измерения' },
    schema: v.object({
        measureId: v.id(),
        name: v.string().required(),
        shortName: v.string().required(),
        description: v.string(),
    }),

    async request(payload: MeasureUpdatePayload) {
        const measure = await prisma.measure.update({
            data: {
                name: payload.name,
                shortName: payload.shortName,
                description: payload.description || null,
            },
            where: {
                id: payload.measureId,
            },
        });

        return new SuccessResponse({ data: null });
    },
});
