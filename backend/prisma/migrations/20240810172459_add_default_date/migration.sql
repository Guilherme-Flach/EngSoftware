-- AlterTable
ALTER TABLE `rescueproposal` MODIFY `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `rescuerequest` MODIFY `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
