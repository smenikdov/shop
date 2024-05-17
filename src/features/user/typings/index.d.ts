import { number } from '@/utils/validate';
import type { UserRole, UserSex } from '@prisma/client';

interface UserData {
    email: string;
    phone: string;
    lastName: string;
    firstName: string;
    patronymic: string;
    sex: UserSex;
    birthday: Date;
}
