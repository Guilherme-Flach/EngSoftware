/*
  Warnings:

  - Added the required column `creationDate` to the `RescueProposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creationDate` to the `RescueRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rescueproposal` ADD COLUMN `creationDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `rescuerequest` ADD COLUMN `creationDate` DATETIME(3) NOT NULL;
