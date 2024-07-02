/*
  Warnings:

  - You are about to drop the column `images` on the `products` table. All the data in the column will be lost.
  - Added the required column `status` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'PUBLISH', 'DELETED');

-- AlterTable
ALTER TABLE "products" DROP COLUMN "images",
ADD COLUMN     "keywords" TEXT,
ADD COLUMN     "status" "ProductStatus" NOT NULL,
ALTER COLUMN "measure" SET DEFAULT 'PIECE';

-- CreateTable
CREATE TABLE "properties" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoryproperties" (
    "id" SERIAL NOT NULL,
    "categorId" INTEGER NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categoryproperties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productimages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productimages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producttags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "producttags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categoryproperties" ADD CONSTRAINT "categoryproperties_categorId_fkey" FOREIGN KEY ("categorId") REFERENCES "productcategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoryproperties" ADD CONSTRAINT "categoryproperties_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productimages" ADD CONSTRAINT "productimages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producttags" ADD CONSTRAINT "producttags_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
