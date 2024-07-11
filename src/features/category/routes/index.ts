'use server';
import 'server-only';

import { createRoute } from '@/utils/actions/routes';
import { RouteData } from '@/utils/actions/routes';

import { categoryGetAllHandler } from '../services/categoryGetAll';

interface CategoryGetAllPayload {
    page: number;
    categoryId: number;
    name: string;
}

export const categoryGetAll = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<CategoryGetAllPayload>) {
        return categoryGetAllHandler.execute(payload);
    },
});
