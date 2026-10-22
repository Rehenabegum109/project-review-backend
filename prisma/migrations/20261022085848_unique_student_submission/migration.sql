/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `ProjectSubmission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProjectSubmission_studentId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "ProjectSubmission_studentId_key" ON "ProjectSubmission"("studentId");
