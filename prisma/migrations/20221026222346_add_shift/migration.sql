/*
  Warnings:

  - A unique constraint covering the columns `[abbreviation]` on the table `Sector` will be added. If there are existing duplicate values, this will fail.
  - Made the column `abbreviation` on table `Sector` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Sector` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Interest_idDoctor_key` ON `Interest`;

-- AlterTable
ALTER TABLE `Sector` MODIFY `abbreviation` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Shift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `idDoctor` INTEGER NOT NULL,
    `idSector` INTEGER NOT NULL,
    `isFixed` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Sector_abbreviation_key` ON `Sector`(`abbreviation`);
