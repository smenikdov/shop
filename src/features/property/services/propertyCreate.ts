import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { PROPERTY_TYPE } from '@/constants';
import type { PropertyCreatePayload } from '@/features/property/typings';

export const propertyCreateHandler = new Handler({
    name: 'Создание свойства',
    errors: { default: 'Ошибка при создании свойства' },
    schema: v.object({
        name: v.sr(),
        description: v.sn(),
        type: v.constant(PROPERTY_TYPE).nullable(),
        options: v.ao({
            name: v.sr(),
        }),
        measure: v.object({
            id: v.id(),
            name: v.sr(),
        }).nullable(),

        // TODO better check
        meta: v.object({}),
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
