/*
  Warnings:

  - Added the required column `category` to the `Master_Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Master_Data" ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "category" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "category" TEXT;
