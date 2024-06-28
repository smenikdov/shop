/*
  Warnings:

  - You are about to drop the column `total` on the `orders` table. All the data in the column will be lost.
  - The `status` column on the `payments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `productcategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `useraddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationtokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[customer_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[delivery_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[yookassa_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentType` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `yookassa_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barcode` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barcodeType` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measure` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PAYMENT', 'PREPARATION', 'DELIVERY', 'WAITING', 'RECEIVED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'CANCELED');

-- CreateEnum
CREATE TYPE "DeliveryCompany" AS ENUM ('BOXBERRY', 'CDEK', 'DELLIN', 'FIVEPOST');

-- CreateEnum
CREATE TYPE "DeliveryType" AS ENUM ('COURIER', 'POINT');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('BANK_CARD', 'SBP');

-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('PIECE', 'GRAM', 'KILOGRAM', 'TON', 'CENTIMETER', 'DECIMETER', 'METER', 'SQUARE_CENTIMETER', 'SQUARE_DECIMETER', 'SQUARE_METER', 'MILLILITER', 'LITER', 'CUBIC_METER', 'KILOWATT_HOUR', 'GIGACALORIE', 'DAY', 'HOUR', 'MINUTE', 'SECOND', 'KILOBYTE', 'MEGABYTE', 'GIGABYTE', 'TERABYTE', 'ANOTHER');

-- CreateEnum
CREATE TYPE "BarcodeType" AS ENUM ('EAN_8', 'EAN_13', 'ITF_14', 'GS_10', 'GS_1M', 'SHORT', 'FUR', 'EGIAS_20', 'EGIAS_30', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "PointType" AS ENUM ('PVZ', 'POSTAMAT', 'TOBACCO');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('PRODUCT', 'SERVICE', 'JOB', 'ANOTHER');

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropIndex
DROP INDEX "payments_order_id_key";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "total",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_id" INTEGER NOT NULL,
ADD COLUMN     "delivery_id" INTEGER NOT NULL,
ADD COLUMN     "notice" TEXT,
ADD COLUMN     "paymentType" "PaymentType" NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "yookassa_id" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "barcode" TEXT NOT NULL,
ADD COLUMN     "barcodeType" "BarcodeType" NOT NULL,
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "length" INTEGER NOT NULL,
ADD COLUMN     "measure" "MeasureType" NOT NULL,
ADD COLUMN     "packageQuantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "type" "ProductType" NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "city_id" INTEGER;

-- DropTable
DROP TABLE "productcategory";

-- DropTable
DROP TABLE "useraddress";

-- DropTable
DROP TABLE "verificationtokens";

-- DropEnum
DROP TYPE "OrderStatuses";

-- DropEnum
DROP TYPE "PaymentStatuses";

-- CreateTable
CREATE TABLE "productcategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productcategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordercustomers" (
    "id" SERIAL NOT NULL,
    "fio" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ordercustomers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderdeliveries" (
    "id" SERIAL NOT NULL,
    "city_id" INTEGER NOT NULL,
    "company" "DeliveryCompany" NOT NULL,
    "type" "DeliveryType" NOT NULL,
    "point_id" INTEGER,
    "address" TEXT,
    "timeFrom" TEXT,
    "timeTo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orderdeliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkoutitems" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkoutitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "boxberry_id" INTEGER,
    "cdek_id" INTEGER,
    "dellin_id" INTEGER,
    "fivepost_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "points" (
    "id" SERIAL NOT NULL,
    "deliveryCompany" "DeliveryCompany" NOT NULL,
    "type" "PointType" NOT NULL,
    "maxWeight" DOUBLE PRECISION NOT NULL,
    "maxHeight" DOUBLE PRECISION NOT NULL,
    "maxWidth" DOUBLE PRECISION NOT NULL,
    "maxLength" DOUBLE PRECISION NOT NULL,
    "maxVolume" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "intakers" (
    "id" SERIAL NOT NULL,
    "arriveAt" TIMESTAMP(3) NOT NULL,
    "deliveryCompany" "DeliveryCompany" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "intakers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "checkoutitems_product_id_user_id_key" ON "checkoutitems"("product_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_customer_id_key" ON "orders"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_delivery_id_key" ON "orders"("delivery_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_yookassa_id_key" ON "payments"("yookassa_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "productcategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "ordercustomers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "orderdeliveries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderdeliveries" ADD CONSTRAINT "orderdeliveries_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderdeliveries" ADD CONSTRAINT "orderdeliveries_point_id_fkey" FOREIGN KEY ("point_id") REFERENCES "points"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkoutitems" ADD CONSTRAINT "checkoutitems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkoutitems" ADD CONSTRAINT "checkoutitems_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
