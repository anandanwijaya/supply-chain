/*
  Warnings:

  - You are about to drop the column `order_id` on the `Label` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_order_id_fkey";

-- DropIndex
DROP INDEX "Label_order_id_key";

-- AlterTable
ALTER TABLE "Label" DROP COLUMN "order_id";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
CREATE SEQUENCE supplier_supplier_id_seq;
ALTER TABLE "Supplier" ALTER COLUMN "supplier_id" SET DEFAULT nextval('supplier_supplier_id_seq');
ALTER SEQUENCE supplier_supplier_id_seq OWNED BY "Supplier"."supplier_id";

-- AlterTable
CREATE SEQUENCE user_user_id_seq;
ALTER TABLE "User" ALTER COLUMN "user_id" SET DEFAULT nextval('user_user_id_seq'),
ALTER COLUMN "role" SET DEFAULT 'STAKEHOLDER';
ALTER SEQUENCE user_user_id_seq OWNED BY "User"."user_id";

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
