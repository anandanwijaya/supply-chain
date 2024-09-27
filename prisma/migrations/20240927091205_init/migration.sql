-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "order_id" DROP DEFAULT;
DROP SEQUENCE "order_order_id_seq";
