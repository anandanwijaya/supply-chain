/*
  Warnings:

  - Added the required column `user_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_order_id_fkey";

-- AlterTable
CREATE SEQUENCE order_order_id_seq;
ALTER TABLE "Order" ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "order_id" SET DEFAULT nextval('order_order_id_seq');
ALTER SEQUENCE order_order_id_seq OWNED BY "Order"."order_id";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
