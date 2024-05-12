/*
  Warnings:

  - You are about to drop the `baskets` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[product_id,order_id]` on the table `orderitems` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "baskets" DROP CONSTRAINT "baskets_user_id_fkey";

-- DropTable
DROP TABLE "baskets";

-- CreateTable
CREATE TABLE "basketitems" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "basketitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favoriteitems" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favoriteitems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "basketitems_product_id_user_id_key" ON "basketitems"("product_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "favoriteitems_product_id_user_id_key" ON "favoriteitems"("product_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "orderitems_product_id_order_id_key" ON "orderitems"("product_id", "order_id");

-- AddForeignKey
ALTER TABLE "basketitems" ADD CONSTRAINT "basketitems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "basketitems" ADD CONSTRAINT "basketitems_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoriteitems" ADD CONSTRAINT "favoriteitems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoriteitems" ADD CONSTRAINT "favoriteitems_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
