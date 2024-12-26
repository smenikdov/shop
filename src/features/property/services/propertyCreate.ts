import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import type { PropertyCreatePayload } from '@/features/property/typings';
import { PROPERTY_TYPE } from '@/constants';

export const propertyCreateHandler = new Handler({
    name: 'Создание свойства',
    errors: { default: 'Ошибка при создании свойства' },
    schema: v.object({
        name: v.string(),
        description: v.string().nullable(),
        type: v.string().in(Object.values(PROPERTY_TYPE)).nullable(),
        meta: v.object({}),
        // TODO
        // options measure
    }),

    async request(payload: PropertyCreatePayload) {
        const property = await prisma.property.create({
            data: {
                name: payload.name,
                description: payload.description,
                type: payload.type,
                measureId: payload.measure?.id,
                meta: payload.meta,
                options: {
                    create: payload.options,
                },
            },
        });

        return new SuccessResponse({
            data: {
                id: property.id,
            },
        });
    },
});
