import type { Product, BaseProduct } from '@/features/product/typings';

interface PrismaProductItem {
    id: number;
    name: string;
    price: number;
    offer: {
        id: number;
        discount: number;
    } | null;
    basketItems?: Array<{
        quantity: number;
    }>;
    images: Array<{
        id: number;
        name: string;
        path: string;
    }>;
    rating: number;
    [key: string]: any;
}

const baseProductScheme = {
    id: true,
    name: true,
    price: true,
    offer: {
        select: {
            id: true,
            discount: true,
        },
        where: {
            isActive: true,
        },
    },
    images: {
        select: {
            id: true,
            name: true,
            path: true,
        },
    },
    rating: true,
};

export const productScheme = (userId?: number) => {
    if (userId) {
        return {
            ...baseProductScheme,
            basketItems: {
                where: {
                    userId: userId,
                },
                select: {
                    quantity: true,
                },
            },
        };
    } else {
        return baseProductScheme;
    }
};

export const includePagination = (page: number) => {
    const itemsPerPage = 20;
    return {
        skip: itemsPerPage * (page - 1),
        take: itemsPerPage,
    };
};

export const formatProductScheme = <NotFormatedProduct extends PrismaProductItem>(
    product: NotFormatedProduct
) => {
    const formatProduct = {
        ...product,
        basketQuantity: product.basketItems?.[0]?.quantity || 0,
    };

    delete formatProduct.basketItems;

    return formatProduct;
};
