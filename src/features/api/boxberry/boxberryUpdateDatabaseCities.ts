import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import * as v from '@/utils/validate';

import { boxberryGetCitiesHandler } from '@/features/api/boxberry/boxberryGetCities';

export const boxberryUpdateDatabaseCitiesHandler = new Handler({
    name: 'Обновление городов из базы Boxberry',
    defaultError: 'Ошибка при обновлении городов из базы Boxberry',

    async request(payload: {}) {
        const response = await boxberryGetCitiesHandler.execute({});
        if (!response.isSuccess) {
            throw new Error('Не получилось получить список городов от Boxberry');
        }
        const cities = response.data;
        for (const city of cities) {
            await prisma.city.upsert({
                where: { boxberryId: city.Code },
                update: {},
                create: {
                    name: city.Name,
                    boxberryId: city.Code,
                    prefix: city.Prefix,
                    region: city.Region,
                },
            });
        }

        return new SuccessResponse({ data: null });
    },
});
