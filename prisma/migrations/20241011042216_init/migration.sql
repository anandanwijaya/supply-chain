/*
  Warnings:

  - You are about to drop the column `number_of_product` on the `Quantity` table. All the data in the column will be lost.
  - Added the required column `quantity_of_product` to the `Quantity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quantity" DROP COLUMN "number_of_product",
ADD COLUMN     "quantity_of_product" INTEGER NOT NULL;
