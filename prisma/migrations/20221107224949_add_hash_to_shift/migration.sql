/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `Shift` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Shift` ADD COLUMN `hash` VARCHAR(191) NOT NULL,
    MODIFY `idDoctor` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Shift_hash_key` ON `Shift`(`hash`);
