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

export const deliveryGetInitialData = new Handler({
    name: '',
    errors: { default: '' },
    schema: v.object({
        userId: v.id(),
    }),

    async request(payload: { userId: number }) {
        const userData = await prisma.user.findUnique({});
        return new SuccessResponse({ data: userData });
    },
});
