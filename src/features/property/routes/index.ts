'use server';
import 'server-only';

import { createRoute } from '@/utils/actions/routes';
import type { RouteData } from '@/utils/actions/routes';
import type { PropertyGetAllPayload, PropertyUpdatePayload, PropertyCreatePayload } from '@/features/property/typings';

import { propertyGetAllHandler } from '../services/propertyGetAll';
import { propertyGetDetailsHandler } from '../services/propertyGetDetails';
import { propertyCreateHandler } from '../services/propertyCreate';
import { propertyUpdateHandler } from '../services/propertyUpdate';

export const propertyGetAll = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<PropertyGetAllPayload>) {
        return propertyGetAllHandler.execute(payload);
    },
});

export const propertyGetDetails = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<{ propertyId: integer }>) {
        return propertyGetDetailsHandler.execute(payload);
    },
});

export const propertyUpdate = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<PropertyUpdatePayload>) {
        return propertyUpdateHandler.execute(payload);
    },
});

export const propertyCreate = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<PropertyCreatePayload>) {
        return propertyCreateHandler.execute(payload);
    },
});
