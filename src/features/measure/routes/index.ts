'use server';
import 'server-only';

import { createRoute } from '@/utils/actions/routes';
import { RouteData } from '@/utils/actions/routes';

import { measureGetAllHandler } from '../services/measureGetAll';
import { measureCreateHandler } from '../services/measureCreate';
import { measureGetDetailsHandler } from '../services/measureGetDetails';

interface MeasureGetAllPayload {
    page: number;
    measureId: number;
    name: string;
}

export const measureGetAll = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<MeasureGetAllPayload>) {
        return measureGetAllHandler.execute(payload);
    },
});

interface MeasureCreatePayload {
    name: string;
    shortName: string;
    description: string;
}

export const measureCreate = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<MeasureCreatePayload>) {
        return measureCreateHandler.execute(payload);
    },
});

export const measureGetDetails = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<{ measureId: integer }>) {
        return measureGetDetailsHandler.execute(payload);
    },
});
