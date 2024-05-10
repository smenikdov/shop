/*
  Warnings:

  - You are about to drop the column `discountId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `prev_price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `productdiscount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_discountId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "discountId",
DROP COLUMN "prev_price",
ADD COLUMN     "offerId" INTEGER;

-- DropTable
DROP TABLE "productdiscount";

-- CreateTable
CREATE TABLE "productoffers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productoffers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "productoffers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
