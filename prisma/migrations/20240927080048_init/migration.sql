/*
  Warnings:

  - You are about to drop the column `stakeholder_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `supplier_id` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_stakeholder_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "stakeholder_id",
DROP COLUMN "supplier_id",
ALTER COLUMN "order_id" DROP DEFAULT;
DROP SEQUENCE "Order_order_id_seq";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
