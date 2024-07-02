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

import { boxberryGetOrderDetailsHandler } from '@/features/api/boxberry/boxberryGetOrderDetails';
import { dellinGetOrderDetailsHandler } from '@/features/api/dellin/dellinGetOrderDetails';
import { cdekGetOrderDetailsHandler } from '@/features/api/cdek/cdekGetOrderDetails';

export const deliveryGetOrderDetailsHandler = new Handler({
    name: '',
    errors: { default: '' },
    schema: v.object({
        orderId: v.id(),
    }),

    async request(payload: { id: number }) {
        const userData = await prisma.user.findUnique({});
        return new SuccessResponse({ data: userData });
    },
});
