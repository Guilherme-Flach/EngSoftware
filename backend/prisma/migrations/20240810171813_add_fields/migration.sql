/*
  Warnings:

  - Added the required column `accepted` to the `RescueProposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `RescueProposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `RescueRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problem` to the `RescueRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rescueproposal` ADD COLUMN `accepted` BOOLEAN NOT NULL,
    ADD COLUMN `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `rescuerequest` ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `problem` VARCHAR(191) NOT NULL;
