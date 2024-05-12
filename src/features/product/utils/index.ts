export const getProductDiscountValue = ({
    price,
    discount,
}: {
    price: number;
    discount: number;
}): number => {
    return Number(((price / 100) * discount).toFixed(2));
};

export const getProductPriceWithDiscount = ({
    price,
    discount,
}: {
    price: number;
    discount: number;
}): number => {
    return Number(((price * (100 - discount)) / 100).toFixed(2));
};
