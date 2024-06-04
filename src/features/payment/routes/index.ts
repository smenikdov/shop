'use server';
import 'server-only';

import { createRoute } from '@/utils/actions/routes';
import { RouteData } from '@/utils/actions/routes';

import { paymentGetAllHandler } from '../services/paymentGetAll';

interface PaymentGetAllPayload {
    page: number;
    paymentId: number;
}
export const paymentGetAll = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<PaymentGetAllPayload>) {
        return paymentGetAllHandler.execute(payload);
    },
});
