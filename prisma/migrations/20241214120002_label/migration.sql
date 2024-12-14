/*
  Warnings:

  - You are about to alter the column `total` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - Added the required column `product_id` to the `Label` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name` to the `Label` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Label` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier` to the `Label` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Label` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Label" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "product_name" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "status" "StatusOrder" NOT NULL DEFAULT 'ON_PROCESS',
ADD COLUMN     "supplier" TEXT NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "total" SET DATA TYPE INTEGER;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Master_Data"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
