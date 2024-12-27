import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import type { PropertyUpdatePayload } from '@/features/property/typings';
import { PROPERTY_TYPE } from '@/constants';

export const propertyUpdateHandler = new Handler({
    name: 'Обновление свойства',
    errors: { default: 'Ошибка при обновлении свойства' },
    schema: v.object({
        propertyId: v.id(),
        name: v.sr(),
        description: v.sn(),
        type: v.constant(PROPERTY_TYPE).nullable(),
        options: v.ao({
            id: v.id().optional(),
            name: v.sr(),
        }),
        measure: v.object({
            id: v.id(),
            name: v.sr(),
        }).nullable(),

        // TODO better check
        meta: v.object({}),
    }),

    async request(payload: PropertyUpdatePayload) {
        const property = await prisma.property.update({
            data: {
                name: payload.name,
                description: payload.description,
                type: payload.type,
                measureId: payload.measure?.id,
                meta: payload.meta,
                options: {
                    upsert: payload.options.map(option => ({
                        create: {
                            name: option.name,
                        },
                        update: {
                            name: option.name,
                        },
                        where: {
                            id: option.id,
                        },
                    })),
                },
            },
            where: {
                id: payload.propertyId,
            },
        });

        return new SuccessResponse({ data: null });
    },
});
