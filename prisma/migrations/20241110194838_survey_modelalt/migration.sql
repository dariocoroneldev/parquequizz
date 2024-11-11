/*
  Warnings:

  - You are about to drop the column `content` on the `SurveyItem` table. All the data in the column will be lost.
  - You are about to drop the column `itemType` on the `SurveyItem` table. All the data in the column will be lost.
  - Added the required column `prompt` to the `SurveyItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `SurveyItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SurveyItem" DROP COLUMN "content",
DROP COLUMN "itemType",
ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
