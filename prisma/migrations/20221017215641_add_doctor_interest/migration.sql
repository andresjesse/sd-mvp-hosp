-- CreateTable
CREATE TABLE `Interest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idDoctor` INTEGER NOT NULL,
    `weekday` INTEGER NOT NULL,
    `hourStart` DATETIME(3) NOT NULL,
    `hourEnd` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Interest_idDoctor_key`(`idDoctor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
