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

import logger from '@/lib/logger';

import { boxberryGetPointsShortHandler } from '@/features/api/boxberry/boxberryGetPointsShort';
import { boxberryGetPointDetailsHandler } from '@/features/api/boxberry/boxberryGetPointDetails';

export const boxberryUpdateDatabasePointsHandler = new Handler({
    name: 'Обновление точек выдачи из базы Boxberry',
    errors: { default: 'Ошибка при обновлении точек выдачи из базы Boxberry' },

    async request(payload: {}) {
        const response = await boxberryGetPointsShortHandler.execute({});
        if (!response.isSuccess) {
            throw new Error('Не получилось получить список точек выдачи от Boxberry');
        }
        const points = response.data;
        for (const point of points) {
            const existingPoint = await prisma.point.findUnique({
                select: {
                    updatedAt: true,
                },
                where: { innerId: point.Code },
            });

            if (!existingPoint) {
                await prisma.point.create({}); // TODO
            } else {
                const boxberryUpdateDate = new Date(point.UpdateDate);
                if (existingPoint.updatedAt < boxberryUpdateDate) {
                    const pointDetailsResponse = await boxberryGetPointDetailsHandler.execute({ pointBoxberryId: point.Code });
                    if (!pointDetailsResponse.isSuccess) {
                        logger.error(`Не удалось получить детали по точке выдачи №${ point.Code } при обновлении базы данных`);
                        continue;
                    }
                    const pointDetails = pointDetailsResponse.data;
                    await prisma.point.update({
                        data: {}, // TODO
                        where: { innerId: point.Code },
                    }); 
                }
            }
        }

        return new SuccessResponse({ data: null });
    },
});
