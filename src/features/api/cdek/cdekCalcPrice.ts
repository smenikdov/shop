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
import { cdek } from './cdek';

import type { DeliveryType } from '@prisma/client';

import { DELIVERY_INFO } from '@/constants';

import { checkoutGetProductSizes } from '@/features/checkout/routes';


export const cdekCalcPriceHandler = new Handler({
    name: 'Расчёт стоимость доставки Boxberry',
    defaultError: 'Ошибка при расчёте стоимости доставки Boxberry',
    schema: v.object({
        deliveryType: v.string(),
        pointId: v.id(),
    }),

    async request(payload: { deliveryType: DeliveryType; pointId: number }) {
        const getSizesResponse = await checkoutGetProductSizes({});
        if (!getSizesResponse.isSuccess) {
            throw new Error('Ошибка при получении размеров упаковки');
        }
        const boxSizes = getSizesResponse.data;
        const boxberryBoxSizes = [];
        for (let bs of boxSizes) {
            boxberryBoxSizes.push(
                ...new Array(bs.quantity).fill({
                    Width: bs.width,
                    Height: bs.height,
                    Depth: bs.length,
                    Weight: bs.weight,
                })
            );
        }

        const response = await boxberry.get('/', {
            params: {
                method: 'DeliveryCalculation',
                DeliveryType: payload.deliveryType === 'POINT' ? 2 : 1,
                BoxSizes: boxberryBoxSizes,
                Version: '2.2',
                TargetStart: DELIVERY_INFO.BOXBERRY_SENDER_POINT_ID,
                TargetStop: payload.pointId,
            },
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
