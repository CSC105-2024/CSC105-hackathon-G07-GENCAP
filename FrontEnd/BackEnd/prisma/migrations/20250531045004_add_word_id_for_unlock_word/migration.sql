/*
  Warnings:

  - Added the required column `wordId` to the `UserVocabUnlock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserVocabUnlock` ADD COLUMN `wordId` INTEGER NOT NULL;
