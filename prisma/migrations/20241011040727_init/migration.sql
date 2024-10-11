/*
  Warnings:

  - The primary key for the `Quantity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `order_id` to the `Label` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_label_id_fkey";

-- AlterTable
CREATE SEQUENCE label_label_id_seq;
ALTER TABLE "Label" ADD COLUMN     "order_id" INTEGER NOT NULL,
ALTER COLUMN "label_id" SET DEFAULT nextval('label_label_id_seq');
ALTER SEQUENCE label_label_id_seq OWNED BY "Label"."label_id";

-- AlterTable
ALTER TABLE "Quantity" DROP CONSTRAINT "Quantity_pkey",
ADD COLUMN     "quantity_id" SERIAL NOT NULL,
ADD CONSTRAINT "Quantity_pkey" PRIMARY KEY ("quantity_id");

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
