/*
  Warnings:

  - You are about to drop the column `expires` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[refresh_token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessExpiresAt` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshExpiresAt` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatuses" AS ENUM ('PREPARATION', 'DELIVERY', 'WAITING', 'RECEIVED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserSex" AS ENUM ('MALE', 'FEMALE');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "expires",
ADD COLUMN     "accessExpiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "refreshExpiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "refresh_token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email_verified",
DROP COLUMN "image",
ADD COLUMN     "birthday" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "sex" "UserSex";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "accounts";

-- CreateTable
CREATE TABLE "useraddress" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "useraddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productcategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "prev_price" DOUBLE PRECISION,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL,
    "short_description" TEXT NOT NULL,
    "long_description" TEXT,
    "images" TEXT[],
    "category_id" INTEGER NOT NULL,
    "discountId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productdiscount" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productdiscount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "status" "OrderStatuses" NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderitems" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "product_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orderitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "baskets" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "baskets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "baskets_user_id_key" ON "baskets"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_order_id_key" ON "payments"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_refresh_token_key" ON "sessions"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "productcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "productdiscount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "baskets" ADD CONSTRAINT "baskets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
