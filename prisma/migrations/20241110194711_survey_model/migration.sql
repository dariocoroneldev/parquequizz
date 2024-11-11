-- CreateTable
CREATE TABLE "SurveyItem" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "options" TEXT[],
    "maxStars" INTEGER,

    CONSTRAINT "SurveyItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyResponse" (
    "id" SERIAL NOT NULL,
    "surveyItemId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SurveyResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_surveyItemId_fkey" FOREIGN KEY ("surveyItemId") REFERENCES "SurveyItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
