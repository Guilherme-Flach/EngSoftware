-- CreateTable
CREATE TABLE `Account` (
    `accountId` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Account_username_key`(`username`),
    UNIQUE INDEX `Account_email_key`(`email`),
    PRIMARY KEY (`accountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `accountId` BIGINT NOT NULL,

    PRIMARY KEY (`accountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rescuer` (
    `accountId` BIGINT NOT NULL,

    PRIMARY KEY (`accountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RescueRequest` (
    `rescueRequestId` BIGINT NOT NULL AUTO_INCREMENT,
    `customerId` BIGINT NOT NULL,

    PRIMARY KEY (`rescueRequestId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RescueProposal` (
    `rescueProposalId` BIGINT NOT NULL AUTO_INCREMENT,
    `rescueRequestId` BIGINT NOT NULL,
    `rescuerId` BIGINT NOT NULL,

    PRIMARY KEY (`rescueProposalId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
