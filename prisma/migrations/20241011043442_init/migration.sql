/*
  Warnings:

  - A unique constraint covering the columns `[quantity_of_product]` on the table `Quantity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Quantity_quantity_of_product_key" ON "Quantity"("quantity_of_product");
