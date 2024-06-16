'use server';
import 'server-only';
import { createRoute } from '@/utils/actions/routes';

import { dadataSuggestSettlementsHandler } from './dadataSuggestSettlements';
import { dadataSuggestEmailsHandler } from './dadataSuggestEmails';
import { dadataSuggestFioHandler } from './dadataSuggestFio';
import { dadataParseFioHandler } from './dadataParseFio';

export const dadataSuggestSettlements = createRoute({
    async handler({ payload }) {
        return dadataSuggestSettlementsHandler.execute(payload);
    },
});

export const dadataSuggestEmails = createRoute({
    async handler({ payload }) {
        return dadataSuggestEmailsHandler.execute(payload);
    },
});

export const dadataSuggestFio = createRoute({
    async handler({ payload }) {
        return dadataSuggestFioHandler.execute(payload);
    },
});

export const dadataParseFio = createRoute({
    async handler({ payload }) {
        return dadataParseFioHandler.execute(payload);
    },
});
