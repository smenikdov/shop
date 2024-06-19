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

import type { DeliveryType } from '@prisma/client';

import { boxberryCalcPriceHandler } from '@/features/api/boxberry/boxberryCalcPrice';
import { dellinCalcPriceHandler } from '@/features/api/dellin/dellinCalcPrice';
import { cdekCalcPriceHandler } from '@/features/api/cdek/cdekCalcPrice';

export const deliveryCalcPriceHandler = new Handler({
    name: '',
    defaultError: '',
    schema: v.object({
        deliveryType: v.deliveryType(),
        // TODO
    }),

    async request(payload: { deliveryType: DeliveryType }) {
        const userData = await prisma.user.findUnique({});
        return new SuccessResponse({ data: userData });
    },
});
