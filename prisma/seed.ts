import { PrismaClient, Prisma } from '@prisma/client';
import usersSeed from './seed/users';
import productsSeed from './seed/products';

const prisma = new PrismaClient();

async function main() {
    await usersSeed(prisma);
    await productsSeed(prisma);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
