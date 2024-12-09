/*
  Warnings:

  - You are about to drop the column `options` on the `properties` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "options";

-- CreateTable
CREATE TABLE "propertyoptions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "propertyoptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "propertyoptions" ADD CONSTRAINT "propertyoptions_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
