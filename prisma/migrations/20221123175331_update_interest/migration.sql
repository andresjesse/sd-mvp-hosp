/*
  Warnings:

  - You are about to drop the column `hourEnd` on the `Interest` table. All the data in the column will be lost.
  - You are about to drop the column `hourStart` on the `Interest` table. All the data in the column will be lost.
  - You are about to drop the column `weekday` on the `Interest` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Interest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idSector` to the `Interest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Interest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Interest` DROP COLUMN `hourEnd`,
    DROP COLUMN `hourStart`,
    DROP COLUMN `weekday`,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `idSector` INTEGER NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL;
