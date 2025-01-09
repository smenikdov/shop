'use server';
import 'server-only';

import { createRoute } from '@/utils/actions/routes';

import { categoryGetAllHandler } from '../services/categoryGetAll';
import { categoryGetDetailsHandler } from '../services/categoryGetDetails';
import { categoryUpdateHandler } from '../services/categoryUpdate';
import { categoryCreateHandler } from '../services/categoryCreate';
import { categoryPropertyGetAllHandler } from '../services/categoryPropertyGetAll';
import { categoryPropertyCreateHandler } from '../services/categoryPropertyCreate';
import { categoryPropertyUpdateHandler } from '../services/categoryPropertyUpdate';
import { categoryPropertyDeleteHandler } from '../services/categoryPropertyDelete';

import type {
    CategoryCreatePayload,
    CategoryUpdatePayload,
    CategoryPropertyCreatePayload,
    CategoryPropertyUpdatePayload,
    CategoryPropertyDeletePayload,
    CategoryPropertyGetAllPayload,
} from '@/features/category/typings';
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

export const categoryPropertyCreate = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<CategoryPropertyCreatePayload>) {
        return categoryPropertyCreateHandler.execute(payload);
    },
});

export const categoryPropertyUpdate = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<CategoryPropertyUpdatePayload>) {
        return categoryPropertyUpdateHandler.execute(payload);
    },
});

export const categoryPropertyDelete = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<CategoryPropertyDeletePayload>) {
        return categoryPropertyDeleteHandler.execute(payload);
    },
});

export const categoryPropertyGetAll = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<CategoryPropertyGetAllPayload>) {
        return categoryPropertyGetAllHandler.execute(payload);
    },
});
