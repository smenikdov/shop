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

export const includePagination = (page: number) => {
    const itemsPerPage = 20;
    return {
        skip: itemsPerPage * (page - 1),
        take: itemsPerPage,
    };
};
