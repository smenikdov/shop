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

// export const yookassaGetReceiptsListHandler = new Handler({
//     name: 'Получение списка чеков в ЮKassa',
//     errors: { default: 'Ошибка при получении списка чеков в ЮKassa' },

//     async request(payload: {}) {
//         const response = await yookassa.get('/receipt', {});
//         const data = response.data;
//         return new SuccessResponse({ data: data });
//     },
// });
