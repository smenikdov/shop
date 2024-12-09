/*
  Warnings:

  - You are about to drop the `propertyoptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "propertyoptions" DROP CONSTRAINT "propertyoptions_propertyId_fkey";

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "options" TEXT[];

-- DropTable
DROP TABLE "propertyoptions";
