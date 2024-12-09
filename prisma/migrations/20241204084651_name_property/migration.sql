/*
  Warnings:

  - You are about to drop the column `value` on the `propertyoptions` table. All the data in the column will be lost.
  - Added the required column `name` to the `propertyoptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "propertyoptions" DROP COLUMN "value",
ADD COLUMN     "name" TEXT NOT NULL;
