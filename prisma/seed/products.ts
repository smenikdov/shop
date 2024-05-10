import { Prisma, PrismaClient } from '@prisma/client';

const seed = async (prisma: PrismaClient) => {
    console.log('Start product seeding');

    const products: Prisma.ProductCreateInput[] = [
        {
            name: 'Уникальный товар',
            price: 99.99,
            rating: 4.7,
            quantity: 67,
            shortDescription: 'Это уникальный товар, который станет верным спутником в вашей жизни',
            images: [
                'https://dummyimage.com/800x800/f4eee0/ab7c0d&text=1',
                'https://dummyimage.com/800x800/f4eee0/ab7c0d&text=2',
                'https://dummyimage.com/800x800/f4eee0/ab7c0d&text=3',
            ],
            category: {
                create: {
                    name: 'Игрушки',
                    description: 'Ну вы поняли, какие игрушки)',
                },
            },
            offer: {
                create: {
                    name: 'Акция для первых покупателей',
                    description: 'Скидка на всё 10%',
                    discount: 10,
                    active: true,
                },
            },
        },
    ];

    for (const p of products) {
        await prisma.product.create({ data: p });
    }
};

export default seed;
