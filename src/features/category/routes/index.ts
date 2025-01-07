'use server';
import 'server-only';

import { createRoute } from '@/utils/actions/routes';

import { categoryGetAllHandler } from '../services/categoryGetAll';
import { categoryGetDetailsHandler } from '../services/categoryGetDetails';
import { categoryUpdateHandler } from '../services/categoryUpdate';
import { categoryCreateHandler } from '../services/categoryCreate';

import type { CategoryCreatePayload, CategoryUpdatePayload } from '@/features/category/typings';
import type { RouteData } from '@/utils/actions/routes';

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

export const categoryGetDetails = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<{ categoryId: integer }>) {
        return categoryGetDetailsHandler.execute(payload);
    },
});

export const categoryUpdate = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<CategoryUpdatePayload>) {
        return categoryUpdateHandler.execute(payload);
    },
});

export const categoryCreate = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<CategoryCreatePayload>) {
        return categoryCreateHandler.execute(payload);
    },
});
