-- CreateEnum
CREATE TYPE "PrizeStatus" AS ENUM ('AVAILABLE', 'ASSIGNED', 'USED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "PrizeType" AS ENUM ('DISCOUNT', 'PRODUCT', 'TICKET', 'VOUCHER', 'SERVICE');

-- CreateTable
CREATE TABLE "Prize" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "code" TEXT NOT NULL,
    "qrCode" TEXT,
    "status" "PrizeStatus" NOT NULL DEFAULT 'AVAILABLE',
    "type" "PrizeType" NOT NULL,
    "value" DOUBLE PRECISION,
    "leadId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "redeemedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Prize_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prize_code_key" ON "Prize"("code");

-- CreateIndex
CREATE INDEX "status_idx" ON "Prize"("status");

-- AddForeignKey
ALTER TABLE "Prize" ADD CONSTRAINT "Prize_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
