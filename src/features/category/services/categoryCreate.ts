import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import type { CategoryCreatePayload } from '@/features/category/typings';

export const categoryCreateHandler = new Handler({
    name: 'Создание категории',
    errors: { default: 'Ошибка при создании категории' },
    schema: v.object({
        name: v.string().required(),
        description: v.string(),
        // TODO property
    }),

    async request(payload: CategoryCreatePayload) {
        const category = await prisma.category.create({
            data: {
                name: payload.name,
                description: payload.description,
                categoryProperties: {
                    create: payload.categoryProperties.map(cp => ({
                        isRequired: cp.isRequired,
                        isUseAsFilter: cp.isUseAsFilter,
                        property: {
                            connect: {
                                id: cp.propertyId,
                            },
                        },
                    })),
                },
            },
        });

        return new SuccessResponse({ data: {
            id: category.id,
        }});
    },
});