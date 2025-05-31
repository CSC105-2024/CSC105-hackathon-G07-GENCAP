/*
  Warnings:

  - A unique constraint covering the columns `[userId,examId]` on the table `UserExamScore` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserExamScore_userId_examId_key` ON `UserExamScore`(`userId`, `examId`);
