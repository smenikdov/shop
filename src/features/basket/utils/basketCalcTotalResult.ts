import type { ProductItem } from '@/features/product/typings';
import type { TotalResult } from '@/features/basket/typings';
import { getProductDiscountValue } from '@/features/product/utils';

export const basketCalcTotalResult = (products: Array<ProductItem>): TotalResult => {
    const result: TotalResult = {
        quantity: products.length,
        subtotal: 0,
        shipping: 0,
        total: 0,
        discount: 0,
    };

    for (let product of products) {
        result.subtotal += product.price;

        if (product.offer) {
            result.discount += getProductDiscountValue({
                price: product.price,
                discount: product.offer.discount,
            });
        }
    }

    result.shipping = 300;
    result.total += result.subtotal + result.shipping - result.discount;

    return result;
};
