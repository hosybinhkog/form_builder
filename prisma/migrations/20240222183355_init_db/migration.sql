/*
  Warnings:

  - Made the column `formId` on table `FormSubmissions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FormSubmissions" DROP CONSTRAINT "FormSubmissions_formId_fkey";

-- AlterTable
ALTER TABLE "FormSubmissions" ADD COLUMN     "content" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "formId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "FormSubmissions" ADD CONSTRAINT "FormSubmissions_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
