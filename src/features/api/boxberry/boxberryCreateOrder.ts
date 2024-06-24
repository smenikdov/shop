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
import { boxberry } from './boxberry';
import { SHOP_INFO, DELIVERY_INFO } from '@/constants';

import type { OrderFullInfo } from '@/features/order/typings';

interface LegalEntity {
    name: string;
    address?: string;
    inn: string;
    kpp?: string;
    r_s?: string;
    bank?: string;
    kor_s?: string;
    bik?: string;
};

interface IndividualUser {
    fio: string;
    phone: string;
    phone2?: string;
    email?: string;
};

interface BoxberryCreateOrderRequest {
    partner_token?: string;
    updateByTrack?: string;
    order_id: number;
    PalletNumber?: string;
    barcode?: string;
    price?: number;
    payment_sum?: number;
    delivery_sum?: number;
    vid: 1 | 2;
    supplier_track?: string;
    shop: {
        name?: string;
        name1: string;
    },
    customer: IndividualUser | LegalEntity,

    kurdost?: {
        index?: string;
        citi: string;
        addressp: string;
    };

    // export?: {}; НЕ ИСПОЛЬЗУЕТСЯ 

    items: Array<{
        id?: number;
        name: string;
        UnitName?: string;
        nds?: string;
        price: number;
        quantity: number;
        marking_crpt?: string;
        supplier_name?: string;
        supplier_inn?: string;
        supplier_phone?: string;
    }>;

    notice?: string;

    weights: {
        weight: number;
        barcode?: string;
        x?: number;
        y?: number;
        z?: number;
        [key: string]: string | number | undefined;
    };

    issue?: 0 | 1 | 2;
    fitting?: 0 | 1;
    sender_name?: string;
    AgregatorPointCargoCode?: string;
};

interface BoxberryCreateOrderResponse {
    track: string;
    notification?: string;
    label?: string;
};

export const boxberryCreateOrderHandler = new Handler({
    name: 'Создание заказа на доставку Boxberry',
    defaultError: 'Ошибка при создании заказа на доставку Boxberry',

    async request(payload: { order: OrderFullInfo }) {
        const { order } = payload;

        const request: BoxberryCreateOrderRequest = {
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
        };

        const response = await boxberry.get<BoxberryCreateOrderResponse>('/', {
            params: {
                method: 'ParselCreate',
                sdata: request,
            },
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
