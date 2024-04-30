import 'server-only';
import prisma from '@/lib/prisma';

export const productGetSingle = async () => {
    const feed = await prisma.post.findMany({
        where: {
            published: true,
        },
        include: {
            author: {
                select: {
                    name: true,
                },
            },
        },
    });
    return {
        props: { feed },
    };
};