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

import { boxberryUpdateDatabasePointsHandler } from '@/features/api/boxberry/boxberryUpdateDatabasePoints';
import { boxberryUpdateDatabaseCitiesHandler } from '@/features/api/boxberry/boxberryUpdateDatabaseCities';

export const deliveryUpdateDatabaseHandler = new Handler({
    name: 'Обновление базы данных городов и точек выдачи',
    errors: { default: 'Ошибка при обновление базы данных городов и точек выдачи' },

    async request(payload: {}) {
        await boxberryUpdateDatabaseCitiesHandler.execute({});
        await boxberryUpdateDatabasePointsHandler.execute({});

        return new SuccessResponse({ data: null });
    },
});

