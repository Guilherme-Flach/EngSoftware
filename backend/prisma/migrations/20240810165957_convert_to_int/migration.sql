/*
  Warnings:

  - The primary key for the `account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `accountId` on the `account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `accountId` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `rescueproposal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `rescueProposalId` on the `rescueproposal` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `rescueRequestId` on the `rescueproposal` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `rescuerId` on the `rescueproposal` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `rescuer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `accountId` on the `rescuer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `rescuerequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `rescueRequestId` on the `rescuerequest` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `customerId` on the `rescuerequest` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `rescueproposal` DROP FOREIGN KEY `RescueProposal_rescueRequestId_fkey`;

-- DropForeignKey
ALTER TABLE `rescueproposal` DROP FOREIGN KEY `RescueProposal_rescuerId_fkey`;

-- DropForeignKey
ALTER TABLE `rescuer` DROP FOREIGN KEY `Rescuer_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `rescuerequest` DROP FOREIGN KEY `RescueRequest_customerId_fkey`;

-- AlterTable
ALTER TABLE `account` DROP PRIMARY KEY,
    MODIFY `accountId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`accountId`);

-- AlterTable
ALTER TABLE `customer` DROP PRIMARY KEY,
    MODIFY `accountId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`accountId`);

-- AlterTable
ALTER TABLE `rescueproposal` DROP PRIMARY KEY,
    MODIFY `rescueProposalId` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `rescueRequestId` INTEGER NOT NULL,
    MODIFY `rescuerId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`rescueProposalId`);

-- AlterTable
ALTER TABLE `rescuer` DROP PRIMARY KEY,
    MODIFY `accountId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`accountId`);

-- AlterTable
ALTER TABLE `rescuerequest` DROP PRIMARY KEY,
    MODIFY `rescueRequestId` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `customerId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`rescueRequestId`);

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`accountId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rescuer` ADD CONSTRAINT `Rescuer_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`accountId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RescueRequest` ADD CONSTRAINT `RescueRequest_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`accountId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RescueProposal` ADD CONSTRAINT `RescueProposal_rescueRequestId_fkey` FOREIGN KEY (`rescueRequestId`) REFERENCES `RescueRequest`(`rescueRequestId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RescueProposal` ADD CONSTRAINT `RescueProposal_rescuerId_fkey` FOREIGN KEY (`rescuerId`) REFERENCES `Rescuer`(`accountId`) ON DELETE CASCADE ON UPDATE CASCADE;
