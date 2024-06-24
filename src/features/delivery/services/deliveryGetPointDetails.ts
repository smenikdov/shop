import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    NotFoundResponse,
    SuccessResponse,
} from '@/utils/actions/responses';
import * as v from '@/utils/validate';

import { DELIVERY_COMPANY } from '@/constants';

import type { DeliveryCompany } from '@prisma/client';

import { boxberryGetPointDetailsHandler } from '@/features/api/boxberry/boxberryGetPointDetails';
import { fivepostGetPointDetailsHandler } from '@/features/api/fivepost/fivepostGetPointDetails';
import { dellinGetPointDetailsHandler } from '@/features/api/dellin/dellinGetPointDetails';
import { cdekGetPointDetailsHandler } from '@/features/api/cdek/cdekGetPointDetails';

export const deliveryGetPointDetailsHandler = new Handler({
    name: '',
    defaultError: '',
    schema: v.object({
        deliveryCompany: v.string().in(Object.values(DELIVERY_COMPANY)),
        outerPointId: v.id(),
    }),

    async request(payload: { deliveryCompany: DeliveryCompany; outerPointId: number }) {
        switch (payload.deliveryCompany) {
            case 'BOXBERRY': {
                const pointInfo = boxberryGetPointDetailsHandler.execute({
                    pointBoxberryId: payload.outerPointId,
                });
                return new SuccessResponse({ data: pointInfo });
            }
            case 'DELLIN': {
                const pointInfo = dellinGetPointDetailsHandler.execute({
                    pointDellinId: payload.outerPointId,
                });
                return new SuccessResponse({ data: pointInfo });
            }
            case 'CDEK': {
                const pointInfo = cdekGetPointDetailsHandler.execute({
                    pointCdekId: payload.outerPointId,
                });
                return new SuccessResponse({ data: pointInfo });
            }
            case 'FIVEPOST': {
                const pointInfo = fivepostGetPointDetailsHandler.execute({
                    pointFivepostId: payload.outerPointId,
                });
                return new SuccessResponse({ data: pointInfo });
            }
            default:
                throw new Error('Неизвестный идентификтор курьерской компании');
        }
    },
});
