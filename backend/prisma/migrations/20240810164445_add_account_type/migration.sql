/*
  Warnings:

  - Added the required column `accountType` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` ADD COLUMN `accountType` VARCHAR(191) NOT NULL;
