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

// interface YookassaCreateReceiptRequest {
//     type: 'payment' | 'refund',
//     payment_id?: string;
//     refund_id?: string;
//     customer: {
//         full_name?: string;
//         inn?: string;
//         email?: string;
//         phone?: string;
//     };
//     items: Array<{}>; // TODO
//     send: boolean;
//     tax_system_code?: number;
//     additional_user_props?: {}; // TODO
//     receipt_industry_details?: Array<{}>; // TODO
//     receipt_operational_details?: {}; // TODO
//     settlements: Array<{}>; // TODO
//     on_behalf_of?: string;
// };

// interface YookassaCreateReceiptResponse {};

// export const yookassaCreateReceiptHandler = new Handler({
//     name: 'Создание чека в ЮKassa',
//     defaultError: 'Ошибка при создании чека в ЮKassa',

//     async request(payload: {}) {
//         const response = await yookassa.post('/receipts', {});
//         const data = response.data;
//         return new SuccessResponse({ data: data });
//     },
// });
