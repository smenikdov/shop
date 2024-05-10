import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const seed = async (prisma: PrismaClient) => {
    console.log('Start user seeding');
    const hashedPassword = await bcrypt.hash('1234qwer', 10);

    const users: Prisma.UserCreateInput[] = [
        {
            role: 'ADMIN',
            lastName: 'Смердов',
            firstName: 'Никита',
            patronymic: 'Павлович',
            email: 'sme.nik.dov@gmail.com',
            phone: '79090023791',
            sex: 'MALE',
            birthday: new Date('2000-11-02'),
            password: hashedPassword,
        },
    ];

    for (const u of users) {
        await prisma.user.create({ data: u });
    }
};

export default seed;
