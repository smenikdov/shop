import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { cdek } from './cdek';
import { DELIVERY_INFO } from '@/constants';

import type { OrderFullInfo } from '@/features/order/typings';

export const cdekGetPointsHandler = new Handler({
    name: 'Создание заказа на доставку Boxberry',
    defaultError: 'Ошибка при создании заказа на доставку Boxberry',

    async request(payload: { order: OrderFullInfo }) {
        const { order } = payload;

        const response = await cdek.get('/', {
            params: {
                method: 'ParselCreate',
                sdata: {
                    order_id: order.id,
                    vid: order.deliveryType === 'POINT' ? 1 : 2,
                    shop: {
                        name: null, // TODO
                        name1: DELIVERY_INFO.BOXBERRY_SENDER_POINT_ID,
                    },
                    kurdost: {}, // TODO
                    customer: {
                        fio: `${order.user.lastName} ${order.user.firstName} ${order.user.patronymic}`, // TODO
                        phone: order.user.phone,
                        email: order.user.email,
                    },
                    items: order.orderItems.map((item) => ({
                        id: item.id,
                        name: item.name,
                        UnitName: 'шт', // TODO
                        price: item.price, // TODO
                        quantity: item.quantity,
                    })),
                    notice: order.notice,
                    weights: {},
                    issue: 0, // TODO
                    fitting: 0, // TODO
                    sender_name: SHOP_INFO.NAME,
                },
            },
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
