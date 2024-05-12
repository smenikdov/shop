export const baseProductScheme = {
    id: true,
    name: true,
    price: true,
    shortDescription: true,
    longDescription: true,
    offer: {
        select: {
            id: true,
            discount: true,
        },
        where: {
            active: true,
        },
    },
    images: true,
    rating: true,
};

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
