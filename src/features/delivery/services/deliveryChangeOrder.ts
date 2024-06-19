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

import { boxberryChangeOrderHandler } from '@/features/api/boxberry/boxberryChangeOrder';
import { dellinChangeOrderHandler } from '@/features/api/dellin/dellinChangeOrder';
import { cdekChangeOrderHandler } from '@/features/api/cdek/cdekChangeOrder';

export const deliveryChangeOrderHandler = new Handler({
    name: '',
    defaultError: '',
    schema: v.object({
        orderId: v.id(),
        // TODO
    }),

    async request(payload: { id: number }) {
        const userData = await prisma.user.findUnique({});
        return new SuccessResponse({ data: userData });
    },
});
