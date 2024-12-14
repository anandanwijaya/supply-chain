/*
  Warnings:

  - You are about to drop the column `product_name` on the `Label` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Label` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Label` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Label` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Label" DROP COLUMN "product_name",
DROP COLUMN "quantity",
DROP COLUMN "status",
DROP COLUMN "total";
