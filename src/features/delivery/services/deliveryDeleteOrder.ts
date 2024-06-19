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

import { boxberryDeleteOrderHandler } from '@/features/api/boxberry/boxberryDeleteOrder';
import { dellinDeleteOrderHandler } from '@/features/api/dellin/dellinDeleteOrder';
import { cdekDeleteOrderHandler } from '@/features/api/cdek/cdekDeleteOrder';

export const deliveryDeleteOrderHandler = new Handler({
    name: '',
    defaultError: '',
    schema: v.object({
        orderId: v.id(),
    }),

    async request(payload: { id: number }) {
        const userData = await prisma.user.findUnique({});
        return new SuccessResponse({ data: userData });
    },
});
