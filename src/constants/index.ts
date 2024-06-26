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

export const ORDER_STATUS = {
    PAYMENT: 'PAYMENT',
    PREPARATION: 'PREPARATION',
    DELIVERY: 'DELIVERY',
    WAITING: 'WAITING',
    RECEIVED: 'RECEIVED',
};

export const PAYMENT_STATUS = {
    PENDING: 'PENDING',
    SUCCEEDED: 'SUCCEEDED',
    CANCELED: 'CANCELED',
};

export const USER_ROLE = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    GUEST: 'GUEST',
};

export const USER_SEX = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
};

export const DELIVERY_COMPANY = {
    BOXBERRY: 'BOXBERRY',
    CDEK: 'CDEK',
    DELLIN: 'DELLIN',
    FIVEPOST: 'FIVEPOST',
};

export const DELIVERY_TYPE = {
    COURIER: 'COURIER',
    POINT: 'POINT',
};

export const PAYMENT_TYPE = {
    BANK_CARD: 'BANK_CARD',
    SBP: 'SBP',
};

export const MEASURE_TYPE = {
    PIECE: 'PIECE',
    GRAM: 'GRAM',
    KILOGRAM: 'KILOGRAM',
    TON: 'TON',
    CENTIMETER: 'CENTIMETER',
    DECIMETER: 'DECIMETER',
    METER: 'METER',
    SQUARE_CENTIMETER: 'SQUARE_CENTIMETER',
    SQUARE_DECIMETER: 'SQUARE_DECIMETER',
    SQUARE_METER: 'SQUARE_METER',
    MILLILITER: 'MILLILITER',
    LITER: 'LITER',
    CUBIC_METER: 'CUBIC_METER',
    KILOWATT_HOUR: 'KILOWATT_HOUR',
    GIGACALORIE: 'GIGACALORIE',
    DAY: 'DAY',
    HOUR: 'HOUR',
    MINUTE: 'MINUTE',
    SECOND: 'SECOND',
    KILOBYTE: 'KILOBYTE',
    MEGABYTE: 'MEGABYTE',
    GIGABYTE: 'GIGABYTE',
    TERABYTE: 'TERABYTE',
    ANOTHER: 'ANOTHER',
};

export const BARCODE_TYPE = {
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
};

export const PRODUCT_TYPE = {
    PRODUCT: 'PRODUCT',
    SERVICE: 'SERVICE',
    JOB: 'JOB',
    ANOTHER: 'ANOTHER',
};

export const PRODUCT_STATUS = {
    DRAFT: 'DRAFT',
    PUBLISH: 'PUBLISH',
    DELETED: 'DELETED',
};

export const BREAKPOINTS = {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
};
