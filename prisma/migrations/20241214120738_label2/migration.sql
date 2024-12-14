/*
  Warnings:

  - You are about to drop the column `supplier` on the `Label` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Label` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Label" DROP COLUMN "supplier",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
