/*
  Warnings:

  - You are about to drop the column `userExamScoreId` on the `UserVocabUnlock` table. All the data in the column will be lost.
  - Added the required column `userId` to the `UserVocabUnlock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserVocabUnlock` DROP FOREIGN KEY `UserVocabUnlock_userExamScoreId_fkey`;

-- DropIndex
DROP INDEX `UserVocabUnlock_userExamScoreId_fkey` ON `UserVocabUnlock`;

-- AlterTable
ALTER TABLE `UserVocabUnlock` DROP COLUMN `userExamScoreId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `UserVocabUnlock` ADD CONSTRAINT `UserVocabUnlock_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
