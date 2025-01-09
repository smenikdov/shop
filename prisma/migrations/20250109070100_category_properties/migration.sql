/*
  Warnings:

  - You are about to drop the column `categorId` on the `categoryproperties` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryId,propertyId]` on the table `categoryproperties` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `categoryproperties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categoryproperties" DROP CONSTRAINT "categoryproperties_categorId_fkey";

-- AlterTable
ALTER TABLE "categoryproperties" DROP COLUMN "categorId",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "qc" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "categoryproperties_categoryId_propertyId_key" ON "categoryproperties"("categoryId", "propertyId");

-- AddForeignKey
ALTER TABLE "categoryproperties" ADD CONSTRAINT "categoryproperties_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
