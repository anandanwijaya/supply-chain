/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_label_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
ADD COLUMN     "order_id" SERIAL NOT NULL,
ALTER COLUMN "product_id" DROP DEFAULT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id");
DROP SEQUENCE "Order_product_id_seq";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Master_Data"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
