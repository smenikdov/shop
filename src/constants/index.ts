import { CreateConstants } from './constants.utils';
import {
    BarcodeType,
    DeliveryCompany,
    DeliveryType,
    OrderStatus,
    PaymentStatus,
    PaymentType,
    ProductStatus,
    ProductType,
    PropertyType,
    UserRole,
    UserSex,
} from '@prisma/client';

export const SHOP_INFO = {
    NAME: '',
    INN: '',
    OGRN: '',
    PHONE: '',
    EMAIL: '',
};

export const DELIVERY_INFO = {
    BOXBERRY_SENDER_POINT_ID: 1,
    CDEK_SENDER_POINT_ID: 1,
    DELLIN_SENDER_POINT_ID: 1,
};

export const [ORDER_STATUS, ORDER_STATUS_LABEL] = CreateConstants<OrderStatus>({
    PAYMENT: 'Оплата',
    PREPARATION: 'В сборке',
    DELIVERY: 'В пути',
    WAITING: 'Доставлен',
    RECEIVED: 'Получен',
});

export const [PAYMENT_STATUS, PAYMENT_STATUS_LABEL] = CreateConstants<PaymentStatus>({
    PENDING: 'Ожидает',
    SUCCEEDED: 'Успешно',
    CANCELED: 'Отменено',
});

export const [USER_ROLE, USER_ROLE_LABEL] = CreateConstants<UserRole>({
    USER: 'USER',
    ADMIN: 'ADMIN',
    GUEST: 'GUEST',
});

export const [USER_SEX, USER_SEX_LABEL] = CreateConstants<UserSex>({
    MALE: 'Мужской пол',
    FEMALE: 'Женский пол',
});

export const [DELIVERY_COMPANY, DELIVERY_COMPANY_LABEL] = CreateConstants<DeliveryCompany>({
    BOXBERRY: 'Boxberry',
    CDEK: 'СДЭК',
    DELLIN: 'Деловые линии',
    FIVEPOST: '5POST',
});

export const [DELIVERY_TYPE, DELIVERY_TYPE_LABEL] = CreateConstants<DeliveryType>({
    COURIER: 'Курьер',
    POINT: 'Пункт выдачи',
});

export const [PAYMENT_TYPE, PAYMENT_TYPE_LABEL] = CreateConstants<PaymentType>({
    BANK_CARD: 'Банковская карта',
    SBP: 'СБП',
});

export const [BARCODE_TYPE, BARCODE_TYPE_LABEL] = CreateConstants<BarcodeType>({
    EAN_8: 'EAN_8',
    EAN_13: 'EAN_13',
    ITF_14: 'ITF_14',
    GS_10: 'GS_10',
    GS_1M: 'GS_1M',
    SHORT: 'SHORT',
    FUR: 'FUR',
    EGIAS_20: 'EGIAS_20',
    EGIAS_30: 'EGIAS_30',
    UNKNOWN: 'UNKNOWN',
});

export const [PRODUCT_TYPE, PRODUCT_TYPE_LABEL] = CreateConstants<ProductType>({
    PRODUCT: 'Товар',
    SERVICE: 'Услуга',
    JOB: 'Работа',
    ANOTHER: 'Другое',
});

export const [PRODUCT_STATUS, PRODUCT_STATUS_LABEL] = CreateConstants<ProductStatus>({
    DRAFT: 'Черновик',
    PUBLISH: 'Опубликован',
    DELETED: 'Удален',
});

export const BREAKPOINTS = {
    XS: 480,
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
};

export const [PROPERTY_TYPE, PROPERTY_TYPE_LABEL] = CreateConstants<PropertyType>({
    STRING: 'Строка',
    NUMBER: 'Число',
    SELECT: 'Список',
    FLAG: 'Флаг',
});
