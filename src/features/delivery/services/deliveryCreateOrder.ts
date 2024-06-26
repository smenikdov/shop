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

import { boxberryCreateOrderHandler } from '@/features/api/boxberry/boxberryCreateOrder';
import { dellinCreateOrderHandler } from '@/features/api/dellin/dellinCreateOrder';
import { cdekCreateOrderHandler } from '@/features/api/cdek/cdekCreateOrder';
import { fivepostCreateOrderHandler } from '@/features/api/fivepost/fivepostCreateOrder';

export const deliveryCreateOrderHandler = new Handler({
    name: '',
    defaultError: '',
    schema: v.object({
        userId: v.id(),
        // TODO
    }),

    async request(payload: { id: number }) {
        const userData = await prisma.user.findUnique({});
        return new SuccessResponse({ data: userData });
    },
});
