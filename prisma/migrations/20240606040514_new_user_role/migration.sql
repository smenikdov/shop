-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'GUEST';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;
