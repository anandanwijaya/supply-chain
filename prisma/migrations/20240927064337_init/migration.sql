-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STAKEHOLDER', 'SUPPLIER');

-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('PENDING', 'REJECT', 'ON_PROCESS', 'DONE');

-- CreateTable
CREATE TABLE "User" (
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "supplier_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" SERIAL NOT NULL,
    "supplier_id" INTEGER NOT NULL,
    "stakeholder_id" INTEGER NOT NULL,
    "status" "StatusOrder" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "Label" (
    "label_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "qr_code" TEXT NOT NULL,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("label_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_user_id_key" ON "Supplier"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_username_key" ON "Supplier"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Label_order_id_key" ON "Label"("order_id");

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_stakeholder_id_fkey" FOREIGN KEY ("stakeholder_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
