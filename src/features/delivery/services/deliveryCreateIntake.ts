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

import type { DeliveryCompany } from '@prisma/client';

import { DELIVERY_COMPANY } from '@/constants';

import { boxberryCreateIntakeHandler } from '@/features/api/boxberry/boxberryCreateIntake';
import { dellinCreateIntakeHandler } from '@/features/api/dellin/dellinCreateIntake';
import { cdekCreateIntakeHandler } from '@/features/api/cdek/cdekCreateIntake';

export const deliveryCreateIntakeHandler = new Handler({
    name: 'Вызов курьера',
    errors: { default: 'Ошибка при вызове курьера' },
    schema: v.object({
        deliveryCompany: v.string().in(Object.values(DELIVERY_COMPANY)),
        arriveAt: v.date(),
    }),

    async request(payload: { id: number; deliveryCompany: DeliveryCompany }) {
        let response;

        switch (payload.deliveryCompany) {
            case 'BOXBERRY': {
                response = boxberryCreateIntakeHandler.execute({
                    arriveAt: payload.arriveAt,
                });
                break;
            }
            case 'DELLIN': {
                response = dellinCreateIntakeHandler.execute({
                    arriveAt: payload.arriveAt,
                });
                break;
            }
            case 'CDEK': {
                response = cdekCreateIntakeHandler.execute({
                    arriveAt: payload.arriveAt,
                });
                break;
            }
            default:
                throw new Error('Неизвестный идентификтор курьерской компании');
        }

        if (!response.isSuccess) {
            throw new Error('Ошибка при создании заявки на вызов курьера');
        }

        const intake = await prisma.intake.create({
            data: {
                deliveryCompany: payload.deliveryCompany,
                arriveAt: payload.arriveAt,
            },
        });

        return new SuccessResponse({ data: null });
    },
});
