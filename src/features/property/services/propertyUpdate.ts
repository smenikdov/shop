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
        name: v.string(),
        description: v.string().nullable(),
        type: v.string().in(Object.values(PROPERTY_TYPE)).nullable(),
        meta: v.object({}),
        // TODO
        // options
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
