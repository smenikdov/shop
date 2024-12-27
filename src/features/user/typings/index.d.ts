import { number } from '@/utils/validate';
import type { UserRole, UserSex } from '@prisma/client';

interface UserUpdateDataPayload {
    fio: string | null;
    email: string | null;
    birthday: Date | null;
}

interface UserGetAllPayload {
    page: number;
    userId: number;
    email: string;
    phone: string;
}
