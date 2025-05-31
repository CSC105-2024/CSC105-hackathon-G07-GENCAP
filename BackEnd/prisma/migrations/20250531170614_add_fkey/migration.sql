/*
  Warnings:

  - A unique constraint covering the columns `[userId,examId]` on the table `UserExamScore` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `languageLevel` VARCHAR(191) NOT NULL DEFAULT 'Beginner';

-- CreateIndex
CREATE UNIQUE INDEX `UserExamScore_userId_examId_key` ON `UserExamScore`(`userId`, `examId`);

-- AddForeignKey
ALTER TABLE `UserVocabUnlock` ADD CONSTRAINT `UserVocabUnlock_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
