'use server';
import 'server-only';

import { createRoute } from '@/utils/actions/routes';
import { RouteData } from '@/utils/actions/routes';

import { orderGetAllHandler } from '../services/orderGetAll';

interface OrderGetAllPayload {
    page: number;
    orderId: number;
}
export const orderGetAll = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<OrderGetAllPayload>) {
        return orderGetAllHandler.execute(payload);
    },
});
