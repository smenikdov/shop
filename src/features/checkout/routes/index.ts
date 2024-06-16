'use server';
import 'server-only';

import { createRoute } from '@/utils/actions/routes';
import { RouteData } from '@/utils/actions/routes';
import { AccessDeniedResponse } from '@/utils/actions/responses';

import { checkoutGetProductSizesHandler } from '../services/checkoutGetProductSizes';

export const checkoutGetProductSizes = createRoute({
    async handler({ accessTokenData }: RouteData) {
        if (!accessTokenData?.userId) {
            return new AccessDeniedResponse();
        }
        return checkoutGetProductSizesHandler.execute({ userId: accessTokenData.userId });
    },
});
