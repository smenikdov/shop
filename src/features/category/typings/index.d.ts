import { OrderStatus, DeliveryType, DeliveryCompany, MeasureType } from '@prisma/client';
import type { BaseProduct } from '@/features/product/typings';

interface OrderItem extends Product {
    id: number;
    price: string;
    quantity: true;
    measure: MeasureType;
    name: string;
}
export interface OrderFullInfo {
    id: number;
    status: OrderStatus;
    orderItems: Array<OrderItem>;
    notice: string | null;
    amount: number;
    userId: number;
    delivery: {
        type: DeliveryType;
        company: DeliveryCompany;
        pointId: number | null;
        address: string | null;
        cityId:  number;
    },
    customer: {
        fio: string;
        phone: string;
        email: string | null;
    };
}
