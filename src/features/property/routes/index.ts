'use server';
import 'server-only';

import { createRoute } from '@/utils/actions/routes';
import { RouteData } from '@/utils/actions/routes';

import { propertyGetAllHandler } from '../services/propertyGetAll';

interface PropertyGetAllPayload {
    page: number;
    propertyId: number;
    name: string;
}

export const propertyGetAll = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<PropertyGetAllPayload>) {
        return propertyGetAllHandler.execute(payload);
    },
});
