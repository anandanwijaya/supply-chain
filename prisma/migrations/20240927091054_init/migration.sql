-- AlterTable
CREATE SEQUENCE order_order_id_seq;
ALTER TABLE "Order" ALTER COLUMN "order_id" SET DEFAULT nextval('order_order_id_seq');
ALTER SEQUENCE order_order_id_seq OWNED BY "Order"."order_id";
