// import 'server-only';
// import prisma from '@/lib/prisma';
// import { Handler } from '@/utils/actions/routes';
// import {
//     ServerErrorResponse,
//     RequestErrorResponse,
//     Response,
//     SuccessResponse,
// } from '@/utils/actions/responses';
// import * as v from '@/utils/validate';
// import { yookassa } from './../yookassa';

// export const yookassaGetReceiptDetailsHandler = new Handler({
//     name: 'Получение информации о чеке в ЮKassa',
//     errors: { default: 'Ошибка при получении информации о чеке в ЮKassa' },
//     schema: v.object({
//         receiptId: v.id(),
//     }),

//     async request(payload: { receiptId: number }) {
//         const receiptInfo = {}; // TODO

//         const response = await yookassa.get(`/receipts/${ receiptInfo.yookassaId }`, {});
//         const data = response.data;
//         return new SuccessResponse({ data: data });
//     },
// });
