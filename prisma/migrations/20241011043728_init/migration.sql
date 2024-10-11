/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `Quantity` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Quantity_quantity_of_product_key";

-- CreateIndex
CREATE UNIQUE INDEX "Quantity_product_id_key" ON "Quantity"("product_id");
