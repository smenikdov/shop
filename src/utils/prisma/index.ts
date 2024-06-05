export const baseProductScheme = (userId?: number) => ({
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
    // basketItems: {
    //     where: {
    //         userId: userId || -1,
    //     },
    //     select: {
    //         quantity: true,
    //     },
    // },
    images: true,
    rating: true,
});

export const includePagination = (page: number) => {
    const itemsPerPage = 20;
    return {
        skip: itemsPerPage * (page - 1),
        take: itemsPerPage,
    };
};
