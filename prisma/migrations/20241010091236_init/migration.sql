/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `order_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_label_id_fkey";

-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_user_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "order_id",
DROP COLUMN "quantity",
ADD COLUMN     "product_id" SERIAL NOT NULL,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("product_id");

-- DropTable
DROP TABLE "Supplier";

-- CreateTable
CREATE TABLE "Master_Data" (
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Master_Data_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Quantity" (
    "number_of_product" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "Quantity_pkey" PRIMARY KEY ("product_id")
);

-- AddForeignKey
ALTER TABLE "Master_Data" ADD CONSTRAINT "Master_Data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quantity" ADD CONSTRAINT "Quantity_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Master_Data"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "Order"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
