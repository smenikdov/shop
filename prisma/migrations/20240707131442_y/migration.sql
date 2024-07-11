/*
  Warnings:

  - You are about to drop the column `measure` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `productcategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isRequired` to the `categoryproperties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isUseAsFilter` to the `categoryproperties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measureId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meta` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('STRING', 'NUMBER', 'SELECT', 'FLAG');

-- DropForeignKey
ALTER TABLE "categoryproperties" DROP CONSTRAINT "categoryproperties_categorId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- AlterTable
ALTER TABLE "categoryproperties" ADD COLUMN     "isRequired" BOOLEAN NOT NULL,
ADD COLUMN     "isUseAsFilter" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "measure",
ADD COLUMN     "measureId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "measureId" INTEGER,
ADD COLUMN     "meta" JSONB NOT NULL,
ADD COLUMN     "type" "PropertyType" NOT NULL;

-- DropTable
DROP TABLE "productcategories";

-- DropEnum
DROP TYPE "MeasureType";

-- CreateTable
CREATE TABLE "propertyoptions" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "propertyoptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measure" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measure_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_measureId_fkey" FOREIGN KEY ("measureId") REFERENCES "measure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyoptions" ADD CONSTRAINT "propertyoptions_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoryproperties" ADD CONSTRAINT "categoryproperties_categorId_fkey" FOREIGN KEY ("categorId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_measureId_fkey" FOREIGN KEY ("measureId") REFERENCES "measure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
